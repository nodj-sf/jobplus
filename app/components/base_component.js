import React, { Component } from 'react';


// New class `BaseComponent` extends React `Component`, but is modified to include 
//  a variety of static helper class methods that may be shared by all sub-classes.
export default class BaseComponent extends Component {

  // Returns Hex color value based on the magnitude of the input distance:
  distanceColor(dist) {
    return dist <= 1.0 ? '#25DC25' 
      : dist <= 2.0 ? '#C7C846' 
      : dist <= 3.0 ? '#E17E08' 
      : '#FD0505';
  }

  // Returns Hex color value coded to the magnitude of an entity's user review-averaged rating:
  ratingColor(rating) {
    return rating === 5 ? '#CA060A' 
      : rating >= 4.0 ? '#F2752D' 
      : rating >= 3.0 ? '#EF8B12' 
      : rating >= 2.0 ? '#E0B62A' 
      : '#D18F20';
  }

  // Returns formatted string specifying the posting's job title:
  parseAndFormatJobTitle(job = job.toLowerCase()) {
    const specialFormatTerms = {
      '.net': '.NET',
      'and': '&',
      'api': 'API',
      'at': '@',
      'aws': 'AWS',
      'backend': 'Back-End',
      'bi': 'BI',
      'c#': 'C#',
      'c+': 'C+',
      'c++': 'C++',
      'db': 'DB',
      'dba': 'DBA',
      'dev/ops': 'Dev/Ops',
      'dev-ops': 'Dev/Ops',
      'frontend': 'Front-End',
      'full-stack': 'Full-Stack',
      'html': 'HTML',
      'css': 'CSS',
      'ios': 'iOS',
      'iot': 'IoT',
      'javascript': 'JavaScript',
      'js': 'JS',
      'latex': 'LaTeX',
      'llc': 'LLC',
      'llp': 'LLP',
      'mariadb': 'MariaDB',
      'mysql': 'MySQL',
      'nosql': 'NoSQL',
      'nyc': 'NYC',
      'of': 'of',
      'os': 'OS',
      'php': 'PHP',
      'qa': 'QA',
      'sql': 'SQL',
      'tdd': 'TDD',
      'ui': 'UI',
      'ux': 'UX',
      'with': 'w/'
    };

    // let preprocessedJobStr;
    return job
      .toLowerCase()
      .split(' ')
      .map(word => word in specialFormatTerms ? specialFormatTerms[word]  // Map special terms
        : new RegExp(`[A-Z]{${word.length}}`, 'm').test(word) ? word      // Capture acronyms
        : word.replace(/\b([a-z])/gmi, match => match.toUpperCase())
      )
      .join(' ');
  }

  // Returns an object mapping <addressComponent> keys to their respective string values:
  parseAndFormatYelpRestaurantAddress(address) {
    return !address || !address.length 
      ? 'Address Unlisted'
      : address.length <= 2 ? {
          district: null,
          street: address[0],
          complements: null,
          municipality: address.length > 1 ? address[1] : null
        }
      : {
        district: address[address.length - 2],
        street: address[0],
        complements: address.length > 3 ? [...address.slice(1, address.length - 2)] : null,
        municipality: address.slice(-1)[0]
      };  
  }

  // Returns formatted string specifying the period of time since job listing's post date:
  parseAndFormatDaysSincePosted(days) {
    return days
      .match(/(\w+){1,}/gmi)
      .map(str => `${str[0].toUpperCase()}${str.slice(1)}`)
      .join(' ');
  }

  // Modifies plain-text nine-digit phone number [Format: XXXXXXXXX] to 
  //  conform to the desired style [Format: +1 (XXX) XXX-XXX]:
  parsePhoneNumber(num) {
    return !!num ? num.replace(/^(\d{3})(\d{4})(\d{3})/, '+1 ($1) $2-$3') : 'Unlisted number';
  }

  // Modifes photo URL from default small-file size ('ms') to large-file size ('l'):
  parseYelpRestaurantPhoto(photo) {
    let yelpPhotoObj = {
      originalFileSize: photo.replace(/\/\w+\.(png|jpg|jpeg|bmp|gif)$/i, '/o.$1'),
      querySelectParameter: photo.replace(/(?:.+\/bphoto\/)(.+)(?:\/\w+\.\w+)$/, '$1'),
      yelpLightboxURL: (yelpId) => 
        `https://www.yelp.com/biz_photos/${yelpId}?select=${yelpPhotoObj.querySelectParameter}`
    };
    return yelpPhotoObj;
  }

  // Returns item tag as a pre-processed, properly formatted string:
  parseAndFormatTag(tag) {
    return tag
      .replace(/_/gmi, ' ')
      .split(' ')
      .reduce((memo, index) => memo += index === 'and' || index === 'an' || index === 'a' || index === 'of' ?
          `${index} ` : 
          `${index.charAt(0).toUpperCase()}${index.slice(1).toLowerCase()} `, '')
      .trim();
  }

  // Constructs the appropriate Google Maps Directions service URL using geographic coordinates,
  //  in the case of Google Places API data input, and address strings for Yelp API data input:
  getGoogleMapsDirectionsURL(listItemCoords, selectedJobCoords, API_Provider) {
    
    // Utility function returns "concatenation-case" string (i.e., words joined by plus ("+") signs)
    //  for parsed `listItemCoords` inputs sourced from the Yelp API:
    const getConcatCase = (addressObj) => Object.keys(addressObj)
      .filter(key => key === 'street' || key === 'municipality')
      .reduce((memo, curr, arr) => {
        memo.push(addressObj[curr]);
        return memo;
      }, [])
      .join(' ')
      .replace(/\s/g, '+');

    return 'https://www.google.com/maps/dir/' + (API_Provider === 'Google Places API'
      ? `${selectedJobCoords.lat},${selectedJobCoords.lng}/${listItemCoords.lat},${listItemCoords.lng}/`
      : `${selectedJobCoords.lat},${selectedJobCoords.lng}/${getConcatCase(listItemCoords)}/`);
  }

  // Produces a formatted string representation of an entity's tags:
  getItemTags(item) {
    return Object
      .keys(item)
      .map(key => this.parseAndFormatTag(item[key]))
      .join(', ');
  }

  // Generates a concatenated set of FontAwesome star glyph icons representative of an entity's user reviews average rating:
  getStarRating(rating) {
    let starsContainer = [],
        radix = rating - Math.floor(rating),
        i = 0, j = 0,
        [filledStars, emptyStars] = [Math.floor(rating), 5 - Math.ceil(rating)];

    if (radix) {
      starsContainer.push(<i className='fa fa-star-half-full' style={{ color: this.ratingColor(rating) }} key={ `RatingHalfStar_${i}` }></i>);
    }

    while (i < filledStars) {
      starsContainer.unshift(<i className='fa fa-star' style={{ color: this.ratingColor(rating) }} key={ `RatingFilledStar_${i}` }></i>);
      i++;
    }

    while (j < emptyStars) {
      starsContainer.push(<i className='fa fa-star-o' style={{ color: this.ratingColor(rating) }} key={ `RatingEmptyStar_${j}` }></i>);
      j++;
    }

    return (
      <div className='starsRating'>
        {[
          // `Rating:\t`,
          <i className='fa fa-heart cardDescriptionGlyph' key={ `RatingLoveGlyphIcon_${rating}` }></i>,
          `\t`,
          starsContainer,
          `\t${rating}`
        ]}
      </div>
    );
  }

  // Returns a color-coded, easily-understood visual using blocks to represent the relative distance an 
  //  item resides away from the currently active job:
  getDistanceBlocks(dist) {
    let blocksContainer = [];
    const repeatBlockGenerator = (numBlocks, color = this.distanceColor(dist)) => {
      let i = 0;
      while (i < numBlocks) {
        blocksContainer.push(<div className='distanceBlock' style={{ background: color }}></div>);
        i++;
      }
    };

    switch (Math.floor(dist)) {
      case 0.0:
        repeatBlockGenerator(1);
        repeatBlockGenerator(4, '#BEBEBE');
        break;
      case 1.0:
        repeatBlockGenerator(2);
        repeatBlockGenerator(3, '#BEBEBE');
        break;
      case 2.0:
        repeatBlockGenerator(3);
        repeatBlockGenerator(2, '#BEBEBE');
        break;
      case 3.0:
        repeatBlockGenerator(4);
        repeatBlockGenerator(1, '#BEBEBE');
        break;
      default:
        repeatBlockGenerator(5);
        break;
    }

    return (
      <div className='blockDistanceContainer' key={ `DistanceInBlocks_${dist}` }>
        {[ blocksContainer ]}
      </div>
    );
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
  getDistanceFromLatLngInKm(coordsObj1, coordsObj2) {
    const RADIUS_OF_EARTH = 6371,                    // Units: Kilometers (km)
          KM_TO_MILES_CONVERSION_FACTOR = 0.621371,
          [{ lat: lat1, lng: lng1 }, { lat: lat2, lng: lng2 }] = [coordsObj1, coordsObj2];

    let [dLat, dLng] = [this.deg2rad(lat2 - lat1), this.deg2rad(lng2 - lng1)];  // Class method `deg2rad` defined above
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
            Math.sin(dLng / 2) * Math.sin(dLng / 2); 
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)),
        distance = RADIUS_OF_EARTH * c;             // Units: Kilometers (km)
    
    // Convert back-conversion from kilometers (km) to miles (mi):
    return +`${(distance * KM_TO_MILES_CONVERSION_FACTOR).toFixed(2)}`;
  }

}
