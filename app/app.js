import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import SearchBar from './components/search_bar';
import JobList from './components/job_list';
// Need to import api function or figure out how to make own....
const API_Key = 'dsflkjhaerthag';

class App extends Component {
  constructor(props) {
    super(props);
    // Dummy data put in for now
    this.state = { jobs: [{title: 'Front-End', id: '1'}, {title: 'Back-End', id: '2'}, {title: 'Full-Stack', id: '3'}] };

    // Uncomment when api figured out. first call for data
    // this.jobSearch('programmer');
  }

  jobSearch(term) { 
    console.log(term);
    // Need to use API Here....
    // GLASSDOORSearch({key: API_KEY, term: term}, (jobs) => {
    //   this.setState({
    //     jobs: jobs
    //   });
    // });
  }

  render() {
    return (
      <div>
        <SearchBar onSearchTermChange={term => this.jobSearch(term)} />
        <JobList jobs={this.state.jobs} />

      </div>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('app'));
