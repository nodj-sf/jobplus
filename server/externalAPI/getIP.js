const request = require('request');

let getIP = (callback) => {
  request('https://api.ipify.org?format=json',
    (error, response, body) => {
      if (!error && response.statusCode == 200) {
        callback(JSON.parse(body));
      } else {
        console.log(error);
      }
    });
};

module.exports = getIP;