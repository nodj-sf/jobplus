import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import BaseComponent from './base_component';


export default class JobItem extends BaseComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li className={ this.props.setActive(this.props.job) } onClick={ () => this.props.jobFunc(this.props.job) }>
        <h2 className="textEllipsis">{ this.parseAndFormatJobTitle(this.props.job.jobtitle) }</h2>
        <div className="jobLI_MetaInfo">
          <h6 className="textEllipsis">
            <b>{ this.parseAndFormatJobTitle(this.props.job.company) || 'Unlisted' }</b>
          </h6>
          <i className="daysSincePosted">{ this.parseAndFormatDaysSincePosted(this.props.job.formattedRelativeTime) }</i>
        </div>
      </li>
    );
  }
};
