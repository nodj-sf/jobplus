let getIndeed = require('../models/jobs.js');
let chai = require('chai');
let expect = chai.expect;

describe('getIndeed', function() {
  it('should be a function', function() {
    expect(getIndeed).to.be.a('function');
  });

  it('should return a callback function', function() {
    var returnValue = getIndeed('software engineer', 'San Francisco', '69.181.59.152');
    expect(returnValue).to.be.a('function');
  });

  it('should do something', function() {
    var res = {
      send: function(results) {
        return results;
      }
    };
    var func = getIndeed('software engineer', 'San Francisco', '69.181.59.152');
    console.log('func:    ', func());
    expect(func(res)).to.be.a('array');
  });
});