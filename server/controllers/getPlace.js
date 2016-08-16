'use strict';
const getPlace = require('../models/place');
const redisClient = require('redis').createClient;
const redis = redisClient(6379, 'localhost');
const util = require('util');


exports.post = (req, res) => {
  let place = 'place',
      reqBody = req.body,
      coordinate = reqBody.coordinate,
      type = reqBody.type,
      key = JSON.stringify(reqBody).toLowerCase();

  // remove _csrf from req.body to presist caching
  if (reqBody._csrf) {
    try {
      delete reqBody._csrf;
    } catch (e) {
      console.error('csrf does not exists.');
    }
    // Create key based on request body to use for caching
    key = JSON.stringify(reqBody).toLowerCase();
  }

  // redis.del(key);

  req.check('coordinate.lat', 'Latitude is required.').notEmpty();
  req.check('coordinate.long', 'Longitude is required.').notEmpty();

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
      getPlace(coordinate, type)(res)
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
