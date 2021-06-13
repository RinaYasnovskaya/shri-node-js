const axios = require('axios').default;
const spawn = require('child_process');
const { tokenResult } = require('../utils/constants');

module.exports = async (request, response) => {
  // spawn('git', ['clone']).stdout

  const req = await axios.post('https://shri.yandex/hw/api/conf', {
    repoName: 'repo-name',
    buildCommand: 'npm run build',
    mainBranch: 'main',
    period: 0,
  }, {
    headers: {
      Authorization: `Bearer ${tokenResult}`,
      Accept: 'application/json',
    },
  });

  // console.log(request.body.repoName);
};
