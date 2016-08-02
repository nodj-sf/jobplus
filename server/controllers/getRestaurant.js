'use strict';

const getYelp = require('../models/restaurant');
console.log('getYelp in model: ', getYelp);

exports.get = (req, res) => {
  var data = getYelp('pho', 'San Francisco')(res);
  return data;
  res.end();
};





