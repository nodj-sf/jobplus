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

// Anything returned from this function will end up as props on Joblist container
function mapDispatchToProps(dispatch) {
  // Whenever loadJobs is called, the result should be passed to all reducers
  return bindActionCreators( { selectJob: selectJob }, dispatch)
}

// Promote JobList to a container
export default connect(mapStateToProps, mapDispatchToProps)(JobList);


  //<li key={job.title} onClick={() => this.props.selectJob(job)}>
  //  <h2 className="jobListingTitle">{job.title}</h2>
  //</li>

  // const jobItems = props.jobs.map((job) => {
  //   return <JobListItem key={job.id} job={job} />; 
  // });
