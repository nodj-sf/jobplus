import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker, SearchBox } from 'react-google-maps';
import { default as InfoBox } from 'react-google-maps/lib/addons/InfoBox';
import Modal from 'react-modal';
import mapStylesObject from '../constants/google_map_styles.json';


const customStyles = {
  overlay : {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(41, 37, 37, 0.59)'
  },
  content: {
    minWidth: '90vw',
    minHeight: '90vh',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    borderRadius: '8px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '200'
  }
};

const mapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.TOP_RIGHT
    },
    panControl: true,
    panControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP
    },
    zoomControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.LARGE,
      position: google.maps.ControlPosition.RIGHT_TOP
    },
    scaleControl: true,
    scaleControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP
    },
    streetViewControl: false,
    scrollwheel: false
  };


export default class GMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      center: {
        lat: 37.745951, 
        lng: -122.439421
      },

      // Dummy Data: Array of objects of markers
      markers: [{
        position: new google.maps.LatLng(37.745, -122.439421),
        showInfo: false,
      }, {
        position: new google.maps.LatLng(37.743, -122.419421),
        showInfo: false,
      }]
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

  closeModal() {
    this.setState({isModalOpen: false});
  }

  handleClickOutside(evt) {
    this.closeModal();
  }

  render() {
    return (
      <GoogleMapLoader
        containerElement={ 
          <div id="mapsContainer" onClick={() => this.openModal()} /> 
        }   
        googleMapElement={
          <GoogleMap 
            {...this.state.mapOptions}
            defaultOptions={{ styles: mapStylesObject }}
            defaultCenter={{ lat: 37.745951, lng: -122.439421 }}
            defaultZoom={13} 
            maxZoom={14}
            zoomControlOptions={{
              style: google.maps.ZoomControlStyle.LARGE,
              position: google.maps.ControlPosition.LEFT_TOP
            }}
            scrollwheel={false}
            zoomControl={false}
            ref="map" >

            <Modal
              isOpen={this.state.isModalOpen}
              onClose={() => this.closeModal()}
              style={customStyles} >

              <GoogleMapLoader
                containerElement={
                  <div {...this.props.containerElementProps} className="GMap_Modal" style={{ height: "90vh", width: "90vw" }} />
                }
                googleMapElement={
                  <GoogleMap 
                    {...this.state.mapOptions}
                    defaultOptions={{ styles: mapStylesObject }}
                    defaultCenter={{ lat: 37.745951, lng: -122.439421 }}
                    defaultZoom={13} 
                    maxZoom={14}
                    scrollwheel={false}
                    ref="map" >

                    {this.state.markers.map((marker, index) => {
                      const ref = `marker_${index}`;
                      const onClick = () => this.handleMarkerClick(marker);

                      return (
                        <Marker
                          key={index}
                          ref={ref}
                          position={marker.position}
                          onClick={onClick} >
                        </Marker>
                      );
                    })}
                  </GoogleMap>
                }
              />

              <i className="fa fa-times-circle XButton" onClick={() => this.closeModal()}></i>
            </Modal>
          </GoogleMap>
        } 
      />
    );
  }
}
