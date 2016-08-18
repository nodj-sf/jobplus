const scrapDetail = require('../models/details');

exports.post = (req, res) => {
  scrapDetail(req.body.url)(res)
    .then(function(data) {
      return data.respond;
      res.end();
    })
    .catch(function(error) {
      res.setHeader('Content-Type', 'application/text');
      res.status(500).send('Something broke!');
    });
}