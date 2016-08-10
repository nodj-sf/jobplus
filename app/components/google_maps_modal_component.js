import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker, SearchBox } from 'react-google-maps';
import { default as InfoBox } from 'react-google-maps/lib/addons/InfoBox';
import Modal from 'react-modal';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import mapStylesObject from '../constants/google_map_styles.json';
import customStyles from '../constants/google_map_modal_styles';
import { fetchJobs, selectJob } from '../actions/index';


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
    this.closeModal();
  }

  render() {
    // console.log("Modal State:", this.props.modalState);
    return (
      <Modal
        isOpen={this.props.modalState}
        onClose={() => this.props.modalState}
        style={customStyles} >

        <GoogleMapLoader
          containerElement={
            <div {...this.props} className="GMap_Modal" style={{height: "90vh", width: "90vw"}} />
          }
          googleMapElement={
            <GoogleMap 
              defaultZoom={13} 
              defaultCenter={{ lat: 37.745951, lng: -122.439421 }}
              maxZoom={14}
              defaultOptions={{styles: mapStylesObject}}
              scrollwheel={false}
              ref="map" >

              { this.props.markers.map((marker, index) => {
                const refID = `marker_${index}`;

                return (
                  <Marker
                    key={index}
                    ref={refID}
                    position={marker} >
                  </Marker>
                );
              })}
            </GoogleMap>
          } />

        <i className="fa fa-times-circle XButton" onClick={this.props.toggleModal}></i>
      </Modal>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     job: state.activeJob
//   };
// }

// export default connect(mapStateToProps)(JobDetail);

function mapStateToProps(state) {
  console.log("Maps: ", state.jobs.map(job => [job.latitude, job.longitude]));
  return {
    markers: state.jobs.map(job => new google.maps.LatLng(job.latitude, job.longitude)),
    // isModalOpen: state
  };
}

export default connect(mapStateToProps)(GMap_Modal);
