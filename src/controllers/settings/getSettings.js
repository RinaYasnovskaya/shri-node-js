const axios = require('axios').default;
const { tokenResult } = require('../../utils/constants');

module.exports = async (request, response) => {
  try {
    const res = await axios.get('https://shri.yandex/hw/api/conf', {
      headers: {
        Authorization: `Bearer ${tokenResult}`,
        'Content-Type': 'application/json',
      },
    });

    response.json(res.data);
  } catch (error) {
    response.json(error);
  }
};
