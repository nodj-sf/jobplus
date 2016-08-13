'use strict';
let GooglePlaces = require('googleplaces');
const Promise = require('promise');

const places = new GooglePlaces( process.env.GOOGLE_PLACES, 'json' );

let getPlaces = (coordinate) => {
  const parameters = {
    location: coordinate.lat + ',' + coordinate.long,
    radius: 3219,
    type: 'subway_station|train_station|bus_station|park|gym'
  };
  
  return (res) => {
    return new Promise((resolve, reject) => {
      return places.placeSearch(parameters, (status, data) => {
        // console.log('data: ', data);
        if (!data) {
          reject(data);
        } else {
          resolve({
            respond: res.send(data),
            data: data
          });
        }
      });
    });
  };
};

module.exports = getPlaces;
