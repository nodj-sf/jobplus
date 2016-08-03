import React, {Component} from 'react';

import SearchBar from './search_bar';
import JobList from '../containers/job_list';
import JobDetail from '../containers/job_detail';

class App extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <JobList />
        <JobDetail />
      </div>
    );
  }
};

export default App; 
