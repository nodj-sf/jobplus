import React, {Component} from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';
// import InfoBox from "react-google-maps/lib/addons/InfoBox";


class GMap extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="mapsContainer">
        <div id="overlay"></div>

        <GoogleMapLoader
          containerElement={ 
            <div style={{position: "relative", height: "100%", width: "100%", backgroundColor: "transparent"}}/> 
          }   
          googleMapElement={
            <GoogleMap defaultZoom={12} scrollwheel={false} defaultCenter={{ lat: 37.735185, lng: -122.3867543 }}></GoogleMap>
          } />
      </div>
    );
  }
}

export default GMap;
