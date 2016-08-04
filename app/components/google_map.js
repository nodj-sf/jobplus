import React, {Component} from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';
import InfoBox from "react-google-maps/lib/addons/InfoBox";


export default (props) => {
  return (
    <div id="mapsContainer" style={{height: "400px", width: '90%'}}>
      <GoogleMapLoader
        containerElement={ 
          <div style={{position: "relative", height: "100%", width: "100%", backgroundColor: "transparent"}}/> 
        }   
        googleMapElement={
          <GoogleMap defaultZoom={12} defaultCenter={{ lat: 37.735185, lng: -122.3867543 }} >
          </GoogleMap>
        }
      />
    </div>
  );
}
