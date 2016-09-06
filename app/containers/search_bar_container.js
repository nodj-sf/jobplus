import React, { Component, PropTypes } from 'react';
import { Router, Route, hashHistory, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Autocomplete from 'react-google-autocomplete';

import { fetchJobs, userSearchInputs, jobInputTerm, locationInputTerm, lastLocationSearch } from '../actions/index';


class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.onJobTitleInputChange = this.onJobTitleInputChange.bind(this);
    this.onLocationInputChange = this.onLocationInputChange.bind(this);
    this.commitLastLocationToStore = this.commitLastLocationToStore.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  // Binds user-provided job titles to the current `jobTerm` state value:
  onJobTitleInputChange(evt) {
    evt.preventDefault();
    this.props.jobInputTerm(evt.target.value).payload;
  }

  // Binds the output of a Google Places Autocompletion dialogue to the `locationTerm` state value:
  onLocationInputChange(evt) {
    // evt.preventDefault();
    let formattedSearchTerm = `${evt.address_components[0].long_name}` + 
      (evt.address_components[1].types.includes("administrative_area_level_1") ? `, ${evt.address_components[1].short_name}`
        : evt.address_components[2].types.includes("administrative_area_level_1") ? `, ${evt.address_components[2].short_name}` 
        : "");
      console.log(`Autocompletion Locale Formatted Search Term:\t${formattedSearchTerm}`);

    this.props.locationInputTerm(formattedSearchTerm).payload;
  }

  commitLastLocationToStore() {
    // evt.preventDefault();
    this.props.lastLocationSearch(this.props.locationTerm).payload;
  }

  // Initiates the retrieval of relevant job postings (from the Indeed API) upon form submission:
  onFormSubmit(evt) {
    evt.preventDefault();
    this.props.fetchJobs(this.props.jobTerm, this.props.locationTerm);
    this.commitLastLocationToStore();
    this.props.push('/results');
  }
 
  // Bias the autocomplete object to the user's geographical location,
  // as supplied by the browser's 'navigator.geolocation' object.
  /* 
    geolocate() {
      let autocomplete = new Google.maps.places.Autocomplete(
        // @type {!HTMLInputElement} //
        (document.getElementById('searchLocation')),
        {types: ['geocode']}
        // {types: ['(cities)']}
      );

      // When the user selects an address from the dropdown, populate the address fields in the form.
      autocomplete.addListener('place_changed', fillInAddress);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          var circle = new google.maps.Circle({
            center: geolocation,
            radius: position.coords.accuracy
          });
          autocomplete.setBounds(circle.getBounds());
        });
      }
    } 
  */

  render() {
    return (
      <form id="searchForm" onSubmit={ this.onFormSubmit }>
        <div className="box">
          <div className="container-3">

            <div id="searchInputsBoundary">
              <input 
                id="searchJob" 
                className="formSearchInpt"
                type="search" 
                results="4" 
                placeholder="Job"
                defaultValue={ this.props.jobTerm }
                autoComplete="on"
                onChange={ this.onJobTitleInputChange } />
              
              <Autocomplete
                id="searchLocation"
                className="formSearchInpt"
                type="search"
                results="4"
                placeholder="City"
                defaultValue={ this.props.locationTerm }
                autoCapitalize="words"
                onPlaceSelected={ this.onLocationInputChange } />
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
  locationTerm: state.locationInputTerm,
  lastLocation: state.lastLocation,
});

let mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchJobs,
  jobInputTerm,
  locationInputTerm,
  lastLocationSearch,
  userSearchInputs,
  push 
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
