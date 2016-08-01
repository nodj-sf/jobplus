'use strict';

const getIndeed = require('../models/getTest');

exports.get = (req, res) => {
  res.send(getIndeed);
};
