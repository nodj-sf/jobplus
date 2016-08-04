import React, {Component} from 'react';

import Banner from "./banner_component";
import SearchBar from './search_bar';
import JobList from '../containers/job_list';
import JobDetail from '../containers/job_detail';
import GoogleMap from "./google_map.js";
import Footer from "./footer_component";


class App extends Component {
  render() {
    return (
      <div>
        <Banner />

        <div id="appContainer" className="appContainer">
          <SearchBar className="twelve columns" />
          
          <JobList />
          <JobDetail />

          
        </div>        

        <br /> <br />
        <h1 style={{width: "90%", margin: "auto", textAlign: "center"}}>NODJ Map</h1>
        <GoogleMap />

        <Footer />
      </div>
    );
  }
};

export default App; 
