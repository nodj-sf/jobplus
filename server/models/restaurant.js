'use strict';
let Yelp = require('yelp');

const yelp = new Yelp({
  consumer_key: process.env.YELPKEY,
  consumer_secret: process.env.YELPSECRET,
  token: process.env.TOKEN,
  token_secret: process.env.TOKENSECRET
});

// Add latLong argument
let getYelp = (food, city, coordinate, limit) => {
  return (res) => {
    return yelp.search({ term: food, location: city, cll: `${coordinate.latitude},${coordinate.longitude}` }) //implement 
      .then((data) => {
        let restaurants = data.businesses.slice(0, limit);
        
        restaurants = restaurants.map((obj) => {
          return {
            name: obj.name,
            url: obj.url,
            rating: obj.rating,
            review_count: obj.review_count,
            phone: obj.phone,
            coordinate: obj.location.coordinate,
            id: obj.id
          };
        });

        return {
          respond: res.send(restaurants),
          data: restaurants
        };
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

module.exports = getYelp;
