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

/*
** Route Controllers
*/
const exampleController = require('./controllers/example');
const getJobController = require('./controllers/getJob');
const testController = require('./controllers/getJob');

app.use(express.static(path.join(__dirname, '../public')));

/*
** App routes.
*/
app.get('/api/v1/example', exampleController.index);
app.get('/api/v1/jobs', getJobController.get);

module.exports = app;
