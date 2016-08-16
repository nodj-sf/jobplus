import React, { Component } from 'react';


// New class `BaseComponent` extends React `Component`, but is modified to include 
// a variety of static helper class methods that may be shared by all sub-classes.
export default class BaseComponent extends Component {

  constructor(props) {
    super(props);
  }

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

  parseAndFormatDaysSincePosted(days) {
    return days
      .match(/(\w+){1,}/gmi)
      .map(str => `${str[0].toUpperCase()}${str.slice(1)}`)
      .join(' ');
  }

  parsePhoneNumber(num) {
    if (num) {
      return num.replace(/^(\d{3})(\d{4})(\d{3})/, "+1 ($1) $2-$3");
    }
  }

  tagFreeSnippet(descrip) {
    return descrip ? 
      descrip.replace(/<[^>]+>|\.(?=\.{3,})/gmi, '') : 
      descrip;
  }
  
}
