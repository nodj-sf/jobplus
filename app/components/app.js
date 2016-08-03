import React, {Component} from 'react';
import SearchBar from './search_bar';
import JobList from '../containers/job_list';
import JobDetail from '../containers/job_detail';
import NodjMap from './google_map'

class App extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <JobList />
        <JobDetail />
        <NodjMap />
      </div>
    );
  }
};

export default App; 
