import React, { Component } from 'react';
import ReactDOM from 'react-dom';


export default class JobItem extends Component {
  render() {
    return (
      <li onClick={() => this.props.jobFunc(this.props.job)}>
        <p>
          <strong>{this.props.job.company || 'Unlisted'} </strong> 
          <small>(posted: {
               this.props.job.formattedRelativeTime
                .match(/(\w+){1,}/gmi)
                .map(str => `${str[0].toUpperCase()}${str.slice(1)}`)
                .join(" ") 
              })</small><br/>
          {this.props.job.jobtitle}
        </p>
      </li>
    );
  }
}