const scrapeDetail = require('../models/details');
const redisClient = require('redis').createClient;
const redis = redisClient(6379, 'localhost');


exports.post = (req, res) => {
  var reqBody = req.body,
      url = reqBody.url,
      key = JSON.stringify(reqBody).toLowerCase();

  if (reqBody._csrf) {
    try {
      delete reqBody._csrf;
    } catch(e) {
      console.log('csrf does not exist.');
    }
    key = JSON.stringify(reqBody).toLowerCase();
  }

  redis.del(key);

  redis.get(key, function(err, result) {

    res.setHeader('Content-Type', 'application/json');

    if (result) {
      res.send(JSON.parse(result));
      res.end();
    } else {
      scrapeDetail(url)(res)
        .then(data => {
          redis.set(key, JSON.stringify(data.data));
          redis.expire(key, 3600);
          return data.respond;
          res.end();
        })
        .catch(error => {
          res.setHeader('Content-Type', 'application/text');
          res.status(500).send('Something broke!');
        });
    }
  });
};
