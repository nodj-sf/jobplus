var request = require('request');

var getIP = function(callback) {
  request('api.ipify.org?format=jsonp&callback=?', function(error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(body);
    } else {
      console.log(error);
    }
  });
}

module.exports = {
  getIP: getIP
}