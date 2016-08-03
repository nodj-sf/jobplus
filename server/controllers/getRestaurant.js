'use strict';

const example = require('../models/restaurant');

exports.get = (req, res) => {
  console.log('getting restuarant!!');
  res.send(example);
};





