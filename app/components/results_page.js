import React, {Component} from 'react';
import { connect } from 'react-redux';
import { selectJob, fetchYelp, fetchGPlaces } from '../actions/index';
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


export default class Results extends Component {
  constructor(props) {
    super(props);

    this.initJob = this.initJob.bind(this);
  }

  componentDidUpdate(nextProps) {
    console.log('logging in componentWillReceiveProps');
    console.log('jobs:', this.props.jobs);
    if (this.props.jobs.length > 0) {
     this.initJob(this.props.jobs[0]);
    }
  }

  initJob(job) {
    this.props.selectJob(job);
    this.props.fetchYelp(job.city, job.latitude, job.longitude);
    this.props.fetchGPlaces(job.latitude, job.longitude);
  }

  render() {
    return (
      <div>
        <Banner />        
        <div id="appContainer" className="appContainer">

          <div id="jobMain">
            <div id="jobResultsPane">
              <div>
                <GMap />
                <b>Select A Job!</b>
              </div>
              <JobList />
            </div>
            
            <div id="jobInfoBody">           
              <JobDetail /> 
              <div className="jobInfoBottomBlock">            
                <RetaurantList />
                <PlacesList />
              </div>
            </div>
          </div>
        </div>        
      </div>
    );
  }
};


let mapStateToProps = (state) => ({ jobs: state.jobs });

// Anything returned from this function will end up as props on Joblist container
// We now have an action thats going to change the state of our DOM. We need to 
// notify all containers of the action that can be triggered
let mapDispatchToProps = (dispatch) =>  {
  // Whenever loadJobs is called, the result should be passed to all reducers:
  return bindActionCreators({ selectJob: selectJob , fetchYelp: fetchYelp, fetchGPlaces: fetchGPlaces}, dispatch);
};

// Promote JobList to a container:
export default connect(mapStateToProps, mapDispatchToProps)(Results);
