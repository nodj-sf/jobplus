import React, {Component} from 'react';

import Banner from './banner_component';
import DataDiagram from './diagram_component';
import Footer from './footer_component';
import GMap from './google_map';
import JobList from '../containers/job_list';
import JobDetail from '../containers/job_detail';
import SearchBar from '../containers/search_bar';

class App extends Component {
  render() {
    return (
      <div>
        <Banner />        
        <div id="appContainer" className="appContainer">
          <SearchBar className="twelve columns" />   
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

export default App; 
