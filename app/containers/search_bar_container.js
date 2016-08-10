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
    this.props.fetchJobs(this.state.jobTerm, this.state.locationTerm);
    hashHistory.push('results');
    this.setState({
      jobTerm: '',
      locationTerm: '' 
    });
  }

  render() {
    return (
      <form className="container" onSubmit={this.onFormSubmit}>
        <div className="row">
          <div className="five columns">
            <input 
              type="search" 
              autoSave="Developer Jobs" 
              className="u-full-width"
              placeholder="Search Job"
              value={this.state.jobTerm}
              onChange={this.onJobTitleInputChange} />
          </div>
          
          <div className="five columns">
            <input 
              className=""
              type="search"
              className="u-full-width"
              placeholder="City"
              autoSave="San Francisco"
              value={this.state.locationTerm}
              onChange={this.onLocationInputChange} />
          </div>

          <div className="two columns">
            <button className="button-primary" type="submit"><i className="fa fa-search" aria-hidden="true"></i> Search</button>
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
