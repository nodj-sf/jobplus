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
    this.props.fetchGPlaces(job.latitude, job.longitude);
  }

  renderList() {
    return !this.props.jobs || !this.props.jobs.length ?
      <div className="noResultsShown">
        <h4 className="noResultsShown">No results</h4>
      </div> : 
      this.props.jobs.map((job) => {
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
        <b>
          {["Results for ",
           <i key="jobTermTitle">{this.props.jobTerm}</i>,
           " in ",
           <i key="locationTermTitle">{this.props.locationTerm}</i>
          ]}
        </b>
        <div>
          <ul className="jobsList">{ this.renderList() }</ul>
        </div>
      </div>
    );
  }
}


let mapStateToProps = (state) => ({ 
  jobs: state.jobs, 
  jobTerm: state.jobInputTerm, 
  locationTerm: state.locationInputTerm 
});

let mapDispatchToProps = (dispatch) => bindActionCreators({ 
  selectJob, 
  fetchYelp, 
  fetchGPlaces
}, dispatch);


// Promote `JobList` to be a Container:
export default connect(mapStateToProps, mapDispatchToProps)(JobList);
