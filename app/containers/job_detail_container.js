import React, { Component } from 'react';
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';

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
      <div style={{marginTop: 1, backgroundColor: 'white', padding: 0}}>
        <Divider />
        <h4 style={{marginTop: 20}}>{ this.props.job.company }, { this.props.job.formattedLocation }</h4>
        <h5><a href={this.props.job.url} target="_blank">{ this.props.job.jobtitle }</a></h5>
        <blockquote style={{fontSize: '1em', marginBottom: 20, borderLeft: '5px solid #52B3D9'}}>{ details }&hellip; [<a href={this.props.job.url} className="link-state" target="_new">more</a>]</blockquote>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  job: state.activeJob,
  scrapDetails: state.scrapDetails
});

export default connect(mapStateToProps)(JobDetail);
