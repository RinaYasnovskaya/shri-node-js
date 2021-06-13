const axios = require('axios').default;
const { exec } = require('child_process');
const { tokenResult } = require('../utils/constants');

module.exports = async (request, response) => {
  const { repoName } = request.body;

  await axios.post('https://shri.yandex/hw/api/conf', request.body, {
    headers: {
      Authorization: `Bearer ${tokenResult}`,
      'Content-Type': 'application/json',
    },
  });

  exec(`git clone ${repoName}`, (err, out) => {
    if (err) {
      console.log(err);
    } else {
      response.send(out);
    }
  });
};
