import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './createStore.js';
import SearchBar from './components/search_bar';
import JobList from './containers/job_list';
import JobDetail from './containers/job_detail';

class App extends Component {
  jobSearch(term) { 
    console.log(term);
  }

  render() {
    return (
      <div>
        <SearchBar onSearchTermChange={term => this.jobSearch(term)} />
        <JobList />
        <JobDetail />
      </div>
    );
  }
};

ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>, document.getElementById('app'));

export default App;
