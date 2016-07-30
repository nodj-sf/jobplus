const express = require('express');
const path = require('path');
const app = express();

/*
** Load local environment variables from .env 
** file where secrets and keys are configured.
*/
let dotenv;
if (!process.env.SESSION_SECRET) {
  dotenv = require('dotenv');
  dotenv.load({ path: '.env' });
}

app.use(express.static(path.join(__dirname, '../public')));

module.exports = app;
