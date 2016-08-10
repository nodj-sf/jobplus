import React, {Component} from 'react';

import Banner from './banner_component';
import DataDiagram from './diagram_component';
import GMap from './google_map_component';
import JobList from '../containers/job_list_container';
import JobDetail from '../containers/job_detail_container';
import SearchBar from '../containers/search_bar_container';
import Footer from './footer_component';


export default class Results extends Component {
  render() {
    return (
      <article>
        <Banner />  
        <SearchBar />       
        <div className="container">
          <div className="row">
            <div className="five columns">
              <GMap />
              <JobList />
            </div>
            <div className="seven columns">
              <JobDetail />
            </div>
          </div>
        </div> 
      </article>
    );
  }
};
