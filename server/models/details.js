const request = require('request');
const Promise = require('promise');
const cheerio = require('cheerio');

let details = (url) => {
  return function(res) {
    return new Promise(function(resolve, reject) {
      request(url, function(error, response, html) {
        if (error) { 
          reject(error);
        } else {
          var json = {};
          var $ = cheerio.load(html);
          var summary = $('.summary')[0].children.filter(function(obj) {
            if (obj.data && (obj.data.trim()).length > 0 ) {
              return obj.data
            }
          }).map(function(obj) {
            if (typeof obj.data) {
              return obj.data;
            }
          });
          json.details = summary.join(' ').slice(0, 700);
          json = JSON.stringify(json);
          resolve({
            respond: res.send(JSON.parse(json)),
            data: summary
          });
        }
      });
    });
  };
}

module.exports = details;