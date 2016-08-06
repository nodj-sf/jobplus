import React, { Component, PropTypes } from 'react';
import { Router, Route, hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import { fetchJobs } from '../actions/index';


class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '', location: "San Francisco" };
    this.onInputChange = this.onInputChange.bind(this);
    this.onLocationInputChange = this.onLocationInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.searchJob = this.searchJob.bind(this);
  }

  onInputChange(event) {
    this.setState({term: event.target.value});
  }

  onLocationInputChange(evt) {
    this.setState({ location: '' });
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
            
            <div id="searchInputsBoundary">
              <label>
              <input 
                id="search"  
                className="formSearchInpt"
                type="search" 
                results="4" 
                autoSave="Developer Jobs" 
                placeholder="Search..."
                value={this.state.term}
                onChange={this.onInputChange}
                required />
              <span className="icon"><i className="fa fa-search"></i></span>
              </label>
              <input
                id="searchLocation"
                className="formSearchInpt"
                type="search"
                results="4"
                autoSave="San Francisco"
                placeholder="City" />
            </div>
          </div>
          <button id="jobSearchSubmitBtn" type="submit">Submit</button>
        </div>
      </form>
    );
  }
};


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchJobs }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);


// value={this.state.location}
// onChange={this.onLocationInputChange}
