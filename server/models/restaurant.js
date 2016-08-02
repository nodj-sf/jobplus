'use strict';
let Yelp = require('yelp');

const yelp = new Yelp({
  consumer_key: process.env.YELPKEY,
  consumer_secret: process.env.YELPSECRET,
  token: process.env.TOKEN,
  token_secret: process.env.TOKENSECRET
});

let getYelp = (food, location, limit) => {
  return (res) => {
    yelp.search({ term: food, location: location })
    .then((data) => {
      let restaurants = data.businesses.slice(0, limit);
      restaurants = restaurants.map((obj) => {
        let parseData = {};
        parseData.name = obj.name;
        parseData.url = obj.url;
        parseData.rating = obj.rating;
        parseData.review_count = obj.review_count;
        parseData.phone = obj.phone;
        parseData.coordinate = obj.location.coordinate;
        return parseData;
      });
      return res.send(restaurants);
    })
    .catch((err) => {
      console.error(err);
    });
  }
}

module.exports = getYelp;
