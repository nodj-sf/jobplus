import React, { Component, PropTypes } from 'react';
import { Router, Route, hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchJobs } from '../actions/index';


class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jobTerm: '',
      locationTerm: ''
     };

    this.onJobTitleInputChange = this.onJobTitleInputChange.bind(this);
    this.onLocationInputChange = this.onLocationInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onJobTitleInputChange(event) {
    this.setState({jobTerm: event.target.value});
  }

  onLocationInputChange(event) {
    this.setState({locationTerm: event.target.value});
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.searchJob(this.state.jobTerm, this.state.locationTerm);
    this.setState({ jobTerm: '' });
    this.setState({ locationTerm: '' });
  }
  
  searchJob(jobTerm, locationTerm) {
    console.log('logging in searchJob');
    axios.post('/api/v1/jobs', {
      jobTitle: jobTerm,
      city: locationTerm                            // Hardcoded
    }).then(function(response) {
      this.props.fetchJobs(response.data.results);
      hashHistory.push('results');
    }.bind(this)).catch(function(error) {
      console.log(error);
    });
    console.log("hashHistory:", hashHistory);
  }

  render() {
    return (
      <form id="searchForm" onSubmit={this.onFormSubmit}>
        <div className="box">
          <div className="container-3">

            <div id="searchInputsBoundary">
              <input 
                id="search" 
                className="formSearchInpt"
                type="search" 
                results="4" 
                autoSave="Developer Jobs" 
                placeholder="Job"
                value={this.state.jobTerm}
                onChange={this.onJobTitleInputChange} />
              
              <input 
                id="searchLocation"
                className="formSearchInpt"
                type="search"
                results="4"
                placeholder="City"
                autoSave="San Francisco"
                value={this.state.locationTerm}
                onChange={this.onLocationInputChange} />
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
