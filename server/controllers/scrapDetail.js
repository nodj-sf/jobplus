const scrapDetail = require('../models/details');
const redis = require('./redisClient');


exports.post = (req, res) => {
  var reqBody = req.body,
      url = reqBody.url,
      key = JSON.stringify(reqBody).toLowerCase();

  if (reqBody._csrf) {
    try {
      delete reqBody._csrf;
    } catch(e) {
      console.log('csrf does not exists.');
    }
    key = JSON.stringify(reqBody).toLowerCase();
  }

  // redis.del(key);
  
  redis.get(key, function(err, result) {

    res.setHeader('Content-Type', 'application/json');

    if (result) {
      res.send(JSON.parse(result));
      res.end();
    } else {
      scrapDetail(url)(res)
        .then(function(data) {
          redis.set(key, JSON.stringify(data.data));
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
