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
        <h3>
          <a href={this.props.job.url} className="link-state" target="_blank">{ this.props.job.jobtitle }</a>
        </h3>
        <h4>{ this.props.job.company }</h4> 
        <hr />
        <h6>{ this.props.job.formattedLocation }</h6>
        <p>{ this.props.job.formattedRelativeTime }</p>
        <blockquote>{ details }&hellip; [<a href={this.props.job.url} className="link-state" target="_new">more</a>]</blockquote>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({ 
  job: state.activeJob,
  scrapDetails: state.scrapDetails
});

export default connect(mapStateToProps)(JobDetail);
