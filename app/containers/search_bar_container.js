import React, { Component, PropTypes } from 'react';
import { Router, Route, hashHistory, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import GooglePlacesAutocomplete from '../components/GooglePlacesAutocompleteAPI';

import {
  fetchJobs,
  userSearchInputs,
  jobInputTerm,
  lastJobSearch,
  locationInputTerm,
  lastLocationSearch
} from '../actions/index';


class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.onJobTitleInputChange = this.onJobTitleInputChange.bind(this);
    this.onLocationInputChange = this.onLocationInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);

    this.onChange = (address) => this.setState({ address });

    this.state = {
      address: ''
    };
  }

  onJobTitleInputChange(evt) {
    evt.preventDefault();
    this.props.jobInputTerm(evt.target.value).payload;
  }

  // Binds user-provided location names to the current `location` state value:
  onLocationInputChange(location) {
    // evt.preventDefault();
    this.onChange(location);
    console.log('LOCATION CHANGED:', location);

    this.props.locationInputTerm(location).payload;
    // this.props.locationInputTerm(evt.target.value || evt.srcElement.value).payload;
  }

  // Binds the output of a Google Places Autocompletion dialogue to the `locationTerm` state value:
  onLocationAutoComplete(evt) {
    if (!(evt.address_components)) { return; }
    let formattedSearchTerm = `${evt.address_components[0].long_name}` + (
      evt.address_components[1].types.includes('administrative_area_level_1')
        ? `, ${evt.address_components[1].short_name}`
        : evt.address_components[2].types.includes('administrative_area_level_1')
          ? `, ${evt.address_components[2].short_name}` : ''
    );
      // console.log(`Formatted Locale Autocompletion Search Term:\t${formattedSearchTerm}`);

    this.props.locationInputTerm(formattedSearchTerm).payload;
  }

  // Serves to retain a memory of only the user's last job search input term:
  commitLastJobToStore() {
    this.props.lastJobSearch(this.props.jobTerm).payload;
  }

  // Serves to retain a memory of only the user's last location search input term:
  commitLastLocationToStore() {
    this.props.lastLocationSearch(this.props.locationTerm).payload;
  }

  // Initiates the retrieval of relevant job postings (from the Indeed API) upon form submission:
  onFormSubmit(evt) {
    evt.preventDefault();
    this.props.fetchJobs(this.props.jobTerm, this.props.locationTerm);
    this.props.push('/results');
  }

  render() {
    return (
      <form id="searchForm" onSubmit={ this.onFormSubmit }>
        <div className="box">
          <div className="container-3">
            <div id="searchInputsBoundary">
              <input
                id="searchJob"
                className="formSearchInpt"
                type="text"
                results="4"
                placeholder="Job"
                autoComplete="on"
                autoCapitalize="words"
                onChange={ this.onJobTitleInputChange }
                required={ true } />
              <GooglePlacesAutocomplete
                id="searchLocation"
                className="formSearchInpt"
                options={{
                  results: 4,
                  placeholder: 'San Francisco',
                  autoComplete: 'on',
                  autoCapitalize: 'words',
                  callback: this.onLocationInputChange
                }}
                value={ this.state.address }
                onChange={ this.onLocationInputChange } />
            </div>
          </div>

          <button
            id="jobSearchSubmitBtn"
            type="submit">
            Search
          </button>
        </div>
      </form>
    );
  }
};


let mapStateToProps = (state) => ({
  jobTerm: state.jobInputTerm,
  lastJob: state.lastJob,
  locationTerm: state.locationInputTerm,
  lastLocation: state.lastLocation,
});

let mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchJobs,
  jobInputTerm,
  locationInputTerm,
  userSearchInputs,
  push
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);


// <Autocomplete
//   id='searchLocation'
//   className='formSearchInpt'
//   type='input'
//   results='4'
//   placeholder='City'
//   autoComplete='on'
//   autoCapitalize='words'
//   onChange={ this.onLocationInputChange }
//   onPlaceSelected={ this.onLocationAutoComplete || null }
//   required />
