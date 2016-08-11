'use strict';
let GooglePlaces = require('googleplaces');
const Promise = require('promise');

const places = new GooglePlaces( process.env.GOOGLE_PLACES, 'json' );

let getPlaces = (coordinate) => {
  const parameters = {
    location: coordinate.lat + ',' + coordinate.long,
    radius: 500,
    type: 'subway_station|gym|parking'
  };

  return (res) => {
    return new Promise((resolve, reject) => {
      return places.placeSearch(parameters, (status, data) => {
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
