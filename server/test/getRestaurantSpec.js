let chai = require('chai');
let expect = chai.expect;
let chaiHttp = require('chai-http');
let request = require('request');

let getYelp = require('../models/restaurant');
let getRestaurantController = require('../controllers/getRestaurant');

chai.use(chaiHttp);

describe('getYelp', function() {
  it('should be a function', function() {
    expect(getYelp).to.be.a('function');
  });

  it('should return return a callback function', function() {
    expect(getYelp()).to.be.a('function');
  });
});

describe('getYelp Controller', function() {
  it('module should be exported as an object', function() {
    expect(getRestaurantController).to.be.a('object');
  });

  it('post request should be a function', function() {
    expect(getRestaurantController.post).to.be.a('function');
  });
});

describe('getRestaurant post request', function() {
  let URL = 'http://localhost:3000';
  let path = '/api/v1/food';

  it('post request should return an array of data', function() {
    chai
      .request(URL)
      .post(path)
      .set('Content-Type', 'application/json')
      .send({restaurant: 'restaurant', city: 'San Francisco', coordinate: {latitude: 37.7874963, longitude: -122.4020974}})
      .end(function(error, response, body) {
        expect(response.body.results).to.be.a('array');
        done();
      })
  });
});