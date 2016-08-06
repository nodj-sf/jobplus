import React, {Component} from 'react';

import Banner from './banner_component';
import DataDiagram from './diagram_component';
import Footer from './footer_component';
import GMap from './google_map_component';
import JobList from '../containers/job_list_container';
import JobDetail from '../containers/job_detail_container';


export default class Results extends Component {
  render() {
    return (
      <div>
        <Banner />        
        <div id="appContainer" className="appContainer">

          <JobDetail />             
          <div id="jobMain">
            <div id="jobResultsPane">
              <GMap />
              <JobList />
            </div>

            <div id="jobInfoBody">           

            </div>
          </div>
        </div>        
      </div>
    );
  }
};
