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
      <div id="jobsContainer" className="jobsPaneLeft appCols">
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

// Anything returned from this function will end up as props on Joblist container
// We now have an action thats going to change the state of our DOM. We need to 
// notify all containers of the action that can be triggered
function mapDispatchToProps(dispatch) {
  // Whenever loadJobs is called, the result should be passed to all reducers
  return bindActionCreators( { selectJob: selectJob }, dispatch)
}

// Promote JobList to a container
export default connect(mapStateToProps, mapDispatchToProps)(JobList);
