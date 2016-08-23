import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import { selectJob, fetchYelp, fetchBus, fetchTrains, fetchParks, fetchGyms, scrapDetail, loading, activeJob } from '../actions/index';
import JobItem from '../components/job_item_component';
import BaseComponent from '../components/base_component';


class JobList extends BaseComponent {
  constructor(props) {
    super(props);

    this.jobFunc = this.jobFunc.bind(this);
    this.getData = this.getData.bind(this);
    this.setActive = this.setActive.bind(this);
    this.init = 0;
  }

  setActive(job) {
    return job === this.props.activeJob ? 'active jobLI' : 'jobLI';
  } 

  jobFunc(job) {
    this.props.loading(true);
    _.debounce(this.getData, 200)(job);
  }

  getData(job) {
    let props = this.props,
        [lat, lng] = [job.latitude, job.longitude];
    
    props.selectJob(job);
    props.fetchYelp(job.city, lat, lng);
    props.fetchTrains(lat, lng);
    props.fetchBus(lat, lng);
    props.fetchParks(lat, lng);
    props.fetchGyms(lat, lng);
    props.scrapDetail(job.url);
    
    props.loading(false);
  }

  renderList() {
    let jobList = '';

    if (this.props.jobs.length > 0) {
      jobList = this.props.jobs.map((job) => {
        return (
          <JobItem
            key={job.jobkey}
            setActive={this.setActive}
            jobFunc={this.jobFunc}
            job={job} />
        );
      });
    } else {
      if (this.init > 0) {
        jobList = <div className="noResultsShown">
          <h4 className="noResultsShown">No Results Now</h4>
        </div>;
      } else {
        this.init++;
        jobList = <div id="placesContainer">
          <i className="fa fa-refresh fa-spin fa-5x fa-fw loadingSpinner"></i> Loading...
        </div>;
      }
    }

    return jobList;
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
  locationTerm: state.locationInputTerm,
  activeJob: state.activeJob
});

let mapDispatchToProps = (dispatch) =>  {
  return bindActionCreators({ 
    selectJob, 
    fetchYelp, 
    fetchBus, 
    fetchTrains, 
    fetchParks, 
    fetchGyms,
    scrapDetail,
    loading
  }, dispatch);
};

// Promote JobList to a container:
export default connect(mapStateToProps, mapDispatchToProps)(JobList);
