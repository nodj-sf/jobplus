'use strict';
import React, { Component } from 'react';
import BaseComponent from './BaseComponent';


export default class JobItem extends BaseComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.defaultToActive) {
      this.props.jobFunc(this.props.job);
    }
  }

  render() {
    const currentJob = this.props.job;

    return (
      <li
        className={ this.props.setActive(currentJob) }
        onClick={ () => this.props.jobFunc(currentJob) }>
        <h2 className="text-of">{ this.parseAndFormatJobTitle(currentJob.jobtitle) }</h2>
        <div className="jobLI_MetaInfo">
          <h6>
            <b>{ currentJob.company || 'Unlisted' }</b>
          </h6>
          <i className="daysSincePosted">{ this.parseAndFormatDaysSincePosted(currentJob.formattedRelativeTime) }</i>
        </div>
      </li>
    );
  }
};
