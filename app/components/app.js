import React, {Component} from 'react';
import Banner from './banner_component';
import SearchBar from '../containers/search_bar';
import JobDetail from '../containers/job_detail';
import JobList from '../containers/job_list';
import DataDiagram from './diagram_component';
import GMap from './google_map';
import Footer from './footer_component';


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
