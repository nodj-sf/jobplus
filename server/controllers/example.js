'use strict';

const example = require('../models/example');

exports.index = (req, res) => {
  res.send(example);
};
