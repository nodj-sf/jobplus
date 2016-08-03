import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { selectJob } from '../actions/index';

class JobList extends Component {
  renderList() {
    return this.props.jobs.map((job) => {
      return (
          <li key={job.title} onClick={() => this.props.selectJob(job)}>
            <h3>{job.title}</h3>
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

// anything returned from this function will end up as props on Joblist container
function mapDispatchToProps(dispatch) {
  // whenever loadJobs is called, the result should be passed to all reducers
  return bindActionCreators( { selectJob: selectJob }, dispatch)
}

// Promote JobList to a container
export default connect(mapStateToProps, mapDispatchToProps)(JobList);
