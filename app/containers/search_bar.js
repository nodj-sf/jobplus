import React, { Component, PropTypes } from 'react';
import { Router, Route, hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import { fetchJobs } from '../actions/index';


class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.searchJob = this.searchJob.bind(this);
  }

  onInputChange(event) {
    this.setState({term: event.target.value});
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.searchJob(this.state.term);
    this.setState({ term: '' });
  }
  
  searchJob(term) {
    axios.post('/api/v1/jobs', {
      jobTitle: term,
      city: 'San Francisco'                         // Hardcoded
    }).then(function(response) {
      this.props.fetchJobs(response.data.results);
      hashHistory.push('results');
    }.bind(this)).catch(error => console.log(error));
  }

  render() {
    return (
      <form id="searchForm" onSubmit={this.onFormSubmit}>
        <div className="box">
          <div className="container-3">
              <input 
                id="search" 
                type="search" 
                results="4" 
                autoSave="Developer Jobs" 
                placeholder="Search..."
                value={this.state.term}
                onChange={this.onInputChange} />
                
              <span className="icon"><i className="fa fa-search"></i></span>
          </div>
        </div>
      </form>
    );
  }
};


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchJobs }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);
