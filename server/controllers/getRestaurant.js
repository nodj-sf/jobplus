'use strict';
const getYelp = require('../models/restaurant');
const redis = require('./redisClient');
const util = require('util');


exports.post = (req, res) => {
  let reqBody = req.body,
      restaurant = 'restaurant',
      city = reqBody.city,
      coordinate = reqBody.coordinate,
      key = JSON.stringify(reqBody).toLowerCase();
      
  // remove _csrf from req.body to presist caching.
  // Because we are using reqBody as a key name we must remove the _csrf because everytime 
  // a client sends a request to the backend a new _csrf is append to the request therefore the accessing of the redis 
  // data base would be invalid
  if (reqBody._csrf) {
    try {
      delete reqBody._csrf;
    } catch (e) {
      console.error('csrf does not exists.');
    }

    key = JSON.stringify(reqBody).toLowerCase();
  }

  // redis.del(key);

  req.check('city', 'City is required.').notEmpty();
  req.check('coordinate.latitude', 'Latitude is required.').notEmpty();
  req.check('coordinate.longitude', 'Longitude is required.').notEmpty();

  let errors = req.validationErrors();
  if (errors) {
    res.status(400).send('errors: ' + util.inspect(errors));
    return;
  }

  /*
   * Check if redis has a sesson stored
   * return data if session exist.
  */

  redis.get(key, (err, result) => {

    res.setHeader('Content-Type', 'application/json');

    if (result) {
      // console.log('return from redis');
      res.send(JSON.parse(result));
      res.end();
    } else {
      // console.log('api');
      getYelp(restaurant, city, coordinate)(res)
        .then((data) => {
          // console.log('data: ', data);
          // Cache data using request body as key
          redis.set(key, JSON.stringify(data.data));
          // Set cache to expire in an hour
          redis.expire(key, 3600);
          return data.respond;
          res.end();
        })
        .catch(function(error) {
          res.setHeader('Content-Type', 'application/text');
          res.status(500).send('Something broke!');
        });
    }
  });
};
