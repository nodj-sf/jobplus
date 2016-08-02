var Yelp = require('yelp');


var yelp = new Yelp({
  consumer_key: process.env.YELPKEY,
  consumer_secret: process.env.YELPSECRET,
  token: process.env.TOKEN,
  token_secret: process.env.TOKENSECRET
});

let getYelp = function(food, location, limit, callback) {
  yelp.search({ term: food, location: location })
  .then(function (data) {
    var restaurants = data.businesses.slice(0, limit);
    restaurants = restaurants.map(function(obj) {
      var parseData = {};
      parseData.name = obj.name;
      parseData.url = obj.url;
      parseData.rating = obj.rating;
      parseData.review_count = obj.review_count;
      parseData.phone = obj.phone;
      parseData.coordinate = obj.location.coordinate;
      return parseData;
    });
    // console.log(restaurants);
  })
  .catch(function (err) {
    console.error(err);
  });
}

module.exports = getYelp;


