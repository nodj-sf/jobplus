import React, {Component} from 'react';
import { connect } from 'react-redux';
import { selectJob, fetchYelp, fetchTrains, fetchBus, fetchGyms, fetchParks, scrapDetail, loading } from '../actions/index';
import { bindActionCreators } from 'redux';

import Banner from './banner_component';
import DataDiagram from './diagram_component';
import GMap from './google_map_component';
import JobList from '../containers/job_list_container';
import JobDetail from '../containers/job_detail_container';
import SearchBar from '../containers/search_bar_container';
import Footer from './footer_component';
import RetaurantList from '../containers/restaurant_list_container';
import TransportationList from '../containers/transportation_list_container';
import AmenitiesList from '../containers/ameneties_list_container';
// import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';


const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

function handleActive(tab) {
  alert(`A tab with this route property ${tab.props['data-route']} was activated.`);
}


class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
    this.initJob = this.initJob.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidUpdate(nextProps) {
    if (this.props.jobs.length > 0) {
     this.initJob(this.props.jobs[0]);
    }
  }

  initJob(job) {
    let props = this.props;

    props.loading(false);
    props.selectJob(job);
    props.fetchYelp(job.city, job.latitude, job.longitude);
    props.fetchTrains(job.latitude, job.longitude);
    props.fetchBus(job.latitude, job.longitude);
    props.fetchParks(job.latitude, job.longitude);
    props.fetchGyms(job.latitude, job.longitude);
    props.scrapDetail(job.url);
  }

  handleToggle() {
    this.setState({open: !this.state.open});
  }

  render() {
    const tabStyle = {
      fontFamily: 'Oswald, Raleway, sans-serif',
      background: 'url("http://subtlepatterns2015.subtlepatterns.netdna-cdn.com/patterns/footer_lodyas.png")'
    };
    const tabButtonStyle = { height: 50 };

    return (
      <div>
        <div className="col-xs-12" style={{padding: 0}}>
          <Banner />
        </div>

        {/*mobile view*/}
        <div>
          <Drawer open={this.state.open} onRequestChange={() => this.handleToggle} width="90%">
            <div id="jobResultsPane" className="col-xs-12 visible-xs visible-sm" style={{padding: 0}} >
              <JobList listHeight={'unset'} handleToggle={this.handleToggle}  />
            </div>
          </Drawer>
        </div>

        <div className="col-xs-12 visible-xs visible-sm" style={{height: 500, width: '100%', padding: 0}}>
          <GMap />
        </div>
        <div className="col-xs-12 visible-xs visible-sm">
          <JobDetail />
        </div>
        <div className="col-xs-12 visible-xs visible-sm">
          <IconButton style={{cursor: 'pointer', float: 'right'}} onClick={this.handleToggle} children={<i className="material-icons">view_list</i>} />
        </div>
        {/*mobile view*/}



        {/* Desktop view */}
        <div id="jobResultsPane" className="col-md-3 visible-md visible-lg" style={{height: 500, padding: 0}} >
          <JobList listHeight={480} />
        </div>
        <div className="col-md-8 visible-md visible-lg" style={{height: 500, width: '75%', padding: 0}}>
          <GMap />
        </div>
        <div className="col-md-12 visible-md visible-lg">
          <JobDetail />
        </div>
        {/* Desktop view */}





        <div className="col-xs-12 "  style={{padding: 0, backgroundColor: '#EEEEEE'}}>
          <Tabs inkBarStyle={{background: '#52B3D9'}}>
            <Tab label="Transportation" style={tabStyle} buttonStyle={{height: 50, backgroundColor: 'none'}}>
              <TransportationList />
            </Tab>
            <Tab label="Amenities" style={tabStyle} buttonStyle={{height: 50, backgroundColor: 'none'}}>
              <AmenitiesList />
            </Tab>
            <Tab label="Restaurants" style={tabStyle} buttonStyle={{height: 50, backgroundColor: 'none'}}>
              <RetaurantList />
            </Tab>
          </Tabs>
        </div>

      </div>);
  }
};


let mapStateToProps = (state) => ({
  jobs: state.jobs
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

export default connect(mapStateToProps, mapDispatchToProps)(Results);
