import React, { Component } from 'react';
import ReactDOM from 'react-dom';


export default class JobItem extends Component {
  render() {
    return (
      <li onClick={() => this.props.jobFunc(this.props.job)}>
        <p>
          <strong>{this.props.job.company}</strong> <small>(posted: {this.props.job.formattedRelativeTime})</small><br/>{this.props.job.jobtitle}
        </p>
      </li>
    );
  }
}
