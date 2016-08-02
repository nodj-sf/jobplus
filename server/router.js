const express = require('express');
const path = require('path');
const app = express();
const request = require('request');

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
const getRestaurant = require('./controllers/getRestaurant');
const getIndeed = require('./controllers/getIndeed');

app.use(express.static(path.join(__dirname, '../public')));

/*
** App routes.
*/
app.get('/api/v1/example', exampleController.index);
app.get('/api/v1/jobs', getIndeed.get);
app.get('/api/v1/food', getRestaurant.get);

module.exports = app;
