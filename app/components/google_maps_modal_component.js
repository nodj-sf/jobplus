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


export default class GMap_Modal extends Component {
  constructor(props) {
    super(props);
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

  // Modal controls:
  handleClickOutside(evt) {
    this.closeIt();
  }

  render() {
    // console.log(`toggleModal: ${this.props.toggleModal}`);
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

              { this.props.markers.map((marker, index) => {
                // console.log(`Marker Key ID: ${marker.jobKey}\nActive Job Key ID: ${this.props.activeJob}`);
                const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
                      MAX_ZINDEX = 1000,
                      refID = `marker_${index}`,
                      refLabel = ALPHABET[index++ % ALPHABET.length],
                      markerShading = marker.jobKey === this.props.activeJob ? 0.99 : 0.50;

                return (
                  <Marker
                    key={index}
                    ref={refID}
                    position={marker.coords}
                    animation={google.maps.Animation.DROP}
                    title={marker.company}
                    opacity={markerShading}
                    label={{ "text": refLabel, "fontFamily": "Open Sans", "fontWeight": "600" }} >
                  </Marker>
                , 3000)
              })
            }

            </GoogleMap>
          } />

        <i className="fa fa-times-circle XButton" onClick={() => this.props.modalDisable()}></i>
      </Modal>
    );
  }
}


let mapStateToProps = (state) => {
  // console.log('Maps:', state.jobs.map(job => [job.latitude, job.longitude]));
  return {
    markers: state.jobs.map(job => ({ jobKey: job.jobkey, coords: new google.maps.LatLng(job.latitude, job.longitude), company: job.company })),
    toggleModal: state.toggleModal,
    activeJob: state.selectJob
  };
};

export default connect(mapStateToProps)(GMap_Modal);
