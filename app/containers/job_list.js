import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { selectJob } from '../actions/index';
import JobListItem from "../components/job_list_item";


class JobList extends Component {
  renderList() {
    return this.props.jobs.map((job) => {
      return (
        <JobListItem key={job.id} job={job} />
      );
    });
  }

  render() {
    return (
      <div className="jobsPaneLeft">
        <b>Select A Job!</b>;
        <ul className="jobsList">
          {this.renderList()}
        </ul>
      </div>
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
