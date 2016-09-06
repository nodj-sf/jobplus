import React, { Component, PropTypes } from 'react';
import { Router, Route, hashHistory, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Autocomplete from 'react-google-autocomplete';

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
 
  // Bias the autocomplete object to the user's geographical location,
  // as supplied by the browser's 'navigator.geolocation' object.
  geolocate() {
    let autocomplete = new Google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */
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
                onChange={ this.onJobTitleInputChange } />
              
              <Autocomplete
                id="searchLocation"
                className="formSearchInpt"
                type="search"
                results="4"
                placeholder="City"
                defaultValue={ this.props.locationTerm }
                autoCapitalize="words"
                onInput={ this.onLocationInputChange } />
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


// <input 
//   id="searchLocation"
//   className="formSearchInpt"
//   type="search"
//   results="4"
//   placeholder="City"
//   defaultValue={ this.props.locationTerm }
//   autoCapitalize="word"
//   // onChange={ this.onLocationInputChange } />
//   onFocus={ this.autoFillLocation() } />

// onPlaceSelected={(place) => {
//   console.log(`Selected Locale Input:\t${place.name}`);
//   this.onLocationInputChange();
// }}

// onPlaceSelected={ (place) => {
//   console.log(`Selected Locale Input:\t${place.name}`, Object.entries(place));
//   this.onLocationInputChange;
//   // formatted_address
// }}
