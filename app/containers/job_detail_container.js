import React, { Component } from 'react';
import { connect } from 'react-redux';


class JobDetail extends Component {
  render() {
    if (!this.props.job) {
      return <h1>Job</h1>;
    }
    console.log("PROPS", this.props.job);
    return (
      <div>
        <h3>Details for:</h3>
        <div>{this.props.job.jobtitle}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    job: state.activeJob
  };
}

export default connect(mapStateToProps)(JobDetail);
