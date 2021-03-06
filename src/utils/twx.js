const axios = require('axios');

const url = process.env.TWX_URL || 'http://192.168.128.51:8080/Thingworx/Things';
const defaultHeaders = {
  Authorization: `Basic ${process.env.TWX_APPKEY || 'bWljcjptaWNy'}`,
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

// TODO: Proper error logging
const twx = {
  //
  executeService: (thing, service) => axios({
    method: 'post',
    url: `${url}/${thing}/Services/${service}`,
    headers: defaultHeaders,
  })
  .then(response => response.data.rows[0].result)
  .catch(error => console.log(error.response)),

  //
  getProperties: thing => axios({
    method: 'get',
    url: `${url}/${thing}/Properties`,
    headers: defaultHeaders,
  })
  .then(response => response.data.rows[0])
  .catch(error => console.log(error.response)),

  getProperty: async (thing, prop) => {
    const result = await module.exports.getProperties(thing);
    return result[prop];
  },

  //
  isLineRunning: () => axios({
    method: 'post',
    url: `${url}/MSChatBot_API/Services/IsLineRunning`,
    headers: defaultHeaders,
  })
  .then(response => response.data.rows[0].result)
  .catch(error => console.log(error.response)),
};

module.exports = twx;
