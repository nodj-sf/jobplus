'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import Banner from './AppBanner';
import Footer from './AppFooter';
import GMap from './GMap';
import JobList from '../containers/JobListContainer';
import JobDetail from '../containers/JobDetailContainer';
import SearchBar from '../containers/SearchBarContainer';
import RetaurantList from '../containers/RestaurantListContainer';
import TransportationList from '../containers/TransportationListContainer';
import AmenitiesList from '../containers/AmenetiesListContainer';
import {
  selectJob,
  fetchYelp,
  fetchTrains,
  fetchBus,
  fetchGyms,
  fetchParks,
  scrapeDetail,
  loading
} from '../actions/index';


class Results extends Component {
  constructor(props) {
    super(props);
    this.initJob = this.initJob.bind(this);
  }

  // Lifecycle method:
  componentDidUpdate(nextProps) {
    if (this.props.jobs.length) {
     this.initJob(this.props.jobs[0]);
    }
  }

  // Primary callback used in aggregation of the `results_page` display view:
  initJob(job) {
    let props = this.props;
    props.loading(false);
    props.selectJob(job);
    props.fetchYelp(job.city, job.latitude, job.longitude);

    [props.fetchTrains, props.fetchBus, props.fetchParks, props.fetchGyms]
      .forEach(action => action(job.latitude, job.longitude));

    props.scrapeDetail(job.url);
  }

  render() {
    return (
      <div>
        <Banner />

        <div id='jobMain'>
          <div id='jobResultsPane'>
            <div>
              <GMap />
            </div>
            <JobList
              // activeCompanyData={ this.props.activeCompanyData }
              // fetchActiveCompanyData={ this.props.fetchCompanyData }
              />
          </div>

          <div id='jobInfoBody'>
            <JobDetail
              // data={ this.props.activeCompanyData }
              />
            <Tabs onSelect={ this.handleSelect }>
              <TabList>
                <Tab>
                  {[
                    <i
                      className='fa fa-bus'
                      aria-hidden='true'
                      key='bus_Icon'>
                    </i>,
                    `\tTransportation`
                  ]}
                </Tab>
                <Tab>
                  {[
                    <i
                      className='fa fa-futbol-o'
                      aria-hidden='true'
                      key='soccer-ball_Icon'>
                    </i>,
                    `\tAmenities`
                  ]}
                </Tab>
                <Tab>
                  {[
                    <i
                      className='fa fa-yelp'
                      aria-hidden='true'
                      key='Yelp_Icon'>
                    </i>,
                    `\tYelp`
                  ]}
                </Tab>
              </TabList>

              <TabPanel>
                <TransportationList />
              </TabPanel>
              <TabPanel>
                <AmenitiesList />
              </TabPanel>
              <TabPanel>
                <RetaurantList />
              </TabPanel>
            </Tabs>
          </div>
        </div>

      </div>
    );
  }
};


let mapStateToProps = (state) => ({
  jobs: state.jobs
});

let mapDispatchToProps = (dispatch) => bindActionCreators({
  selectJob,
  fetchYelp,
  fetchBus,
  fetchTrains,
  fetchParks,
  fetchGyms,
  scrapeDetail,
  loading
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Results);
