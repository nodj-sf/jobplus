import React, { Component } from 'react';
import { connect } from 'react-redux';

import BaseComponent from '../components/base_component';


class JobDetail extends BaseComponent {

  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.job) {
      return <h1>Job</h1>;
    }
    if (this.props.scrapDetails) {
      var details = this.props.scrapDetails.data.details;
    }
    return (
      <div className="job-detail">
        <h3><a href={this.props.job.url} target="_blank">{ this.props.job.jobtitle }</a></h3>
        <h4>{ this.props.job.company + ', ' + this.props.job.formattedLocation}</h4> 
        <p>{ this.props.job.formattedRelativeTime }</p>
        <blockquote><a href={this.props.job.url} target="_blank">{ details }</a>&hellip; <small>[<a href={this.props.job.url} target="_new">more</a>]</small></blockquote>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({ 
  job: state.activeJob,
  scrapDetails: state.scrapDetails
});

export default connect(mapStateToProps)(JobDetail);
