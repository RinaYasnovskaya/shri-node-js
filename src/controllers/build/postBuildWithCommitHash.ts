import axios, { AxiosResponse } from 'axios';
import process from 'process';
import { RequestExp, ResponseExp } from '../Types';
import util from 'util';
import { execFile, execSync, exec } from 'child_process';
import { RequestData, ResultObj } from './postBuildType';

const execFileAsync = util.promisify(execFile);

async function postInfoBuild(obj: ResultObj, response: ResponseExp, commitHash: string) {
  const TOKEN = process.env.AUTH_TOKEN;
  const buildCommand = process.env.BUILD_COMMAND;

  try {
    const resReq: AxiosResponse<RequestData> = await axios.post('https://shri.yandex/hw/api/build/request', obj, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (resReq.data) {
      const { data: { id } } = resReq.data;
      const time = new Date();
      const dateTime = new Date(time.getTime() - (time.getTimezoneOffset() * 60000)).toJSON();
      const body: ResultObj = {
        buildId: id,
        dateTime,
      };

      axios.post('https://shri.yandex/hw/api/build/start', { ...body }, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
      });

      exec(`
        cd local
        git checkout ${commitHash}
        ${buildCommand}
      `, async (err: any, stdout: any) => {
        const bodyFinish = {
          buildId: id,
          duration: 0,
          success: true,
          buildLog: stdout,
        };

        axios.post('https://shri.yandex/hw/api/build/finish', { ...bodyFinish }, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            'Content-Type': 'application/json',
          },
        });
      });

      response.json(resReq.data);
    }
  } catch (err: unknown) {
    console.log('err:', err);
  }
}

export const postBuildWithCommitHash = async (request: RequestExp, response: ResponseExp) => {
  const { params: { commitHash } } = request;
  const dir = process.cwd();

  const promiseBranch = execFileAsync(
    'git',
    [
      'branch',
      '--contains',
      commitHash,
    ],
    { cwd: `${dir}/local` },
  );

  const promiseComit = execFileAsync(
    'git',
    [
      '--no-pager',
      'show',
      commitHash,
      '--pretty=format:%H[split]%an[split]%s',
      '--summary',
    ],
    { cwd: `${dir}/local` },
  );

  Promise.all([promiseBranch, promiseComit])
    .then((values) => {
      const branchName = values[0].stdout
        .replace('*', '')
        .split('\n')[0]
        .trim();

      const comitInfo = values[1].stdout.split('[split]');

      const resultObj: ResultObj = {
        branchName,
        commitMessage: comitInfo[2],
        commitHash: comitInfo[0],
        authorName: comitInfo[1],
      };

      postInfoBuild(resultObj, response, commitHash);
    })
    .catch((error: unknown) => {
      if (error instanceof Error) {
        response.json(error.message);
      }
    });
};

