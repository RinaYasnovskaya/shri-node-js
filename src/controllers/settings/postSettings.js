const axios = require('axios').default;
const { exec } = require('child_process');
const constants = require('../../utils/constants');

module.exports = async (request, response) => {
  const { repoName } = request.body;
  const { tokenResult } = constants;

  try {
    const res = await axios.post('https://shri.yandex/hw/api/conf', request.body, {
      headers: {
        Authorization: `Bearer ${tokenResult}`,
        'Content-Type': 'application/json',
      },
    });

    constants.nameRepo = repoName.split('/')[repoName.length - 1];

    exec(`git clone ${repoName}`, (err, out) => {
      if (err) {
        console.log(err);
      } else {
        response.json(res.data, out);
      }
    });
  } catch (error) {
    response.json(error);
  }
};
