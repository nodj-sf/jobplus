import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow, SearchBox } from 'react-google-maps';
import { default as InfoBox } from 'react-google-maps/lib/addons/InfoBox';
import Modal from 'react-modal';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BaseComponent from './base_component';
import GMap_Modal from './google_maps_modal_component';
import mapStylesObject from '../constants/google_map_styles.json';
import { fetchJobs, selectJob, activeBus, toggleModal, toggleModalOff } from '../actions/index';


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


class GMap extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      defaultCenter: new google.maps.LatLng(37.745951, -122.439421),
      geoPos: null,
      zoomLevel: 12
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

  // Toggle to 'true' to show InfoWindow and re-render component
  handleMarkerClick(targetMarker) {
    this.closeAllMarkers();
    this.setState({ 
      markers: this.props.markers.map(marker => {
        return marker === targetMarker ? Object.assign(marker, {showInfo: true}) : marker;
      }) 
    });
    this.centerMap();
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

  renderInfoWindow(marker, ref, company) {
    const onCloseclick = this.handleMarkerClose.bind(this, marker);
    const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      // console.log(`Marker Keys: ${Object.getOwnPropertyNames(marker)}`);
      // console.log(`Job Name: ${marker.jobTitle}`);

    return (
      <InfoWindow
        key={`${marker.jobKey}_info_window`}
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

  renderAmenityInfoWindow(marker, ref) {
    const onCloseclick = this.handleMarkerClose.bind(this, marker);

    return (
      <InfoWindow
        key={`${marker.markerKey}_info_window`}
        onCloseclick={onCloseclick} >
          <div>
            <h4 className="infoWindow_Header">{this.parseAndFormatJobTitle(marker.markerTitle)}</h4>
            <hr />
          </div>
         
      </InfoWindow>
    );
  }

  // Class methods for control of the Google Maps Modal visibility:
  modalYes() {
    return this.props.toggleModal()
  }

  modalNo() {
    return this.props.toggleModalOff();
  }

  addTimeDelayedMarker(marker, index) {
    const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
          MAX_ZINDEX = 1000,
          MAP_PIN1 = 'M 168.13014858503527 114.76652327113317 C 189.29733269688495 66.37538239750444 169.10629117101143 -0.743769309370748 88.35629117101149 0.006230690629195124 C 7.606291171011549 0.7562306906291383 -13.333356542955187 65.32715433879548 7.575247535632002 114.10675303790794 C 24.570783547217786 153.75719661632445 32.21524550334891 164.64004753237344 47.9861005922736 196.98393269349776 Q 63.75695568119835 229.32781785462203 88.39695364891526 279.86111234908753 L 128.26355111697524 197.31381781011032 Q 152.60629117101155 150.2562306906292 168.13014858503527 114.76652327113317 Z',
          PIN_FILL_COLOR = marker.jobKey === this.props.activeJob.jobkey ? '#14A4B5' : '#7A7A7A',
          PIN_Z_INDEX = marker.jobKey === this.props.activeJob.jobkey ? MAX_ZINDEX + 10 : MAX_ZINDEX,
          onClick = () => this.handleMarkerClick(marker);

    return (
      <Marker
        key={`Marker_${marker.jobKey}`}
        ref={`marker_${index}`}
        data-jobTitle={marker.jobTitle}
        data-formattedLocation={marker.formattedLocation}
        position={ new google.maps.LatLng(marker.coords) }
        title={marker.company}
        icon={{
          path: MAP_PIN1,
          scale: 1/8,
          offset: '-75%',
          fillColor: PIN_FILL_COLOR,
          fillOpacity: 1,
          strokeColor: '#000',
          strokeWeight: 0.50
        }}
        opacity={0.90}
        zIndex={PIN_Z_INDEX}
        showInfo={false}
        onClick={onClick} >

        { marker.showInfo ? this.renderInfoWindow(marker, index) : null }
      </Marker>
    );
  }

  addMarker(marker, index) {
    const MAX_ZINDEX = 800,
          MAP_PIN = 'm 407.89288,264.21951 c -5.37639,-14.73114 5.5253,-38.94878 -6.80684,-50.63187 l -97.80958,-92.6617 -5.6044,5.60439 80.7416,91.95041 -11.309,11.10857 -91.85018,-80.64139 -5.6044,5.6044 80.7897,91.99848 -10.85201,11.56557 -92.35527,-81.14647 -5.6044,5.60439 90.6414,101.85019 c 10.94643,12.30007 35.26576,-4.39892 49.2033,4.36813 20.28775,12.76148 147.29347,169.78332 170.1524,146.47922 C 574.48412,411.96774 418.9608,284.09174 407.89288,264.21951 Z m -24.98672,17.32934 c 0,0 -150.92241,134.90217 -132.83507,151.0178 C 265.1961,449.5518 381.896,333.06662 381.896,333.06662 l 32.32488,30.30459 c 0,0 165.19346,-141.28371 126.77415,-238.90108 -72.57602,68.99235 -158.08887,157.07872 -158.08887,157.07872 z',
          PIN_SCALE = (1 / 14),
          PIN_FILL_COLOR = '#AF0606',
          onClick = () => this.handleMarkerClick(marker);

    return (
      <Marker
        key={`Marker_${marker.markerKey}`}
        ref={`marker_${index}`}
        position={ new google.maps.LatLng(marker.coords) }
        icon={{
          path: MAP_PIN,
          scale: PIN_SCALE,
          fillColor: PIN_FILL_COLOR,
          fillOpacity: 1,
          strokeColor: '#FFF',
          strokeWeight: 0.50
        }}
        onClick={onClick}
        zIndex={MAX_ZINDEX} >

        { marker.showInfo ? this.renderAmenityInfoWindow(marker, index) : null }

      </Marker>
    );
  }

  markerCallbackHandler() {
    return this.props.markers.map((marker, index) => {
      return this.addTimeDelayedMarker(marker, index);
    });
  }

  restaurantMarkerCallbackHandler() {
    return this.props.restaurantMarkers.map((marker, index) => {
      return this.addMarker(marker, index);
    });
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
            center={this.centerMap()}
            defaultCenter={this.state.defaultCenter}
            defaultZoom={this.state.zoomLevel} 
            maxZoom={19}
            defaultOptions={{ styles: mapStylesObject }}
            scrollwheel={false}
            ref="map" >

            { this.markerCallbackHandler() }
            { this.restaurantMarkerCallbackHandler() }

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
    jobKey: job.jobkey,
    jobTitle: job.jobtitle,
    company: job.company, 
    formattedLocation: job.formattedLocation,
    showInfo: false
  })),
  restaurantMarkers: state.activeYelp.map(restaurant => ({
    markerType: 'restaurant',
    coords: { "lat": restaurant.coordinate.latitude, "lng": restaurant.coordinate.longitude },
    markerKey: restaurant.id,
    markerTitle: restaurant.name,
    address: restaurant.display_address,
    showInfo: false
  })),
  toggleModal: state.toggleModal,
  activeJob: state.activeJob,
  activeBus: state.activeBus
});

let mapDispatchToProps = (dispatch) => bindActionCreators({ 
  selectJob,
  toggleModal,
  toggleModalOff,
  activeBus
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GMap);


//not sure if we need this line(originally on line 194): coords: new google.maps.LatLng(job.latitude, job.longitude)
//we need to get the photo from yelp and add it to the state collection