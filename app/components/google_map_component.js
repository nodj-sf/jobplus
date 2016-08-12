import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow, SearchBox } from 'react-google-maps';
import { default as InfoBox } from 'react-google-maps/lib/addons/InfoBox';
import Modal from 'react-modal';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BaseComponent from './base_component';
import GMap_Modal from './google_maps_modal_component';
import mapStylesObject from '../constants/google_map_styles.json';
import { fetchJobs, selectJob, toggleModal, toggleModalOff } from '../actions/index';


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
      // console.log(`Location found: ${pos.lat} ${pos.lng}`);
      // console.log(`Google Maps LatLng: ${new google.maps.LatLng(pos.lat, pos.lng)}`);
      return new google.maps.LatLng(pos.lat, pos.lng);
    });
    // console.log(`Your browser doesn't support geolocation.`);
    return new google.maps.LatLng(37.745951, -122.439421);
  }
})();


class GMap extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      defaultCenter: new google.maps.LatLng(37.745951, -122.439421),
      geoPos: null,
      zoomLevel: 10
    };

    this.modalNo = this.modalNo.bind(this);
    this.addTimeDelayedMarker = this.addTimeDelayedMarker.bind(this);
    this.markerCallbackHandler = this.markerCallbackHandler.bind(this);
  }

  centerMap() {
    // console.log(`First map marker coordinates: ${this.props.markers[0].coords}`);
    return this.props.markers.length ? this.props.markers[0].coords : this.state.defaultCenter;
  }

  centerZoomOverUSA() {
    this.setState({ zoomLevel: 5 });
  }

  // Toggle to 'true' to show InfoWindow and re-renders component
  handleMarkerClick(targetMarker) {
    this.closeAllMarkers();
    this.setState({ 
      markers: this.props.markers.map(marker => {
        return marker === targetMarker ? Object.assign(marker, {showInfo: true}) : marker;
      }) 
    });
  }

  handleMarkerClose(targetMarker) {
    this.setState({
      markers: this.props.markers.map(marker => {
        return marker === targetMarker ? { marker, showInfo: false } : marker;
      })
    });
  }

  closeAllMarkers() {
    this.setState({
      markers: this.props.markers.map(marker => Object.assign( marker, {showInfo: false}))
    });
  }

  renderInfoWindow(ref, marker) {
    const onCloseclick = this.handleMarkerClose.bind(this, marker);
    console.log(`Marker Keys: ${Object.getOwnPropertyNames(marker)}`);
    console.log(`Job Name: ${marker.jobTitle}`);

    return (
      <InfoWindow
        key={`${ref}_info_window`}
        onCloseclick={onCloseclick} >

          <div>
            <h4 className="infoWindow_Header">{this.parseAndFormatJobTitle(marker.jobTitle)}</h4>
            <h5 className="infoWindow_Header">{marker.company}</h5>
            <hr />
            <p>{marker.formattedLocation}</p>
          </div>
         
      </InfoWindow>
    );
  }

  // Class methods for control of the Google Maps Modal visibility:
  modalYes() {
    // console.log(`Function \`modalYes\` called!`);
    return this.props.toggleModal()
  }

  modalNo() {
    // console.log(`Function \`modalNo\` called!`);
    return this.props.toggleModalOff();
  }

  addTimeDelayedMarker(marker, index) {
    const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
          MAX_ZINDEX = 1000;

       return window.setTimeout(() => {
        // console.log(`Marker Coordinates: ${marker.coords["lat"]}, ${marker.coords["lng"]} | ${typeof marker.coords["lat"]}`);
       
        return (
          <Marker
            key={index}
            ref={`marker_${index}`}
            data-jobTitle={marker.jobTitle}
            data-formattedLocation={marker.formattedLocation}
            position={ new google.maps.LatLng(marker.coords) }
            // position={ marker.coords }
            animation={google.maps.Animation.DROP}
            title={marker.company}
            opacity={0.90}
            zIndex={MAX_ZINDEX}
            label={{ "text": `${ALPHABET[index++]}`, "fontFamily": "Raleway", "fontWeight": "bold" }} />
        );
      }, index * 1000);
     
  }

  markerCallbackHandler() {
    return this.props.markers.map((marker, index) => this.addTimeDelayedMarker(marker, index) );
  }

  render() {
    return (
      <GoogleMapLoader
        containerElement={ 
          <div 
            id="mapsContainer" 
            onDoubleClick={() => this.modalYes()} /> 
        }   
        googleMapElement={
          <GoogleMap 
            // defaultCenter={this.state.defaultCenter}
            center={this.centerMap()}
            defaultCenter={this.state.defaultCenter}
            defaultZoom={this.state.zoomLevel} 
            maxZoom={19}
            defaultOptions={{ styles: mapStylesObject }}
            scrollwheel={false}
            ref="map" >

            { this.markerCallbackHandler() }

            <GMap_Modal center={this.centerMap()} modalEnable={this.modalYes} modalDisable={this.modalNo} />
          </GoogleMap>
        } 
      />
    );
  }
}


let mapStateToProps = (state) => ({
  markers: state.jobs.map(job => ({ 
    coords: { "lat": job.latitude, "lng": job.longitude },
    jobTitle: job.jobtitle,
    company: job.company, 
    formattedLocation: job.formattedLocation,
    showInfo: false
  })),
  toggleModal: state.toggleModal
});

let mapDispatchToProps = (dispatch) => bindActionCreators({ 
  toggleModal,
  toggleModalOff
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GMap);


// {
//   // Show InfoWindow only if `showInfo` key of the marker is `true`. That is, when the 
//   // Marker pin has been clicked and 'handleMarkerClick' has been successfully fired.
//   marker.showInfo ? this.renderInfoWindow(index, marker) : null 
// }


// function pinDropper() {
//                 let markers = [];


// const pinDropDelay = 1000,
//                     delayPinDrop = (fn) => setTImeOut(fn, pinDropDelay); 
// delayPinDrop(() => newMarker, pinDropDelay);

// const dropPins = () => setTimeout(function() { return newMarker; }, 1000);
// dropPins();
