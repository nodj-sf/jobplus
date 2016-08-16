import React, { Component } from 'react';
import { connect } from 'react-redux';

import BaseComponent from '../components/base_component';


class JobDetail extends BaseComponent {

  render() {
    if (!this.props.job) {
      return <h1>Job</h1>;
    }
    
    return (
      <div>
        <h1>{ this.props.job.jobtitle }</h1>
        <h2>{ this.props.job.company }</h2> 
        <p>{ this.props.job.formattedRelativeTime }</p>
        <p>{ this.props.job.formattedLocation }</p>
        <blockquote>{ this.tagFreeSnippet(this.props.job.snippet) }</blockquote>
        <a href={this.props.job.url}>link</a>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({ 
  job: state.activeJob 
});

export default connect(mapStateToProps)(JobDetail);
