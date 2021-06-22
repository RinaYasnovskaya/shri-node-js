const util = require('util');
const process = require('process');
const { execFile } = require('child_process');
const axios = require('axios');

const execFileAsync = util.promisify(execFile);

async function postInfoBuild(jsonObj, response) {
  const TOKEN = process.env.AUTH_TOKEN;

  const res = await axios.post('https://shri.yandex/hw/api/build/request', jsonObj, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  response.json(res.data);
}

module.exports = async (request, response) => {
  const { params: { commitHash } } = request;
  const dir = process.cwd();
  const nameRepo = process.env.NAME_REPO;

  const promiseBranch = execFileAsync(
    'git',
    [
      'branch',
      '--contains',
      commitHash,
    ],
    { cwd: `${dir}/${nameRepo}` },
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
    { cwd: `${dir}/${nameRepo}` },
  );

  Promise.all([promiseBranch, promiseComit])
    .then((values) => {
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

      postInfoBuild(JSON.stringify(resultObj), response);
    })
    .catch((error) => {
      response.json(error.message);
    });
};
