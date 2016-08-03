import React, {Component} from 'react';

import Banner from "./banner_component";
import SearchBar from './search_bar';
import JobList from '../containers/job_list';
import JobDetail from '../containers/job_detail';
import Footer from "./footer_component";


class App extends Component {
  render() {
    return (
      <div>
        <Banner />
        <SearchBar className="twelve columns" onSearchTermChange={term => this.jobSearch(term)} />
        <JobList />
        <JobDetail />
        <Footer />
      </div>
    );
  }
};

export default App; 
