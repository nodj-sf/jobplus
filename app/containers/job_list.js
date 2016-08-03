import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { selectJob } from '../actions/index';


class JobList extends Component {
  renderList() {
    return this.props.jobs.map((job) => {
      return (
          <li key={job.title} onClick={() => this.props.selectJob(job)}>
            <h2 className="jobListingTitle">{job.title}</h2>
          </li>
        );
    });
  }

  render() {
    return (
      <ul className="jobsList">
        {this.renderList()}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    jobs: state.jobs
  };
}

// Anything returned from this function will end up as props on Joblist container
function mapDispatchToProps(dispatch) {
  // Whenever loadJobs is called, the result should be passed to all reducers
  return bindActionCreators( { selectJob: selectJob }, dispatch)
}

// Promote JobList to a container
export default connect(mapStateToProps, mapDispatchToProps)(JobList);
