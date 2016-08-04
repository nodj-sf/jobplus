import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';
import { default as InfoBox } from 'react-google-maps/lib/addons/InfoBox';
import mapStylesObject from '../constants/google_map_styles.json';


class GMap extends Component {
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
            scrollwheel={false} >
          </GoogleMap>
        } 
      />
    );
  }
}

export default GMap;
