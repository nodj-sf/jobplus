import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { selectJob, fetchYelp, fetchGPlaces } from '../actions/index';
import JobItem from '../components/job_item_component';

class JobList extends Component {
  constructor(props) {
    super(props);

    this.jobFunc = this.jobFunc.bind(this);
  }

  jobFunc(job) {
    this.props.selectJob(job);
    this.props.fetchYelp(job.city, job.latitude, job.longitude);
    this.props.fetchGPlaces(job.city, job.latitude, job.longitude);
  }

  renderList() {
    return this.props.jobs.map((job) => {
      return (
        <JobItem
          key={job.jobkey}
          jobFunc={this.jobFunc}
          job={job} />
      );
    });
  }

  render() {
    return (
      <div id="jobsContainer" className="jobsPaneLeft appCols">
        <b>Select A Job!</b>
        <ul className="jobsList">
          { this.renderList() }
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectJob: selectJob , fetchYelp: fetchYelp, fetchGPlaces: fetchGPlaces }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(JobList);
