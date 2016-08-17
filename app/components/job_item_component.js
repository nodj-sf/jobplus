import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import BaseComponent from './base_component';


export default class JobItem extends BaseComponent {

  constructor(props) {
    super(props);
  }

  jobListItemClickHandler() {
    this.props.jobFunc(this.props.job);
  }

  render() {
    return (
      <div>
        <li className="jobLI" onClick={() => this.props.jobFunc(this.props.job) }>
          <h2>{ this.parseAndFormatJobTitle(this.props.job.jobtitle) }</h2>
          <div className="jobLI_MetaInfo">
            <h6>
              <b>{this.props.job.company || 'Unlisted'}</b>
            </h6>
            <i className="daysSincePosted">{ this.parseAndFormatDaysSincePosted(this.props.job.formattedRelativeTime) }</i>
          </div>
        </li>
        <hr />
      </div>
    );
  }
}
