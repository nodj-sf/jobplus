import React, {Component} from 'react';
import Banner from "./banner_component";
import SearchBar from './search_bar';
import JobDetail from '../containers/job_detail';
import Footer from "./footer_component";
import JobList from '../containers/job_list';
import NodjMap from './google_map';

class App extends Component {
  render() {
    return (
      <div>
        <Banner />
        <SearchBar className="twelve columns" />
        
        <JobList />
        <JobDetail />

        

        <Footer />
        <NodjMap />
      </div>
    );
  }
};

export default App; 
