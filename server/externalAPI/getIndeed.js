const request = require('request');
const getIP = require('./getIP.js');
let IP;

getIP.getIP((data) => {
  IP = data;
});

let getIndeed = (callback, query, location, userIP) => {
  query = encodeURI(query);
  location = encodeURI(location);
  userIP = IP;
  request('http://api.indeed.com/ads/apisearch?format=json&publisher=' + process.env.INDEED + '&q='+ query +'&l='+ location +'&radius=.5&st=jobsite&jt=fulltime&limit=15&filter=1&latlong=1&co=us&userip='+userIP+'&v=2', function(error, response, body) {
  });
};

module.exports = getIndeed;
