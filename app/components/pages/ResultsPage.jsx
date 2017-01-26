'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import Banner from '../partials/AppBanner';
import Footer from '../partials/AppFooter';
// import GMap from './GMap';
// import JobList from '../containers/JobListContainer';
import ListSidebar from '../partials/ListSidebar';
import TabsListData from '../../constants/json/TabsListData.json';
import TabPanelsData from '../../constants/json/TabPanelsData';

import JobDetail from '../../containers/JobDetailContainer';
import SearchBar from '../../containers/SearchBarContainer';
import {
  selectJob,
  fetchYelp,
  fetchTrains,
  fetchBus,
  fetchGyms,
  fetchParks,
  scrapeDetail,
  loading
} from '../../actions/index';


class Results extends Component {
  constructor(props) {
    super(props);
    this.initJob = this.initJob.bind(this);
    this.renderTabList = this.renderTabList.bind(this);
    this.renderTabPanels = this.renderTabPanels.bind(this);
  }

  // Lifecycle method:
  componentDidUpdate(nextProps) {
    if (this.props.jobs.length) {
     this.initJob(this.props.jobs[0]);
    }
  }

  // Primary callback used in aggregation of the `results_page` display view:
  initJob(job) {
    const props = this.props;
    props.loading(false);
    props.selectJob(job);
    props.fetchYelp(job.city, job.latitude, job.longitude);

    [props.fetchTrains, props.fetchBus, props.fetchParks, props.fetchGyms]
      .forEach(action => action(job.latitude, job.longitude));

    props.scrapeDetail(job.url);
  }

  renderTabList(tabsListMap) {
    return tabsListMap.map((tabItem, index) =>
      <Tab key={ `TabItem_${tabItem.name}` }>
        {[
          <i
            key={ `${tabItem.key}_Icon` }
            className={ `fa fa-${tabItem.iconClass}` }
            aria-hidden={ true } />,
          <span key={ `TabLabel_${tabItem.name}` }>{ `\t${tabItem.name}` }</span>
        ]}
      </Tab>
    );
  }

  renderTabPanels(tabPanelsMap) {
    return tabPanelsMap.map((tabPanel, index) =>
      <TabPanel key={ `TabPanel_${tabPanel.name}` }>
        { tabPanel.disp }
      </TabPanel>
    );
  }

  render() {
    return (
      <div>
        <Banner />

        <div id="jobMain">
          <ListSidebar />

          <div id="jobInfoBody">
            <JobDetail />
            <Tabs onSelect={ this.handleSelect }>
              <TabList>{ this.renderTabList(TabsListData) }</TabList>
              { this.renderTabPanels(TabPanelsData) }
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




// <TabPanel>
//   <TransportationList />
// </TabPanel>
// <TabPanel>
//   <AmenitiesList />
// </TabPanel>
// <TabPanel>
//   <RetaurantList />
// </TabPanel>
