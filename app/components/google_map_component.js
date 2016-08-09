import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker, SearchBox } from 'react-google-maps';
import { default as InfoBox } from 'react-google-maps/lib/addons/InfoBox';
import Modal from 'react-modal';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import GMap_Modal from './google_maps_modal_component';
import mapStylesObject from '../constants/google_map_styles.json';
import { fetchJobs, selectJob } from '../actions/index';


class GMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      center: {
        lat: 37.745951, 
        lng: -122.439421
      }
    }
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
  openModal() {
    this.setState({isModalOpen: true});
  }

  toggleModal() {
    console.log('clicked');
    this.setState({isModalOpen: false});
  }

  handleDoubleClick() {
    this.openModal();
  }

  render() {
    return (
      <GoogleMapLoader
        containerElement={ 
          <div 
            id="mapsContainer" 
            onDoubleClick={() => this.handleDoubleClick()} /> 
        }   
        googleMapElement={
          <GoogleMap 
            defaultZoom={11} 
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

            <GMap_Modal modalState={this.state.isModalOpen} />

          </GoogleMap>
        } 
      />
    );
  }
}


function mapStateToProps(state) {
  console.log("Maps: ", state.jobs.map(job => [job.latitude, job.longitude]));
  return {
    markers: state.jobs.map(job => new google.maps.LatLng(job.latitude, job.longitude))
  };
}

export default connect(mapStateToProps)(GMap);
