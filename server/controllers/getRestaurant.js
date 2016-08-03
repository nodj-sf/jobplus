'use strict';
const getYelp = require('../models/restaurant');

exports.post = (req, res) => {
  let restaurant = req.body.restaurant, city = req.body.city;
  let data = getYelp(restaurant, city)(res);
  return data;
  res.end();
};
