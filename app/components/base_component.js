import React, { Component } from 'react';


// New class `BaseComponent` extends React `Component`, but is modified to include 
//  a variety of static helper class methods that may be shared by all sub-classes.
export default class BaseComponent extends Component {
  constructor(props) {
    super(props);
  }

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
      'at': '@',
      'backend': 'Back-End',
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

    /*
    return job
      .trim()
      // .split(/[\s|\/]/gmi)
      // .replace(/\s(\/)\s(?:\w+)/gmi, '$1')
      // .replace(/\band\b/gmi, "&")
      .replace(/\b([a-z])/gmi, match => match.toUppercase())
      .replace(/\s(\/)\s((?:\w+))/gmi, ((match1, match2) => match1 + match2[0].toUpperCase() + match2.slice(1).toLowerCase())('$1', '$2'))
      .replace(/No\.?(\s+)?(\d+)/gmi, '\u2116. $2')
      .replace(/(\w+)(?:,)\sInc(?!\.)/gmi, '$1, Inc.')
      .split(' ')
      .reduce((memo, index) => {
        return index.toLowerCase() in specialFormatTerms ?
          memo += ` ${specialFormatTerms[index.toLowerCase()]} ` :
          memo += ` ${index.charAt(0).toUpperCase()}${index.slice(1).toLowerCase()} `;
      })
      .trim(); */

      let preprocessedJobStr = job
        .toLowerCase()
        .split(' ')
        .map(word => word in specialFormatTerms ? specialFormatTerms[word] : word)
        .join(' ');
      // let formattedJob = Object.keys(specialFormatTerms)
      //   .forEach(term => {
      //     if (job.includes(term)) {
      //       job = job.replace(term, specialFormatTerms[term]);
      //     }
      //   });

      return preprocessedJobStr
        .replace(/\b([a-z])/gmi, match => match.toUpperCase())
        .replace(/(\s|\b)\/(\s|\b)/g, '/');
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
    if (num) {
      return num.replace(/^(\d{3})(\d{4})(\d{3})/, '+1 ($1) $2-$3');
    }
  }

  // Modifes photo URL from default small-file size ('ms') to large-file size ('l'):
  parseYelpRestaurantPhoto(photo) {
    return photo.replace(/ms(\.jpg)$/i, 'l$1');
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
  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371,       // Radius (r) of the Earth in kilometers (km)
          kmToMilesConversionFactor = 0.621371;

    let [dLat, dLon] = [this.deg2rad(lat2 - lat1), this.deg2rad(lon2 - lon1)];  // Class method `deg2rad` defined above
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
            Math.sin(dLon / 2) * Math.sin(dLon / 2); 
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)),
        d = R * c;        // Distance (d) in kilometers (km)
    
    // Convert kilometers (km) to miles (mi)
    return +`${(d * kmToMilesConversionFactor).toFixed(2)}`;
  }

}
