import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker, SearchBox } from 'react-google-maps';
import { default as InfoBox } from 'react-google-maps/lib/addons/InfoBox';
import Modal from 'react-modal';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import GMap_Modal from './google_maps_modal_component';
import mapStylesObject from '../constants/google_map_styles.json';
import { fetchJobs, selectJob, toggleModal, toggleModalOff } from '../actions/index';


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

      console.log(`Location found: ${pos.lat} ${pos.lng}`);
      console.log(`Google Maps LatLng: ${new google.maps.LatLng(pos.lat, pos.lng)}`);
      return new google.maps.LatLng(pos.lat, pos.lng);
    });

    console.log(`Your browser doesn't support geolocation.`);
    return new google.maps.LatLng(37.745951, -122.439421);
  }
})();


class GMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultCenter: new google.maps.LatLng(37.745951, -122.439421),
      geoPos: null,
      zoomLevel: 10
    };
    this.modalNo = this.modalNo.bind(this);
  }
    // defaultCenter: geolocation() new google.maps.LatLng(37.745951, -122.439421),

  centerMap() {
    console.log(`First map marker coordinates: ${this.props.markers[0].coords}`);
    return this.props.markers.length ? this.props.markers[0].coords : this.state.defaultCenter;
    // return this.state.defaultCenter;
  }

  centerZoomOverUSA() {
    this.setState({ zoomLevel: 5 });
  }

  // Toggle to 'true' to show InfoWindow and re-renders component
  handleMarkerClick(targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
        return marker === targetMarker ? { marker, showInfo: true } : marker;
      })
    });
  }

  handleMarkerClose(targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
        return marker === targetMarker ? { marker, showInfo: false } : marker;
      })
    });
  }


  modalYes() {
    console.log(`Function \`modalYes\` called!`);
    return this.props.toggleModal()
  }

  modalNo() {
    console.log(`Function \`modalNo\` called!`);
    return this.props.toggleModalOff();
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
            // defaultCenter={{ lat: 37.745951, lng: -122.439421 }}
            defaultCenter={this.state.defaultCenter}
            center={this.centerMap()}
            defaultZoom={this.state.zoomLevel} 
            maxZoom={19}
            defaultOptions={{styles: mapStylesObject}}
            scrollwheel={false}
            ref="map" >

            { this.props.markers.map((marker, index) => {
              const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
                    MAX_ZINDEX = 1000,
                    refID = `marker_${index}`,
                    refLabel = ALPHABET[index++ % ALPHABET.length];

              let m = <Marker
                  key={index}
                  ref={refID}
                  position={marker.coords}
                  animation={google.maps.Animation.DROP}
                  title={marker.company}
                  opacity={0.90}
                  zIndex={MAX_ZINDEX}
                  label={{ "text": refLabel, "fontFamily": "Open Sans", "fontWeight": "600" }} >
                </Marker>

              if (index === 0) { m.setZIndex({MAX_ZINDEX} + 1); }

              return ( m );
            })}

            <GMap_Modal center={this.centerMap()} modalEnable={this.modalYes} modalDisable={this.modalNo} />

          </GoogleMap>
        } 
      />
    );
  }
}


let mapStateToProps = (state) => {
  console.log("Maps:", state.jobs.map(job => [job.latitude, job.longitude]));
  return {
    markers: state.jobs.map(job => ({ coords: new google.maps.LatLng(job.latitude, job.longitude), company: job.company })),
    toggleModal: state.toggleModal
  };
};

let mapDispatchToProps = (dispatch) => {
  // Whenever loadJobs is called, the result should be passed to all reducers
  // return bindActionCreators({ selectJob: selectJob , fetchYelp: fetchYelp}, dispatch);
  return bindActionCreators({ toggleModal: toggleModal, toggleModalOff: toggleModalOff }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(GMap);
