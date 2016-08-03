import React, {Component} from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';

export default (props) => {
  return (
    <div className="map-container" style={{height: "500px", width: '500px'}}>
    <h1>NodjMap</h1>
      <GoogleMapLoader
        containerElement={ <div style={{height: "100%"}}/> }
        googleMapElement={
          <GoogleMap defaultZoom={12} defaultCenter={{ lat: 37.735185, lng: -122.3867543 }} >
          </GoogleMap>
        }
      />
    </div>
  );
}
