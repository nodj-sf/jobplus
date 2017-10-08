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
      zoomLevel: 15
    };

    this.modalNo = this.modalNo.bind(this);
    // this.addTimeDelayedMarker = this.addTimeDelayedMarker.bind(this);
    this.jobMarkerCallbackHandler = this.jobMarkerCallbackHandler.bind(this);
    this.busMarkerCallbackHandler = this.busMarkerCallbackHandler.bind(this);
    this.trainMarkerCallbackHandler = this.trainMarkerCallbackHandler.bind(this);
    this.parkMarkerCallbackHandler = this.parkMarkerCallbackHandler.bind(this);
    this.gymMarkerCallbackHandler = this.gymMarkerCallbackHandler.bind(this);
  }

  centerMap(coordinates) {
    // console.log(`First map marker coordinates: ${this.props.markers[0].coords}`);
    if (coordinates !== undefined) {
      const latitude = coordinates.lat;
      const longitude = coordinates.lng;
      return {
        lat: latitude,
        lng: longitude
       }
    } else {
      return this.props.jobMarkers.length ? this.props.jobMarkers[0].coords : this.state.defaultCenter;
    }
  }

  centerZoomOverUSA() {
    this.setState({ zoomLevel: 5 });
  }

  // Toggle to 'true' to show InfoWindow and re-render component
  handleMarkerClick(targetMarker) {
    this.closeAllMarkers();
    const targetMarkerCordinates = targetMarker.coords;
    let typeRef;
    switch (targetMarker.markerType) {
      case 'job':
        typeRef = this.props.jobMarkers;
        break;
      case 'restaurant':
        typeRef = this.props.restaurantMarkers;
        break;
      case 'bus':
        typeRef = this.props.busMarkers;
        break
      case 'train':
        typeRef = this.props.trainMarkers;
        break;
      case 'gym':
        typeRef = this.props.gymMarkers;
        break;
      case 'park':
        typeRef = this.props.parkMarkers;
        break
      default:
        typeRef = this.props.jobMarkers;
        break;
    }

    this.setState({
      markers: typeRef.map(marker => {
        return marker === targetMarker ? Object.assign(marker, {showInfo: true}) : marker;
      })
    });
    this.centerMap(targetMarkerCordinates);
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

  renderInfoWindow(marker, ref) {
    const onCloseclick = this.handleMarkerClose.bind(this, marker);
    if (marker.markerType === "restaurant") {
      return (
        <InfoWindow
          key={`${marker.markerKey}_info_window`}
          onCloseclick={onCloseclick} >
            <div style={{width: '300px'}}>
              <div className="col-xs-12">
                <h4 className="infoWindow_Header text-center">{marker.markerTitle}</h4>
                <a href={marker.url} target="_blank">
                  <img className="img-responsive" style={{margin: '0px auto', padding: '5px 0px', width: '150px'}} src={this.parseYelpRestaurantPhoto(marker.imageUrl)} />
                </a>
              </div>
              <div className="col-xs-12">
                <img className="img-responsive" style={{margin: '0px auto', padding: '5px 0px'}} src={marker.ratingImageUrl} />
              </div>
              <div className="col-xs-12">
                <p className="text-center">{marker.address}</p>
              </div>
              <div className="col-xs-12">
                <blockquote style={{fontSize: '.9em', borderLeft: '5px solid #52B3D9'}}>{marker.textSnippet}</blockquote>
              </div>
            </div>
        </InfoWindow>
      );
    } else if (marker.markerType === 'job') {
      return (
        <InfoWindow
          key={`${marker.markerKey}_info_window`}
          onCloseclick={onCloseclick} >
            <div style={{width: '300px'}}>
              <div className="col-xs-12">
                <h4 className="infoWindow_Header">{marker.company}</h4>
                <a href={marker.url} target="_blank">
                  <h5 className="infoWindow_Header">{this.parseAndFormatJobTitle(marker.markerTitle)}</h5>
                </a>
              </div>
              <div className="col-xs-12">
                <p>This job was posted {marker.formattedRelativeTime}</p>
                <blockquote style={{fontSize: '.9em', borderLeft: '5px solid #52B3D9'}}>{marker.snippet.replace(/[b/<>]/g, '')}</blockquote>
              </div>
            </div>
        </InfoWindow>
      );
    } else if (marker.markerType === 'park') {
        return (
          <InfoWindow
            key={`${marker.markerKey}_info_window`}
            onCloseclick={onCloseclick} >
              <div>
                <h4 className="infoWindow_Header">{this.parseAndFormatJobTitle(marker.markerTitle)}</h4>
                <h5 className="infoWindow_Header">{marker.company}</h5>
                <p>{marker.vicinity}</p>
                <p>{marker.rating ? `rating: ${marker.rating}` : null}</p>
                <p>{marker.formattedLocation}</p>
                <p>{marker.isOpen ? 'The park is open at this momment.' : 'The park is closed at this momment.' }</p>
              </div>
          </InfoWindow>
        );
      } else {
        return (
          <InfoWindow
            key={`${marker.markerKey}_info_window`}
            onCloseclick={onCloseclick} >
              <div>
                <h4 className="infoWindow_Header">{this.parseAndFormatJobTitle(marker.markerTitle)}</h4>
                <h5 className="infoWindow_Header">{marker.company}</h5>
                <p>{marker.vicinity}</p>
                <p>{marker.formattedLocation}</p>
              </div>

          </InfoWindow>
        );
      }
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
        PIN_STROKE_WEIGHT = 0.75,
        PIN_Z_INDEX = MAX_ZINDEX;

    switch (marker.markerType) {
      case 'job':
        MAP_PIN = 'M409.133,109.203c-19.608-33.592-46.205-60.189-79.798-79.796C295.736,9.801,259.058,0,219.273,0   c-39.781,0-76.47,9.801-110.063,29.407c-33.595,19.604-60.192,46.201-79.8,79.796C9.801,142.8,0,179.489,0,219.267   c0,39.78,9.804,76.463,29.407,110.062c19.607,33.592,46.204,60.189,79.799,79.798c33.597,19.605,70.283,29.407,110.063,29.407   s76.47-9.802,110.065-29.407c33.593-19.602,60.189-46.206,79.795-79.798c19.603-33.596,29.403-70.284,29.403-110.062   C438.533,179.485,428.732,142.795,409.133,109.203z';
        PIN_SCALE = (1 / 25);
        PIN_FILL_COLOR = '#52B3D9';
        PIN_Z_INDEX = marker.markerKey === this.props.activeJob.jobkey ? 1000 : 900;
        PIN_STROKE_WEIGHT = 1.50;
        break;
      case 'restaurant':
        MAP_PIN = 'M409.133,109.203c-19.608-33.592-46.205-60.189-79.798-79.796C295.736,9.801,259.058,0,219.273,0   c-39.781,0-76.47,9.801-110.063,29.407c-33.595,19.604-60.192,46.201-79.8,79.796C9.801,142.8,0,179.489,0,219.267   c0,39.78,9.804,76.463,29.407,110.062c19.607,33.592,46.204,60.189,79.799,79.798c33.597,19.605,70.283,29.407,110.063,29.407   s76.47-9.802,110.065-29.407c33.593-19.602,60.189-46.206,79.795-79.798c19.603-33.596,29.403-70.284,29.403-110.062   C438.533,179.485,428.732,142.795,409.133,109.203z';
        PIN_SCALE = (1 / 25);
        PIN_FILL_COLOR = '#D64541';
        break;
      case 'train':
        MAP_PIN = 'M409.133,109.203c-19.608-33.592-46.205-60.189-79.798-79.796C295.736,9.801,259.058,0,219.273,0   c-39.781,0-76.47,9.801-110.063,29.407c-33.595,19.604-60.192,46.201-79.8,79.796C9.801,142.8,0,179.489,0,219.267   c0,39.78,9.804,76.463,29.407,110.062c19.607,33.592,46.204,60.189,79.799,79.798c33.597,19.605,70.283,29.407,110.063,29.407   s76.47-9.802,110.065-29.407c33.593-19.602,60.189-46.206,79.795-79.798c19.603-33.596,29.403-70.284,29.403-110.062   C438.533,179.485,428.732,142.795,409.133,109.203z';
        PIN_FILL_COLOR = '#6C7A89';
        PIN_SCALE = 1 / 25;
        break;
      case 'bus':
        MAP_PIN = 'M409.133,109.203c-19.608-33.592-46.205-60.189-79.798-79.796C295.736,9.801,259.058,0,219.273,0   c-39.781,0-76.47,9.801-110.063,29.407c-33.595,19.604-60.192,46.201-79.8,79.796C9.801,142.8,0,179.489,0,219.267   c0,39.78,9.804,76.463,29.407,110.062c19.607,33.592,46.204,60.189,79.799,79.798c33.597,19.605,70.283,29.407,110.063,29.407   s76.47-9.802,110.065-29.407c33.593-19.602,60.189-46.206,79.795-79.798c19.603-33.596,29.403-70.284,29.403-110.062   C438.533,179.485,428.732,142.795,409.133,109.203z';
        PIN_FILL_COLOR = '#6C7A89';
        PIN_SCALE = 1 / 25;
        break;
      case 'park':
        MAP_PIN = 'M409.133,109.203c-19.608-33.592-46.205-60.189-79.798-79.796C295.736,9.801,259.058,0,219.273,0   c-39.781,0-76.47,9.801-110.063,29.407c-33.595,19.604-60.192,46.201-79.8,79.796C9.801,142.8,0,179.489,0,219.267   c0,39.78,9.804,76.463,29.407,110.062c19.607,33.592,46.204,60.189,79.799,79.798c33.597,19.605,70.283,29.407,110.063,29.407   s76.47-9.802,110.065-29.407c33.593-19.602,60.189-46.206,79.795-79.798c19.603-33.596,29.403-70.284,29.403-110.062   C438.533,179.485,428.732,142.795,409.133,109.203z';
        PIN_FILL_COLOR = '#F7CA18';
        PIN_SCALE = 1 / 25;
        break;
      case 'gym':
        MAP_PIN = 'M409.133,109.203c-19.608-33.592-46.205-60.189-79.798-79.796C295.736,9.801,259.058,0,219.273,0   c-39.781,0-76.47,9.801-110.063,29.407c-33.595,19.604-60.192,46.201-79.8,79.796C9.801,142.8,0,179.489,0,219.267   c0,39.78,9.804,76.463,29.407,110.062c19.607,33.592,46.204,60.189,79.799,79.798c33.597,19.605,70.283,29.407,110.063,29.407   s76.47-9.802,110.065-29.407c33.593-19.602,60.189-46.206,79.795-79.798c19.603-33.596,29.403-70.284,29.403-110.062   C438.533,179.485,428.732,142.795,409.133,109.203z';
        PIN_FILL_COLOR = '#000';
        PIN_SCALE = 1 / 25;
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
          strokeWeight: PIN_STROKE_WEIGHT
        }}
        onClick={onClick}
        zIndex={PIN_Z_INDEX} >

        { marker.showInfo ? this.renderInfoWindow(marker, index) : null }

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

  busMarkerCallbackHandler() {
    return this.props.busMarkers.map((marker, index) => {
      return this.addMarker(marker, index);
    });
  }

  trainMarkerCallbackHandler() {
    return this.props.trainMarkers.map((marker, index) => {
      return this.addMarker(marker, index);
    });
  }

  parkMarkerCallbackHandler() {
    return this.props.parkMarkers.map((marker, index) => {
      return this.addMarker(marker, index);
    });
  }

  gymMarkerCallbackHandler() {
    return this.props.gymMarkers.map((marker, index) => {
      return this.addMarker(marker, index);
    });
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
            { this.jobMarkerCallbackHandler() }
            { this.restaurantMarkerCallbackHandler() }
            { this.busMarkerCallbackHandler() }
            { this.trainMarkerCallbackHandler() }
            { this.parkMarkerCallbackHandler() }
            { this.gymMarkerCallbackHandler() }
          </GoogleMap>
        }
      />
    );
  }
}

let mapStateToProps = (state) => {
  return {
    jobMarkers: state.jobs.map(job => ({
      markerType: 'job',
      coords: { "lat": job.latitude, "lng": job.longitude },
      // jobKey: job.jobkey,
      markerKey: job.jobkey,
      markerTitle: job.jobtitle,
      company: job.company,
      formattedLocation: job.formattedLocation,
      coordinate: job.coordinate,
      snippet: job.snippet,
      url: job.url,
      formattedRelativeTime: job.formattedRelativeTime,
      showInfo: false
    })),
    restaurantMarkers: state.activeYelp.map(restaurant => ({
      markerType: 'restaurant',
      coords: { "lat": restaurant.coordinate.latitude, "lng": restaurant.coordinate.longitude },
      markerKey: restaurant.id,
      markerTitle: restaurant.name,
      address: restaurant.display_address,
      url: restaurant.url,
      imageUrl: restaurant.photo,
      textSnippet: restaurant.snippetText,
      ratingImageUrl: restaurant.rating_img_url,
      showInfo: false
    })),
    busMarkers: state.activeBus.slice(0, 3).map(busMarker => ({
      markerType: 'bus',
      coords: { "lat": busMarker.geometry.location.lat, "lng": busMarker.geometry.location.lng },
      markerKey: busMarker.id,
      markerTitle: busMarker.name,
      vicinity: busMarker.vicinity,
      showInfo: false
    })),
    trainMarkers: state.activeTrains.slice(0, 3).map(trainMarker => ({
      markerType: 'train',
      coords: { "lat": trainMarker.geometry.location.lat, "lng": trainMarker.geometry.location.lng },
      markerKey: trainMarker.id,
      markerTitle: trainMarker.name,
      vicinity: trainMarker.vicinity,
      showInfo: false
    })),
    parkMarkers: state.activeParks.slice(0, 3).map(parkMarker => ({
      markerType: 'park',
      coords: { "lat": parkMarker.geometry.location.lat, "lng": parkMarker.geometry.location.lng },
      markerKey: parkMarker.id,
      markerTitle: parkMarker.name,
      vicinity: parkMarker.vicinity,
      isOpen: parkMarker.opening_hours.open_now,
      rating: parkMarker.rating,
      showInfo: false
    })),
    gymMarkers: state.activeGyms.slice(0, 3).map(gymMarker => ({
      markerType: 'gym',
      coords: { "lat": gymMarker.geometry.location.lat, "lng": gymMarker.geometry.location.lng },
      markerKey: gymMarker.id,
      markerTitle: gymMarker.name,
      vicinity: gymMarker.vicinity,
      showInfo: false
    })),
    toggleModal: state.toggleModal,
    activeJob: state.activeJob
  };
};

let mapDispatchToProps = (dispatch) => bindActionCreators({
  selectJob,
  toggleModal,
  toggleModalOff,
  activeBus
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GMap);


// Not sure if we need this line(originally on line 194): coords: new google.maps.LatLng(job.latitude, job.longitude)
// We need to get the photo from yelp and add it to the state collection
