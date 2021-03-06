const axios = require('axios').default;
const { exec } = require('child_process');
const process = require('process');
const db = require('../../entities/Database');

module.exports = async (request, response) => {
  const { repoName } = request.body;
  const TOKEN = process.env.AUTH_TOKEN;

  try {
    const res = await axios.post('https://shri.yandex/hw/api/conf', request.body, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    db.insertSettings(request.body);

    const repoNameArr = repoName.split('/');
    process.env.NAME_REPO = repoNameArr[repoNameArr.length - 1];

    exec(`git clone ${repoName}`, (err, out) => {
      if (err) {
        console.log(err.message);
      } else {
        response.json(res.data, out);
      }
    });
  } catch (error) {
    response.json(error.message);
  }
};
