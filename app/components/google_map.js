import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker, SearchBox } from 'react-google-maps';
import { default as InfoBox } from 'react-google-maps/lib/addons/InfoBox';
import mapStylesObject from '../constants/google_map_styles.json';


export default class GMap extends Component {

  constructor(props) {
    super(props);

    this.state = {
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

  render() {
    return (
      <GoogleMapLoader
        containerElement={ 
          <div id='mapsContainer' /> 
        }   
        googleMapElement={
          <GoogleMap 
            defaultZoom={12} 
            defaultCenter={{ lat: 37.745951, lng: -122.439421 }}
            maxZoom={14}
            defaultOptions={{styles: mapStylesObject}}
            scrollwheel={false}
            ref='map' >

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
    );
  }
}


// export default GMap;

// { 
//     Show info window only if the 'showInfo' key of the marker is true.
//     That is, when the Marker pin has been clicked and 'handleMarkerClick' has been
//     Successfully fired.
  

//   {marker.showInfo ? this.renderInfoWindow(ref, marker) : null}
//  }