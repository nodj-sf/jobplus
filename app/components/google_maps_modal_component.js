import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow, SearchBox } from 'react-google-maps';
import { default as InfoBox } from 'react-google-maps/lib/addons/InfoBox';
import Modal from 'react-modal';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import customStyles from '../constants/google_map_modal_styles';
import mapStylesObject from '../constants/google_map_styles.json';
import { fetchJobs, selectJob, toggleModalOn } from '../actions/index';
import fontawesome from 'fontawesome-markers';


export default class GMap_Modal extends Component {
  constructor(props) {
    super(props);
  }

  // Toggle to 'true' to show InfoWindow and re-renders component
  handleMarkerClick(targetMarker) {
    this.setState({
      markers: this.props.markers.map(marker => {
        return marker === targetMarker ? { marker, showInfo: true } : marker;
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

  // Modal controls:
  handleClickOutside(evt) {
    this.closeIt();
  }

  renderInfoWindow(marker, ref, company) {
    const onCloseclick = this.handleMarkerClose.bind(this, marker),
          ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

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
  
  addTimeDelayedMarker(marker, index, company) {
    const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
          MAX_ZINDEX = 1000,
          onClick = () => this.handleMarkerClick(marker),
          MAP_PIN = 'M0-165c-27.618 0-50 21.966-50 49.054C-50-88.849 0 0 0 0s50-88.849 50-115.946C50-143.034 27.605-165 0-165z',
          MAP_PIN1 = 'M 168.13014858503527 114.76652327113317 C 189.29733269688495 66.37538239750444 169.10629117101143 -0.743769309370748 88.35629117101149 0.006230690629195124 C 7.606291171011549 0.7562306906291383 -13.333356542955187 65.32715433879548 7.575247535632002 114.10675303790794 C 24.570783547217786 153.75719661632445 32.21524550334891 164.64004753237344 47.9861005922736 196.98393269349776 Q 63.75695568119835 229.32781785462203 88.39695364891526 279.86111234908753 L 128.26355111697524 197.31381781011032 Q 152.60629117101155 150.2562306906292 168.13014858503527 114.76652327113317 Z',
          PIN_FILL_COLOR = marker.jobKey === this.props.activeJob.jobkey ? '#14A4B5' : '#7A7A7A',
          PIN_Z_INDEX = marker.jobKey === this.props.activeJob.jobkey ? MAX_ZINDEX + 10 : MAX_ZINDEX;

    return (
      <Marker
        key={`Marker_${marker.jobKey}`}
        ref={`marker_${index}`}
        data-jobTitle={marker.jobTitle}
        data-formattedLocation={marker.formattedLocation}
        position={ new google.maps.LatLng(marker.coords) }
        // animation={google.maps.Animation.DROP}
        title={marker.company}
        icon={{
          path: MAP_PIN1,
          scale: 1/6,
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

        { marker.showInfo ? this.renderInfoWindow(marker, index, company) : null }
      </Marker>
    );
  }

  addTimeDelayedMarker2(marker, index) {
    const MAX_ZINDEX = 900,
          onClick = () => this.handleMarkerClick(marker),
          MAP_PIN1 = 'M 168.13014858503527 114.76652327113317 C 189.29733269688495 66.37538239750444 169.10629117101143 -0.743769309370748 88.35629117101149 0.006230690629195124 C 7.606291171011549 0.7562306906291383 -13.333356542955187 65.32715433879548 7.575247535632002 114.10675303790794 C 24.570783547217786 153.75719661632445 32.21524550334891 164.64004753237344 47.9861005922736 196.98393269349776 Q 63.75695568119835 229.32781785462203 88.39695364891526 279.86111234908753 L 128.26355111697524 197.31381781011032 Q 152.60629117101155 150.2562306906292 168.13014858503527 114.76652327113317 Z',
          CUTLERY_PIN = 'M3.5 0c-1.7 0-3 1.6-3 3.5 0 1.7 1 3 2.3 3.4l-.5 8c0 .6.4 1 1 1h.5c.5 0 1-.4 1-1L4 7C5.5 6.4 6.5 5 6.5 3.4c0-2-1.3-3.5-3-3.5zm10 0l-.8 5h-.6l-.3-5h-.4L11 5H10l-.8-5H9v6.5c0 .3.2.5.5.5h1.3l-.5 8c0 .6.4 1 1 1h.4c.6 0 1-.4 1-1l-.5-8h1.3c.3 0 .5-.2.5-.5V0h-.4z',
          CUTLERY_PIN1 = 'm 407.89288,264.21951 c -5.37639,-14.73114 5.5253,-38.94878 -6.80684,-50.63187 l -97.80958,-92.6617 -5.6044,5.60439 80.7416,91.95041 -11.309,11.10857 -91.85018,-80.64139 -5.6044,5.6044 80.7897,91.99848 -10.85201,11.56557 -92.35527,-81.14647 -5.6044,5.60439 90.6414,101.85019 c 10.94643,12.30007 35.26576,-4.39892 49.2033,4.36813 20.28775,12.76148 147.29347,169.78332 170.1524,146.47922 C 574.48412,411.96774 418.9608,284.09174 407.89288,264.21951 Z m -24.98672,17.32934 c 0,0 -150.92241,134.90217 -132.83507,151.0178 C 265.1961,449.5518 381.896,333.06662 381.896,333.06662 l 32.32488,30.30459 c 0,0 165.19346,-141.28371 126.77415,-238.90108 -72.57602,68.99235 -158.08887,157.07872 -158.08887,157.07872 z',
          PIN_FILL_COLOR = '#F00';
          // PIN_Z_INDEX = MAX_ZINDEX;


    return (
      <Marker
        key={`Marker_${marker.restaurantKey}`}
        ref={`marker_${index}`}
        data-jobTitle={marker.restaurantTitle}
        position={ new google.maps.LatLng(marker.coords) }
        title={marker.restaurantTitle}
        icon={{
          path: CUTLERY_PIN1,
          scale: 1/6,
          fillColor: '#AF0606',
          fillOpacity: 1,
          strokeColor: '#FFF',
          strokeWeight: 1
        }}
        opacity={0.90}
        zIndex={900}
        showInfo={false}
        onClick={onClick} >

      </Marker>
    );
  }

  addTimeDelayedMarker3(marker, index) {
    const MAX_ZINDEX = 900,
          onClick = () => this.handleMarkerClick(marker),
          MAP_PIN1 = 'M 168.13014858503527 114.76652327113317 C 189.29733269688495 66.37538239750444 169.10629117101143 -0.743769309370748 88.35629117101149 0.006230690629195124 C 7.606291171011549 0.7562306906291383 -13.333356542955187 65.32715433879548 7.575247535632002 114.10675303790794 C 24.570783547217786 153.75719661632445 32.21524550334891 164.64004753237344 47.9861005922736 196.98393269349776 Q 63.75695568119835 229.32781785462203 88.39695364891526 279.86111234908753 L 128.26355111697524 197.31381781011032 Q 152.60629117101155 150.2562306906292 168.13014858503527 114.76652327113317 Z',
          PIN_FILL_COLOR = '#00F';
          // PIN_Z_INDEX = MAX_ZINDEX;

    return (
      <Marker
        key={`Marker_${marker.busKey}`}
        ref={`marker_${index}`}
        // data-jobTitle={marker.restaurantTitle}
        position={ new google.maps.LatLng(marker.coords) }
        // title={marker.restaurantTitle}
        icon={{
          path: MAP_PIN1,
          scale: 1/12,
          fillColor: PIN_FILL_COLOR,
          fillOpacity: 1,
          strokeColor: '#000',
          strokeWeight: 0.50
        }}
        opacity={0.90}
        zIndex={900}
        showInfo={false}
        onClick={onClick} >

        { marker.showInfo ? this.renderInfoWindow(marker, index) : null }
      </Marker>
    );
  }

  addTimeDelayedMarker4(marker, index) {
    const MAX_ZINDEX = 900,
          onClick = () => this.handleMarkerClick(marker),
          MAP_PIN1 = 'M 168.13014858503527 114.76652327113317 C 189.29733269688495 66.37538239750444 169.10629117101143 -0.743769309370748 88.35629117101149 0.006230690629195124 C 7.606291171011549 0.7562306906291383 -13.333356542955187 65.32715433879548 7.575247535632002 114.10675303790794 C 24.570783547217786 153.75719661632445 32.21524550334891 164.64004753237344 47.9861005922736 196.98393269349776 Q 63.75695568119835 229.32781785462203 88.39695364891526 279.86111234908753 L 128.26355111697524 197.31381781011032 Q 152.60629117101155 150.2562306906292 168.13014858503527 114.76652327113317 Z',
          PIN_FILL_COLOR = '#0F0';
          // PIN_Z_INDEX = MAX_ZINDEX;

    return (
      <Marker
        key={`Marker_${marker.busKey}`}
        ref={`marker_${index}`}
        // data-jobTitle={marker.restaurantTitle}
        position={ new google.maps.LatLng(marker.coords) }
        // title={marker.restaurantTitle}
        icon={{
          path: MAP_PIN1,
          scale: 1/12,
          fillColor: PIN_FILL_COLOR,
          fillOpacity: 1,
          strokeColor: '#000',
          strokeWeight: 0.50
        }}
        opacity={0.90}
        zIndex={900}
        showInfo={false}
        onClick={onClick} >

        { marker.showInfo ? this.renderInfoWindow(marker, index) : null }
      </Marker>
    );
  }

  addMarker(marker, index) {
    const MAX_ZINDEX = 800;
    let MAP_PIN = 'M 168.13014858503527 114.76652327113317 C 189.29733269688495 66.37538239750444 169.10629117101143 -0.743769309370748 88.35629117101149 0.006230690629195124 C 7.606291171011549 0.7562306906291383 -13.333356542955187 65.32715433879548 7.575247535632002 114.10675303790794 C 24.570783547217786 153.75719661632445 32.21524550334891 164.64004753237344 47.9861005922736 196.98393269349776 Q 63.75695568119835 229.32781785462203 88.39695364891526 279.86111234908753 L 128.26355111697524 197.31381781011032 Q 152.60629117101155 150.2562306906292 168.13014858503527 114.76652327113317 Z',
        PIN_SCALE = (1 / 10),
        PIN_FILL_COLOR = '#696969';

    switch (marker.markerType) {
      case 'restaurant':
        MAP_PIN = 'm 407.89288,264.21951 c -5.37639,-14.73114 5.5253,-38.94878 -6.80684,-50.63187 l -97.80958,-92.6617 -5.6044,5.60439 80.7416,91.95041 -11.309,11.10857 -91.85018,-80.64139 -5.6044,5.6044 80.7897,91.99848 -10.85201,11.56557 -92.35527,-81.14647 -5.6044,5.60439 90.6414,101.85019 c 10.94643,12.30007 35.26576,-4.39892 49.2033,4.36813 20.28775,12.76148 147.29347,169.78332 170.1524,146.47922 C 574.48412,411.96774 418.9608,284.09174 407.89288,264.21951 Z m -24.98672,17.32934 c 0,0 -150.92241,134.90217 -132.83507,151.0178 C 265.1961,449.5518 381.896,333.06662 381.896,333.06662 l 32.32488,30.30459 c 0,0 165.19346,-141.28371 126.77415,-238.90108 -72.57602,68.99235 -158.08887,157.07872 -158.08887,157.07872 z';
        PIN_SCALE = (1 / 9);
        PIN_FILL_COLOR = '#AF0606';
        break;
      case 'train':
        PIN_FILL_COLOR = '#0F0';
        break;
      case 'bus':
        PIN_FILL_COLOR = '#EF0';
        break;
      case 'park':
        PIN_FILL_COLOR = '#0FA';
        break;
      case 'gym':
        PIN_FILL_COLOR = '#000';
        break;
      default:
        PIN_FILL_COLOR = '#FFF'; 
        break;
    }

    return (
      <Marker
        key={`Marker_${marker.markerKey}`}
        ref={`marker_${index}`}
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
        zIndex={MAX_ZINDEX} >

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

  busMarkerCallbackHandler() {
    return this.props.busMarkers.map((marker, index) => {
      return this.addMarker(marker, index);
    });
  }

  trainMarkerCallbackHandler() {
    return this.props.trainsMarkers.map((marker, index) => {
      return this.addMarker(marker, index);
    });
  }

  parkMarkerCallbackHandler() {
    return this.props.parksMarkers.map((marker, index) => {
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
      <Modal
        isOpen={this.props.toggleModal}
        style={customStyles} >

        <GoogleMapLoader
          containerElement={
            <div className="GMap_Modal" style={{height: "90vh", width: "90vw"}} />
          }
          googleMapElement={
            <GoogleMap 
              defaultCenter={this.props.center}
              defaultZoom={13} 
              maxZoom={14}
              defaultOptions={{styles: mapStylesObject}}
              scrollwheel={false}
              ref="map" >

              { this.markerCallbackHandler() }
              { this.restaurantMarkerCallbackHandler() }
              { this.busMarkerCallbackHandler() }
              { this.trainMarkerCallbackHandler() }
              { this.parkMarkerCallbackHandler() }
              { this.gymMarkerCallbackHandler() }

            </GoogleMap>
          } />

        <i className="fa fa-times-circle XButton" onClick={() => this.props.modalDisable()}></i>
      </Modal>
    );
  }
}


let mapStateToProps = (state) => {
  return {
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
      address: restaurant.display_address
    })),
    busMarkers: state.activeBus.slice(0, 3).map(busMarker => ({
      markerType: 'bus',
      coords: { "lat": busMarker.geometry.location.lat, "lng": busMarker.geometry.location.lng },
      markerKey: busMarker.id,
    })),
    trainsMarkers: state.activeTrains.slice(0, 3).map(trainMarker => ({
      markerType: 'train',
      coords: { "lat": trainMarker.geometry.location.lat, "lng": trainMarker.geometry.location.lng },
      markerKey: trainMarker.id
    })),
    parksMarkers: state.activeParks.slice(0, 3).map(parkMarker => ({
      markerType: 'park',
      coords: { "lat": parkMarker.geometry.location.lat, "lng": parkMarker.geometry.location.lng },
      markerKey: parkMarker.id
    })),
    gymMarkers: state.activeGyms.slice(0, 3).map(gymMarker => ({
      markerType: 'gym',
      coords: { "lat": gymMarker.geometry.location.lat, "lng": gymMarker.geometry.location.lng },
      markerKey: gymMarker.id
    })),
    toggleModal: state.toggleModal,
    activeJob: state.activeJob
  };
};

export default connect(mapStateToProps)(GMap_Modal);
