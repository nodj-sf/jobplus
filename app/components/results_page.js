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

let mapDispatchToProps = (dispatch) =>  { 
  return bindActionCreators({ selectJob: selectJob , fetchYelp: fetchYelp, fetchGPlaces: fetchGPlaces}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);
