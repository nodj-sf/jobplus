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
  
  addTimeDelayedMarker(marker, index, company) {
    const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
          MAX_ZINDEX = 1000,
          onClick = () => this.handleMarkerClick(marker),
          MAP_PIN = 'M0-165c-27.618 0-50 21.966-50 49.054C-50-88.849 0 0 0 0s50-88.849 50-115.946C50-143.034 27.605-165 0-165z',
          MAP_PIN1 = 'M 168.13014858503527 114.76652327113317 C 189.29733269688495 66.37538239750444 169.10629117101143 -0.743769309370748 88.35629117101149 0.006230690629195124 C 7.606291171011549 0.7562306906291383 -13.333356542955187 65.32715433879548 7.575247535632002 114.10675303790794 C 24.570783547217786 153.75719661632445 32.21524550334891 164.64004753237344 47.9861005922736 196.98393269349776 Q 63.75695568119835 229.32781785462203 88.39695364891526 279.86111234908753 L 128.26355111697524 197.31381781011032 Q 152.60629117101155 150.2562306906292 168.13014858503527 114.76652327113317 Z',
          // PIN_FILL_COLOR = marker.jobKey === this.props.activeJob.jobkey ? '#14A4B5' : '#7A7A7A',
          PIN_FILL_COLOR = '#7A7A7A',
          // PIN_Z_INDEX = marker.jobKey === this.props.activeJob.jobkey ? MAX_ZINDEX + 10 : MAX_ZINDEX;
          PIN_Z_INDEX = MAX_ZINDEX;

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

  markerCallbackHandler() {
    let getMarkersForCompany = (company) => this.props.markers.filter(marker => marker.company === company);
    let uniqueCompanyNames = [...new Set(this.props.markers.map(marker => marker.company))];
      // console.log(`Unique Company Names: ${uniqueCompanyNames}`);

    let markersByUniqueCompanyName = {};
    uniqueCompanyNames.forEach(companyName => {
      markersByUniqueCompanyName[companyName] = getMarkersForCompany(companyName);
    });

    return this.props.markers.map((marker, index, company) => {
      return this.addTimeDelayedMarker(marker, index, company);
    });
  }

  restaurantMarkerCallbackHandler() {
    return this.props.restaurantMarkers.map((marker, index) => {
      return this.addTimeDelayedMarker2(marker, index);
    });
  }

  busMarkerCallbackHandler() {
    return this.props.busMarkers.map((marker, index) => {
      return this.addTimeDelayedMarker3(marker, index);
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
      coords: { "lat": restaurant.coordinate.latitude, "lng": restaurant.coordinate.longitude },
      restaurantKey: restaurant.id,
      restaurantTitle: restaurant.name,
      address: restaurant.display_address
    })),
    busMarkers: state.activeBus.map(busMarker => ({
      coords: { "lat": busMarker.geometry.location.lat, "lng": busMarker.geometry.location.lng },
      busKey: busMarker.id,

    })),
    toggleModal: state.toggleModal,
    activeJob: state.selectJob
  };
};

export default connect(mapStateToProps)(GMap_Modal);
