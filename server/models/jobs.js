'use strict';
const request = require('request');

let getIndeed = (query, city, userIP) => {
  query = encodeURI(query);
  city = encodeURI(city);

  return (res) => {
    request('http://api.indeed.com/ads/apisearch?format=json&publisher=' + 
      process.env.INDEED + '&q=' + 
      query + '&l=' + 
      city + '&radius=.5&st=jobsite&jt=fulltime&limit=15&filter=1&latlong=1&co=us&userip=' +
      userIP + '&v=2', 
      (error, response, body) => {
        return res.send(body);
      });
  }
};

module.exports = getIndeed;
