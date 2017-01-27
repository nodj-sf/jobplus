'use strict';
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


class SearchBarPrimary extends Component {
  constructor(props) {
    super(props);
    this.onJobTitleInputChange = this.onJobTitleInputChange.bind(this);
    this.onLocationInputChange = this.onLocationInputChange.bind(this);
    this.onLocationAutoComplete = this.onLocationAutoComplete.bind(this);
    this.commitLastJobToStore = this.commitLastJobToStore.bind(this);
    this.commitLastLocationToStore = this.commitLastLocationToStore.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);

    this._handleFocusChange = this._handleFocusChange.bind(this);

    this.onChange = (address) => this.setState({ address });

    this.state = {
      address: ''
    };
  }

  // Binds user-provided job titles to the current `jobTerm` state value:
  onJobTitleInputChange(evt = evt || window.event) {
    evt.preventDefault();
    this.props.jobInputTerm(evt.target.value || evt.srcElement.value).payload;
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
    this.commitLastLocationToStore();
    this.commitLastJobToStore();
    this.props.push('/results');
  }

  _handleFocusChange(evt) {
    const parentContainer = evt.target.parentElement;
    parentContainer.classList.toggle('active');
  }

  render() {
    return (
      <form
        id="search-form-primary"
        onSubmit={ this.onFormSubmit }>
        <div className="box">
          <div className="container-3">
            <div id="search-inpts-boundary">
              <div className="search-form-inpt">
                <input
                  id="searchJob"
                  className="search-form-inpt"
                  type="text"
                  results="4"
                  placeholder="Job"
                  autoComplete="on"
                  autoCapitalize="words"
                  autoFocus={ true }
                  onFocus={ this._handleFocusChange }
                  onBlur={ this._handleFocusChange }
                  onChange={ this.onJobTitleInputChange }
                  required={ true } />
              </div>
              <GooglePlacesAutocomplete
                id="searchLocation"
                assignedClasses="search-form-inpt"
                options={{
                  results: 4,
                  placeholder: 'San Francisco',
                  autoComplete: 'on',
                  autoCapitalize: 'words',
                  callback: this.onLocationInputChange
                }}
                value={ this.state.address }
                onChange={ this.onLocationInputChange } />
              <button
                className="search-form-inpt fa fa-search"
                type="submit"
                name="SearchBtn" />
            </div>
          </div>
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
  lastJobSearch,
  locationInputTerm,
  lastLocationSearch,
  userSearchInputs,
  push
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchBarPrimary);
