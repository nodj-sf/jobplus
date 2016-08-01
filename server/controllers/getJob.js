'use strict';

const jobs = require('../models/jobs');

exports.get = (req, res) => {
  res.send(jobs);
};
