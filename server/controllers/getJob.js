const request = require('request');
const getIndeed = require('../models/jobs');
const redisClient = require('redis').createClient;
const redis = redisClient(6379, 'localhost');


exports.post = (req, res) => {
  let jobTitle = req.body.jobTitle,
      city = req.body.city,
      key = JSON.stringify(req.body).toLowerCase();

  // redis.del(key);
  
  /*
   * Return data from cache if exists
  */
  redis.get(key, (err, result) => {

    res.setHeader('Content-Type', 'application/json');

    if (result) {
      // console.log('return from redis');
      res.send(JSON.parse(result));
      res.end();
    } else {
      let ip = req.headers['x-forwarded-for']
            || req.connection.remoteAddress
            || req.socket.remoteAddress
            || req.connection.socket.remoteAddress;
      
      // console.log('make api call');

      /*
       * Search Indeed API and cache data
       * @param {string} jobTitle 
       * @param {string} city
       * @param {string} ip
       * @return response JSON || response from cache
      */
      getIndeed(jobTitle, city, ip)(res)
        // Return data when a promise is return.
        .then((response) => {
          // Cache data using request body as key
          redis.set(key, response.data);
          // Set cache to expire in an hour
          redis.expire(key, 3600);
          response.respond;
          res.end();
        })
        .catch(function(error) {
          res.setHeader('Content-Type', 'application/text');
          res.status(500).send('Something broke!');
        });
    }
  });
}
