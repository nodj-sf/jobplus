import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow, SearchBox } from 'react-google-maps';
import { default as InfoBox } from 'react-google-maps/lib/addons/InfoBox';
import Modal from 'react-modal';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BaseComponent from './base_component';
import MapComponent from './map_component';
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
    // this.addTimeDelayedMarker = this.addTimeDelayedMarker.bind(this);
    this.jobMarkerCallbackHandler = this.jobMarkerCallbackHandler.bind(this);
  }

  centerMap() {
    // console.log(`First map marker coordinates: ${this.props.markers[0].coords}`);
    return this.props.jobMarkers.length ? this.props.jobMarkers[0].coords : this.state.defaultCenter;
  }

  centerZoomOverUSA() {
    this.setState({ zoomLevel: 5 });
  }

  // Toggle to 'true' to show InfoWindow and re-render component
  handleMarkerClick(targetMarker) {
    this.closeAllMarkers();

    let typeRef;
    switch (targetMarker.markerType) {
      case 'job':
        typeRef = this.props.jobMarkers;
        break;
      case 'restaurant':
        typeRef = this.props.restaurantMarkers;
        break;
      default:
        typeRef = this.props.jobMarkers;
        break;
    }

    this.setState({ 
      markers: typeRef.map(marker => {
        return marker === targetMarker ? Object.assign(marker, {showInfo: true}) : marker;
      }) 
    });
    this.centerMap();
  }

  handleMarkerClose(targetMarker) {
    this.setState({
      markers: this.props.jobMarkers.map(marker => {
        return marker === targetMarker ? { marker, showInfo: false } : marker;
      })
    });
  }

  closeAllMarkers() {
    let allMarkers = [
      this.props.jobMarkers,
      this.props.restaurantMarkers
    ];

    allMarkers.forEach(markerSet => {
      this.setState({
        markers: markerSet.map(marker => Object.assign( marker, {showInfo: false}))
      });
    });
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
            <p>{marker.formattedLocation}</p>
          </div>
         
      </InfoWindow>
    );
  }

  // // Class methods for control of the Google Maps Modal visibility:
  modalYes() {
    return this.props.toggleModal()
  }

  modalNo() {
    return this.props.toggleModalOff();
  }

  addMarker(marker, index) {
    const MAX_ZINDEX = 800,
          onClick = () => this.handleMarkerClick(marker);

    let MAP_PIN = 'M 168.13014858503527 114.76652327113317 C 189.29733269688495 66.37538239750444 169.10629117101143 -0.743769309370748 88.35629117101149 0.006230690629195124 C 7.606291171011549 0.7562306906291383 -13.333356542955187 65.32715433879548 7.575247535632002 114.10675303790794 C 24.570783547217786 153.75719661632445 32.21524550334891 164.64004753237344 47.9861005922736 196.98393269349776 Q 63.75695568119835 229.32781785462203 88.39695364891526 279.86111234908753 L 128.26355111697524 197.31381781011032 Q 152.60629117101155 150.2562306906292 168.13014858503527 114.76652327113317 Z',
        PIN_SCALE = (1 / 10),
        PIN_FILL_COLOR = '#696969',
        PIN_Z_INDEX = MAX_ZINDEX;

    switch (marker.markerType) {
      case 'job':
        MAP_PIN = 'm 260.01758,94.537109 0,7.535161 24.25195,0 0,-7.535161 -24.25195,0 z m 12.125,-45.03125 c -41.42135,0 -75,33.578645 -75,75.000001 0,41.42136 34.93882,90.3563 75,173.92773 41.48975,-83.57143 75,-132.50637 75,-173.92773 0,-41.421356 -33.57865,-75.000001 -75,-75.000001 z m -15.71823,38.316402 31.54859,0 4.49157,3.62151 0,12.739189 4.13054,0 21.78509,0 0,66.68953 -21.78509,0 -48.46094,0 -22.22909,0 0,-66.68953 22.22909,0 3.68655,0 0,-12.739189 4.60368,-3.62151 z';
        PIN_SCALE = (1 / 5);
        PIN_FILL_COLOR = marker.markerKey === this.props.activeJob.jobkey ? '#14A4B5' : '#7A7A7A';
        PIN_Z_INDEX = marker.markerKey === this.props.activeJob.jobkey ? 1000 : 900;
        break;
      case 'restaurant':
        MAP_PIN = 'm 407.89288,264.21951 c -5.37639,-14.73114 5.5253,-38.94878 -6.80684,-50.63187 l -97.80958,-92.6617 -5.6044,5.60439 80.7416,91.95041 -11.309,11.10857 -91.85018,-80.64139 -5.6044,5.6044 80.7897,91.99848 -10.85201,11.56557 -92.35527,-81.14647 -5.6044,5.60439 90.6414,101.85019 c 10.94643,12.30007 35.26576,-4.39892 49.2033,4.36813 20.28775,12.76148 147.29347,169.78332 170.1524,146.47922 C 574.48412,411.96774 418.9608,284.09174 407.89288,264.21951 Z m -24.98672,17.32934 c 0,0 -150.92241,134.90217 -132.83507,151.0178 C 265.1961,449.5518 381.896,333.06662 381.896,333.06662 l 32.32488,30.30459 c 0,0 165.19346,-141.28371 126.77415,-238.90108 -72.57602,68.99235 -158.08887,157.07872 -158.08887,157.07872 z';
        PIN_SCALE = (1 / 11);
        PIN_FILL_COLOR = '#AF0606';
        break;
      default:
        PIN_FILL_COLOR = '#FFF'; 
        break;
    }

    return (
      <Marker
        key={`Marker_${marker.markerKey}`}
        ref={`${marker.markerType}_Marker_${index}`}
        data-jobTitle={marker.markerTitle}
        data-formattedLocation={marker.formattedLocation}
        // data-jobTitle={marker.restaurantTitle}
        position={ new google.maps.LatLng(marker.coords) }
        // title={marker.restaurantTitle}
        icon={{
          path: MAP_PIN,
          scale: PIN_SCALE,
          fillColor: PIN_FILL_COLOR,
          fillOpacity: 1,
          strokeColor: '#FFF',
          strokeWeight: 1
        }}
        onClick={onClick}
        zIndex={PIN_Z_INDEX} >

        { marker.showInfo ? this.renderAmenityInfoWindow(marker, index) : null }

      </Marker>
    );
  }

  jobMarkerCallbackHandler() {
    return this.props.jobMarkers.map((marker, index) => {
      return this.addMarker(marker, index);
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

            { this.jobMarkerCallbackHandler() }
            { this.restaurantMarkerCallbackHandler() }

            <GMap_Modal center={this.centerMap()} modalEnable={this.modalYes} modalDisable={this.modalNo} />
          </GoogleMap>
        } 
      />
    );
  }
}

let mapStateToProps = (state) => ({
  jobMarkers: state.jobs.map(job => ({ 
    markerType: 'job',
    coords: { "lat": job.latitude, "lng": job.longitude },
    // jobKey: job.jobkey,
    markerKey: job.jobkey,
    markerTitle: job.jobtitle,
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


// Not sure if we need this line(originally on line 194): coords: new google.maps.LatLng(job.latitude, job.longitude)
// We need to get the photo from yelp and add it to the state collection
