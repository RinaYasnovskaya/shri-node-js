const axios = require('axios').default;
const { tokenResult } = require('../utils/constants');

module.exports = async (request, response) => {
  await axios.get('https://shri.yandex/hw/api/conf', {
    headers: {
      Authorization: `Bearer ${tokenResult}`,
      Accept: 'application/json',
    },
  });

  console.log(request.body);
  response.send('hello');
};
