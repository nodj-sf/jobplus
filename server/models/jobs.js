'use strict';
const request = require('request');
const jobs = require('../externalAPI/indeed.json');

let getIndeed = (callback, query, location, userIP) => {
  query = encodeURI(query);
  location = encodeURI(location);
  return (res) => {
    request('http://api.indeed.com/ads/apisearch?format=json&publisher=' + 
      process.env.INDEED + '&q=' + 
      query + '&l=' + 
      location + '&radius=.5&st=jobsite&jt=fulltime&limit=15&filter=1&latlong=1&co=us&userip=' +
      userIP + '&v=2', 
      function(error, response, body) {
        return res.send(body);
      });
  }
};

module.exports = getIndeed;
