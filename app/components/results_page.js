import React, {Component} from 'react';
import { connect } from 'react-redux';
import { selectJob, fetchYelp, /*fetchGPlaces*/ fetchTrains, fetchBus, fetchGyms, fetchParks } from '../actions/index';
import { bindActionCreators } from 'redux';

import Banner from './banner_component';
import DataDiagram from './diagram_component';
import GMap from './google_map_component';
import JobList from '../containers/job_list_container';
import JobDetail from '../containers/job_detail_container';
import SearchBar from '../containers/search_bar_container';
import Footer from './footer_component';
import RetaurantList from '../containers/restaurant_list_container';
import PlacesList from '../containers/places_list_container';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';


export default class Results extends Component {
  constructor(props) {
    super(props);

    this.initJob = this.initJob.bind(this);
  }

  componentDidUpdate(nextProps) {
    if (this.props.jobs.length > 0) {
     this.initJob(this.props.jobs[0]);
    }
  }

  initJob(job) {
    this.props.selectJob(job);
    this.props.fetchYelp(job.city, job.latitude, job.longitude);
    this.props.fetchTrains(job.latitude, job.longitude);
    this.props.fetchBus(job.latitude, job.longitude);
    this.props.fetchParks(job.latitude, job.longitude);
    this.props.fetchGyms(job.latitude, job.longitude);

  }

  render() {
    return (
      <div>
        <Banner />        


          <div id="jobMain">
            <div id="jobResultsPane">
              <div>
                <GMap />

              </div>
              <JobList />
            </div>
            
            <div id="jobInfoBody">           
              <JobDetail /> 
              <Tabs onSelect={this.handleSelect} >  
                <TabList>
                  <Tab>Amenaties</Tab>
                  <Tab>Yelp</Tab>
                </TabList>
                <TabPanel>
                  <PlacesList />
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


let mapStateToProps = (state) => ({ jobs: state.jobs });

let mapDispatchToProps = (dispatch) =>  { 
  return bindActionCreators({ selectJob: selectJob , fetchYelp: fetchYelp, fetchBus, fetchTrains, fetchParks, fetchGyms}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);



// <div className="jobInfoBottomBlock">  
          
//   <RetaurantList />
//   <PlacesList />
// </div>
