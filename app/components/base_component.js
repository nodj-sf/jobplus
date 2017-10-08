import React, { Component } from 'react';


// New class `BaseComponent` extends React `Component`, but is modified to include
// a variety of static helper class methods that may be shared by all sub-classes.
export default class BaseComponent extends Component {
  constructor(props) {
    super(props);
  }

  // Returns Hex color value based on input distance:
  distanceColor(dist) {
    return dist <= 1.0 ?
      "#25DC25" : dist <= 2.0 ?
      "#E0E108" : dist <= 3.0 ?
      "#E17E08" :
      "#FD0505";
  }

  // Returns formatted string specifying the posting's job title:
  parseAndFormatJobTitle(job) {
    const specialFormatTerms = {
      '(nyc)': '(NYC)',
      '.net': '.NET',
      'and': '&',
      'dba': 'DBA',
      'dev/ops': 'Dev/Ops',
      'ios': 'iOS',
      'javascript': 'JavaScript',
      'js': 'JS',
      'nosql': 'NoSQL',
      'nyc': 'NYC',
      'of': 'of',
      'php': 'PHP',
      'with': 'w/'
    };

    return job
      .trim()
      // .split(/[\s|\/]/gmi)
      .split(' ')
      .reduce((memo, index) => {
        return index.toLowerCase() in specialFormatTerms ?
          memo += ` ${specialFormatTerms[index.toLowerCase()]} ` :
          memo += ` ${index.charAt(0).toUpperCase()}${index.slice(1).toLowerCase()} `;
      })
      .replace(/\s(\/)\s/gmi, "$1")
      // .replace(/\band\b/gmi, "&")
      .trim();
  }

  // Returns formatted string specifying the period of time since job listing's post date:
  parseAndFormatDaysSincePosted(days) {
    return days
      .match(/(\w+){1,}/gmi)
      .map(str => `${str[0].toLowerCase()}${str.slice(1)}`)
      .join(' ');
  }

  // Modifies plain-text nine-digit phone number [Format: XXXXXXXXX] to
  // conform to the desired style [Format: +1 (XXX) XXX-XXX]:
  parsePhoneNumber(num) {
    if (num) {
      return num.replace(/^(\d{3})(\d{4})(\d{3})/, "+1 ($1) $2-$3");
    }
  }

  // Modifes photo URL from default small-file size ('ms') to large-file size ('l'):
  parseYelpRestaurantPhoto(photo) {
    return photo.replace(/ms(\.jpg)$/i, "l$1");
  }

  // Removes all embedded HTML tags from the `job` object's `snippet` value:
  tagFreeSnippet(descrip) {
    return descrip ?
      descrip.replace(/<[^>]+>|\.(?=\.{3,})/gmi, '') :
      descrip;
  }

  // Returns the radian-valued float equivalent of the given input in degrees:
  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  // Returns the Euclidean distance separating two geographical points in miles (mi):
  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371,       // Radius (r) of the Earth in kilometers (km)
          kmToMilesConversionFactor = 0.621371;

    let [dLat, dLon] = [this.deg2rad(lat2 - lat1), this.deg2rad(lon2 - lon1)];  // Class method `deg2rad` defined above
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)),
        d = R * c;        // Distance (d) in kilometers (km)
    return +`${(d * kmToMilesConversionFactor).toFixed(2)}`; // Convert kilometers (km) to miles (mi)
  }

}
