'use strict';
const request = require('request');
const Promise = require('promise');

/*
 * Seach Indeed API
 * @param {string} jobTitle 
 * @param {string} city
 * @param {string} ip
 * @return object
*/
let getIndeed = (query, city, userIP) => {
  query = encodeURI(query);
  city = encodeURI(city);

  /*
   * Callback function returns an object
   * one object holding the data (data)
   * and the other object (respond)
   * invoke a server respond object.
  */
  return (res) => {
    return new Promise((resolve, reject) => {
      request('http://api.indeed.com/ads/apisearch?format=json&publisher=' + 
        process.env.INDEED + '&q=' + 
        query + '&l=' + 
        city + '&radius=1&st=jobsite&jt=fulltime&sort=date&limit=100&filter=1&latlong=1&co=us&userip=' +
        userIP + '&v=2', 
        (error, response, data) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              respond: res.send(JSON.parse(data)),
              data: data
            });
          }
        });
    });
  }
};

module.exports = getIndeed;
