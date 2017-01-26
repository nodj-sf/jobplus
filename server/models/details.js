'use strict';
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
          let json = {};
          let $ = cheerio.load(html);
          let summary = $('.summary')[0].children.filter(function(obj) {
            if (obj.data && (obj.data.trim()).length > 0 ) {
              return obj.data
            }
          }).map(function(obj) {
            if (typeof obj.data) {
              return obj.data;
            }
          });

          json.details = summary.join(' ').slice(0, 400);
          json = JSON.stringify(json);

          resolve({
            respond: res.send(JSON.parse(json)),
            data: json
          });
        }
      });
    });
  };
}

module.exports = details;
