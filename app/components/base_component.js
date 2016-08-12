import React, { Component } from 'react';


// New class `BaseComponent` extends React `Component`, but is modified to include 
// a variety of static helper class methods that may be shared by all sub-classes.
export default class BaseComponent extends Component {

  parseAndFormatJobTitle(job) {
    return job
      .split(' ')
      .reduce((memo, index) => memo += `${index.charAt(0).toUpperCase()}${index.slice(1).toLowerCase()} `, '')
      .trim();
  }

  parseAndFormatDaysSincePosted(days) {
    return days
      .match(/(\w+){1,}/gmi)
      .map(str => `${str[0].toUpperCase()}${str.slice(1)}`)
      .join(' ');
  }

}
