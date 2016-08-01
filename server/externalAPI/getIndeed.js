const request = request('request');
const getIP = request('./getIP.js');
let IP;

getIP.getIP((data) => {
  IP = data;
});

let getIndeed = (callback, query, location, userIP) => {
  query = encodeURI(query);
  userIP = IP;
  request('http://api.indeed.com/ads/apisearch?format=json&publisher=7729123934278449&q='+ query +'&l='+ location +'&radius=.5&st=jobsite&jt=fulltime&limit=15&filter=1&latlong=1&co=us&userip='+userIP+'&v=2', function(error, response, body) {
    callback(body);
  });
};

module.exports = {
  getIndeed
};
