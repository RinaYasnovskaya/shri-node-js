const axios = require('axios');
const { tokenResult } = require('../../utils/constants');

module.exports = async (request, response) => {
  const { params: { buildId } } = request;

  try {
    const res = await axios.get(`https://shri.yandex/hw/api/build/details/${buildId}`, {
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
