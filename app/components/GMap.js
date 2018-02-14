import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow, SearchBox, DirectionsRenderer } from 'react-google-maps';
import { default as InfoBox } from 'react-google-maps/lib/addons/InfoBox';
import Modal from 'react-modal';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Utils from './utils';
import mapStylesObject from '../constants/google_map_styles.json';
import { fetchJobs, selectJob, activeBus, selectItem } from '../actions/index';


// Code for potential inclusion at later date:
const geolocation = (() => {
  // canUseDOM && navigator.geolocation || {
  //   getCurrentPosition: (success, failure) => {
  //     failure(`Your browser doesn't support geolocation.`);
  //   },
  // }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      return new google.maps.LatLng(pos.lat, pos.lng);
    });
    return new google.maps.LatLng(37.745951, -122.439421);
  }
})();


class GMap extends Utils {
  constructor(props) {
    super(props);
    this.state = {
      defaultCenter: new google.maps.LatLng(37.745951, -122.439421),
      geoPos: null,
      zoomLevel: 13,
      jobMarkers: [],
      restaurantMarkers: [],
      trainMarkers: [],
      busMarkers: [],
      gymMarkers: [],
      parkMarkers: []
    };

    this.centerMap = this.centerMap.bind(this);
    // this.addTimeDelayedMarker = this.addTimeDelayedMarker.bind(this);
    this.jobMarkerCallbackHandler = this.jobMarkerCallbackHandler.bind(this);
    this.busMarkerCallbackHandler = this.busMarkerCallbackHandler.bind(this);
    this.trainMarkerCallbackHandler = this.trainMarkerCallbackHandler.bind(this);
    this.parkMarkerCallbackHandler = this.parkMarkerCallbackHandler.bind(this);
    this.gymMarkerCallbackHandler = this.gymMarkerCallbackHandler.bind(this);

    this.createMarkers = this.createMarkers.bind(this);
  }

  componentWillReceiveProps(nextProps, nextState) {
    const selectedItem = nextProps.selectedItem;
    if (nextProps.jobs.length > 0) {
      this.createMarkers(nextProps.jobs, 'job', selectedItem);
    }
    if (nextProps.restaurants.length > 0) {
      this.createMarkers(nextProps.restaurants, 'restaurant', selectedItem);
    }
    if (nextProps.trains.length > 0) {
      this.createMarkers(nextProps.trains, 'train', selectedItem);
    }
    if (nextProps.bus.length > 0) {
      this.createMarkers(nextProps.bus, 'bus', selectedItem);
    }
    if (nextProps.gyms.length > 0) {
      this.createMarkers(nextProps.gyms, 'gym', selectedItem);
    }
    if (nextProps.parks.length > 0) {
      this.createMarkers(nextProps.parks, 'park', selectedItem);
    }
  }

  render() {
    return (
      <GoogleMapLoader
        containerElement={<div id="mapsContainer" />}
        googleMapElement={
          <GoogleMap
            center={this.centerMap()}
            defaultCenter={this.state.defaultCenter}
            defaultZoom={this.state.zoomLevel}
            maxZoom={19}
            defaultOptions={{ styles: mapStylesObject }}
            scrollwheel={false}
            ref="map" >
            { this.state.jobMarkers.length > 0 ? this.jobMarkerCallbackHandler() : null }
            { this.state.restaurantMarkers.length > 0 ? this.restaurantMarkerCallbackHandler() : null }
            { this.state.trainMarkers.length > 0 ? this.busMarkerCallbackHandler() : null }
            { this.state.busMarkers.length > 0 ? this.trainMarkerCallbackHandler() : null }
            { this.state.gymMarkers.length > 0 ? this.parkMarkerCallbackHandler() : null }
            { this.state.parkMarkers.length > 0 ? this.gymMarkerCallbackHandler() : null }
          </GoogleMap>
        }
      />
    );
  }
}

let mapStateToProps = (state) => {
  const { jobs, restaurants, trains, bus, gyms, parks, selectedItem, initialLatitude, initialLongitude } = state.globalReducer;
  return {
    jobs,
    restaurants,
    trains,
    bus,
    gyms,
    parks,
    selectedItem,
    initialLatitude,
    initialLongitude
  };
};

export default connect(mapStateToProps, {
  selectJob,
  activeBus,
  selectItem
})(GMap);


// Not sure if we need this line(originally on line 194): coords: new google.maps.LatLng(job.latitude, job.longitude)
// We need to get the photo from yelp and add it to the state collection
