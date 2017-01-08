import React, { Component, PropTypes } from 'react';
import { Router, Route, hashHistory, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { fetchJobs, userSearchInputs, jobInputTerm, locationInputTerm } from '../actions/index';


class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.onJobTitleInputChange = this.onJobTitleInputChange.bind(this);
    this.onLocationInputChange = this.onLocationInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onJobTitleInputChange(evt) {
    evt.preventDefault();
    this.props.jobInputTerm(evt.target.value).payload;
  }

  onLocationInputChange(evt) {
    evt.preventDefault();
    this.props.locationInputTerm(evt.target.value).payload;
  }

  onFormSubmit(evt) {
    evt.preventDefault();
    this.props.fetchJobs(this.props.jobTerm, this.props.locationTerm);
    this.props.push('/results');
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
                placeholder="Job"
                defaultValue={this.props.jobTerm}
                onChange={this.onJobTitleInputChange} />
              
              <input 
                id="searchLocation"
                className="formSearchInpt"
                type="search"
                results="4"
                placeholder="City"
                defaultValue={this.props.locationTerm}
                onChange={this.onLocationInputChange} />
            </div>
          </div>

          <button id="jobSearchSubmitBtn" type="submit">Search</button>
        </div>
      </form>
    );
  }
};


let mapStateToProps = (state) => ({ 
  jobTerm: state.jobInputTerm, 
  locationTerm: state.locationInputTerm 
});

let mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchJobs,
  jobInputTerm,
  locationInputTerm,
  userSearchInputs,
  push 
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
