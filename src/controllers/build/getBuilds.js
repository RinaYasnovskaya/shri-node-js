const axios = require('axios');
const process = require('process');

module.exports = async (request, response) => {
  const TOKEN = process.env.AUTH_TOKEN;

  try {
    const res = await axios.get('https://shri.yandex/hw/api/build/list', {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    response.json(res.data);
  } catch (error) {
    response.json(error.message);
  }
};
