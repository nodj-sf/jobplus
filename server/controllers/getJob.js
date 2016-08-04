const request = require('request');
const getIndeed = require('../models/jobs');

exports.post = (req, res) => {
  let jobTitle = req.body.jobTitle,
      city = req.body.city;

  let ip = req.headers['x-forwarded-for'] || 
      req.connection.remoteAddress || 
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

  let data = getIndeed(jobTitle, city, ip)(res);
  res.setHeader('Content-Type', 'application/json');
  return data;
  res.end();
}
