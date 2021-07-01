const util = require('util');
const process = require('process');
const { execFile, exec } = require('child_process');
const axios = require('axios');
const db = require('../../entities/Database');

const execFileAsync = util.promisify(execFile);

async function postInfoBuild(jsonObj, response, commitHash) {
  const TOKEN = process.env.AUTH_TOKEN;
  console.log('in postInfoBuild: ', commitHash);

  const resReq = await axios.post('https://shri.yandex/hw/api/build/request', jsonObj, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  console.log('resReq data: ', resReq.data);

  const { data: id } = resReq.data;
  const time = new Date();
  const dateTime = new Date(time.getTime() - (time.getTimezoneOffset() * 60000)).toJSON();

  axios.post('https://shri.yandex/hw/api/build/start', {
    buildId: id,
    dateTime,
  }, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  exec(`
    git checkout ${commitHash}
  `, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
    }
    const { buildCommand } = db.getSettings();
    console.log(buildCommand);
    console.log(`stdoud: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });

  response.json(resReq.data);
}

module.exports = async (request, response) => {
  const { params: { commitHash } } = request;
  const dir = process.cwd();

  const promiseBranch = execFileAsync(
    'git',
    [
      'branch',
      '--contains',
      commitHash,
    ],
    // { cwd: `${dir}/${nameRepo}` },
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
    // { cwd: `${dir}/${nameRepo}` },
    { cwd: `${dir}/local` },
  );

  Promise.all([promiseBranch, promiseComit])
    .then((values) => {
      console.log('promises values: ', values);
      const branchName = values[0].stdout
        .replace('*', '')
        .split('\n')[0]
        .trim();

      const comitInfo = values[1].stdout.split('[split]');

      const resultObj = {
        branchName,
        commitMessage: comitInfo[2],
        commitHash: comitInfo[0],
        authorName: comitInfo[1],
      };

      postInfoBuild(JSON.stringify(resultObj), response, commitHash);
    })
    .catch((error) => {
      response.json(error.message);
    });
};
