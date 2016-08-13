let chai = require('chai');
let expect = chai.expect;
let chaiHttp = require('chai-http');

chai.use(chaiHttp);

let request = require('request');
let getIndeed = require('../models/jobs');
let getJobController = require('../controllers/getJob');

describe('getIndeed', function() {
  it('should be a function', function() {
    expect(getIndeed).to.be.a('function');
  });

  it('should return a callback function', function() {
    var returnValue = getIndeed('software engineer', 'San Francisco', '69.181.59.152');
    expect(returnValue).to.be.a('function');
  });

});

describe('getJob Controller', function() {
  it('module should be exported as an object', function() {
    expect(getJobController).to.be.a('object');
  });

  it('post request should be a function', function() {
    expect(getJobController.post).to.be.a('function');
  });
});

describe('getJob post request', function() {
  let URL = 'http://localhost:3000';
  let path = '/api/v1/jobs';

  it('Post request should return an array of data', function(done) {
    chai
      .request(URL)
      .post(path)
      .set('Content-Type', 'application/json')
      .send({jobTitle: 'software engineer', city: 'San Francisco'})
      .end(function(error, response, body) {
        expect(response.body.results).to.be.a('array');
        done();
      })
  });

  it('Should return status code 200', function(done) {
    chai
      .request(URL)
      .post(path)
      .set('Content-Type', 'application/json')
      .send({jobTitle: 'software engineer', city: 'San Francisco'})
      .end(function(error, response, body) {
        expect(response).to.have.property('statusCode', 200);
        done();
      })    
  });

  it('Post Should not return any error', function(done) {
    chai
      .request(URL)
      .post(path)
      .set('Content-Type', 'application/json')
      .send({jobTitle: 'software engineer', city: 'San Francisco'})
      .end(function(error, response, body) {
        expect(error).to.not.exist;
        done();
      })
  });

  it('Each set of job data should have properties of ..', function(done) {
    chai
      .request(URL)
      .post(path)
      .set('Content-Type', 'application/json')
      .send({jobTitle: 'software engineer', city: 'San Francisco'})
      .end(function(error, response, body) {
        expect(response.body.results[0]).to.have.any.keys(
          'company',
          'city',
          'state',
          'country',
          'formattedLocation',
          'formattedLocationFull',
          'formattedRelativeTime',
          'source',
          'date',
          'snippet',
          'latitude',
          'longitude',
          'jobkey',
          'sponsored',
          'expired',
          'indeedApply'
        );
        done();
      })
  });

});

