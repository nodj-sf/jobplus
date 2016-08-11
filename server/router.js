const express = require('express');
const path = require('path');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
** Load local environment variables from .env 
** file where secrets and keys are configured.
*/

let dotenv;
if (!process.env.SESSION_SECRET) {
  dotenv = require('dotenv');
  dotenv.load({ path: '.env' });
}

// const redisClient = require('redis').createClient;
// const redis = redisClient(6379, 'localhost');

// redis.on('connect', () => {
//   console.log('connected');
// });

/*
** Route Controllers
*/

const getRestaurant = require('./controllers/getRestaurant');
const getJob = require('./controllers/getJob');
const getPlace = require('./controllers/getPlace');

app.use(express.static(path.join(__dirname, '../public')));

/*
** App routes.
*/

app.post('/api/v1/jobs', getJob.post);
app.post('/api/v1/food', getRestaurant.post);
app.post('/api/v1/places', getPlace.post);

module.exports = app;
