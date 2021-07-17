import axios from 'axios';
import process from 'process';
import { RequestExp, ResponseExp } from '../Types';
import { exec } from 'child_process';
import db from '../../entities/Database';
import { RequestSettingsBody } from './Settings';

export const postSettings = async (request: RequestExp<RequestSettingsBody>, response: ResponseExp) => {
  const { repoName, mainBranch, buildCommand } = request.body;
  const TOKEN = process.env.AUTH_TOKEN;

  try {
    const deleteRes = await axios.delete('https://shri.yandex/hw/api/conf', {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (deleteRes.status === 200) {
      const repoNameArr = repoName.split('/');
      process.env.NAME_REPO = repoNameArr[repoNameArr.length - 1];
      const pathToClone = `https://github.com/${repoName}.git`;
      process.env.BUILD_COMMAND = buildCommand;

      exec(`git clone ${pathToClone} local`, () => {
        exec(`
          cd local
          git checkout ${mainBranch}
        `, async (errr) => {
          if (errr) {
            console.error(errr);
            return;
          }
          db.insertSettings(request.body);

          const res = await axios.post('https://shri.yandex/hw/api/conf', request.body, {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
              'Content-Type': 'application/json',
            },
          });

          response.json(res.data);
        });
      });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      response.json(error.message);
    }
  }
};
