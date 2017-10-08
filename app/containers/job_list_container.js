import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

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
            job={job}
            handleToggle={this.props.handleToggle}
          />
        );
      });
    } else {
      if (this.init > 0) {
        jobList = <div>
          <h4>No Results Now</h4>
        </div>;
      } else {
        this.init++;
        jobList = <div>
          <i className="fa fa-cog fa-spin fa-5x fa-fw"></i> Loading...
        </div>;
      }
    }
    return jobList;
  }

  render() {
    const listHeight = this.props.listHeight;
    return (
      <div className="col-xs-12" style={{padding: 0, backgroundColor: 'white'}}>
        <div className="col-xs-12" style={{padding: '0px 5px'}}>
          <List className="mobileHeightUnset" style={{height: listHeight, overflow: 'hidden', overflowY: 'scroll'}}>{ this.renderList() }</List>
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    jobs: state.jobs,
    jobTerm: state.jobInputTerm,
    locationTerm: state.locationInputTerm,
    activeJob: state.activeJob
  }
};

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
