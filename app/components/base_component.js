import React, { Component } from 'react';


// New class `BaseComponent` extends React `Component`, but is modified to include 
// a variety of static helper class methods that may be shared by all sub-classes.
export default class BaseComponent extends Component {
  constructor(props) {
    super(props);
  }

  // Returns Hex color value based on the magnitude of the input distance:
  distanceColor(dist) {
    return dist <= 1.0 ?
      "#25DC25" : dist <= 2.0 ?
      "#C7C846" : dist <= 3.0 ?
      "#E17E08" :
      "#FD0505";
  }

  // Returns Hex color value coded to the magnitude of an entity's user review-averaged rating:
  ratingColor(rating) {
    return rating === 5 ?
      "#CA060A" : rating >= 4.0 ?
      "#F2752D" : rating  >= 3.0 ?
      "#EF8B12" : rating >= 2.0 ?
      "#E0B62A" : 
      "#D18F20";
  }

  // Returns formatted string specifying the posting's job title:
  parseAndFormatJobTitle(job) {
    const specialFormatTerms = {
      '(nyc)': '(NYC)',
      '.net': '.NET',
      'and': '&',
      'at': '@',
      'dba': 'DBA',
      'dev/ops': 'Dev/Ops',
      'dev-ops': 'Dev/Ops',
      'full-stack': 'Full-Stack',
      'ios': 'iOS',
      'javascript': 'JavaScript',
      'js': 'JS',
      'nosql': 'NoSQL',
      'nyc': 'NYC',
      'of': 'of',
      'os': 'OS',
      'php': 'PHP',
      'with': 'w/'
    };

    return job
      .trim()
      // .split(/[\s|\/]/gmi)
      // .replace(/\s(\/)\s(?:\w+)/gmi, '$1')
      .replace(/\s(\/)\s((?:\w+))/gmi, ((match1, match2) => match1 + match2[0].toUpperCase() + match2.slice(1).toLowerCase())('$1', '$2'))
      .replace(/No\.(\d+)/gmi, '\u2116. $1')
      .replace(/(\w+)(?:,)\sInc(?!\.)/gmi, '$1, Inc.')
      .split(' ')
      .reduce((memo, index) => {
        return index.toLowerCase() in specialFormatTerms ?
          memo += ` ${specialFormatTerms[index.toLowerCase()]} ` :
          memo += ` ${index.charAt(0).toUpperCase()}${index.slice(1).toLowerCase()} `;
      })
      // .replace(/\band\b/gmi, "&")
      .trim();
  }

  // Returns formatted string specifying the period of time since job listing's post date:
  parseAndFormatDaysSincePosted(days) {
    return days
      .match(/(\w+){1,}/gmi)
      .map(str => `${str[0].toUpperCase()}${str.slice(1)}`)
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

  // Generates a concatenated set of FontAwesome star glyph icons representative of an entity's user reviews average rating:
  getStarRating(rating) {
    let starsContainer = [],
        radix = rating - Math.floor(rating),
        i = 0, j = 0,
        [filledStars, emptyStars] = [Math.floor(rating), 5 - Math.ceil(rating)];

    if (radix) {
      starsContainer.push(<i className="fa fa-star-half-full" style={{ "color": this.ratingColor(rating) }} key={`RatingHalfStar_${i}`}></i>);
    }

    while (i < filledStars) {
      starsContainer.unshift(<i className="fa fa-star" style={{ "color": this.ratingColor(rating) }} key={`RatingFilledStar_${i}`}></i>);
      i++;
    }

    while (j < emptyStars) {
      starsContainer.push(<i className="fa fa-star-o" style={{ "color": this.ratingColor(rating) }} key={`RatingEmptyStar_${j}`}></i>);
      j++;
    }

    return (
      <div className="starsRating">
        {[`Rating:\t`,
          starsContainer,
          `\t${rating}`
        ]}
      </div>
    );
  }

  // Produces a formatted string representation of an entity's tags:
  getItemTags(item) {
    let tags = [...Object.keys(item).reduce((memo, index) => memo = memo.add(item[index]), new Set())]
      .map((word, index) => <span className='contentTag' key={`TagItem_${index}`}>{ `${word.charAt(0).toUpperCase()}${word.slice(1)}` }</span>);
      // .map(tag => tag.split(/_/g));
        // .map((word, index) => <span className='contentTag' key={`TagItem_${index}`}>{ `${word.charAt(0).toUpperCase()}${word.slice(1)}` }</span>));
        // .join(' '));
    
    return (
      {tags}
    );
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



//<p className="tagsList">
//  {[`Tags:\t`,
//    ...tags
//  ]}
//</p>

// rating >= 0 ?

// if (starsContainer.length < 5) {

// }

// radix && radix >= 0.5 ?
//   starsContainer.push(<i className="fa fa-star" key={`RatingStar_${i}`}></i>) :
//   radix && radix < 0.5 ? starsContainer.push(<i className="fa fa-star-half-full" key={`RatingHalfStar_${i}`}></i>) :
//   starsContainer.push(<i className="fa fa-star-o" key={`RatingEmptyStar_${i}`}></i>);
//   