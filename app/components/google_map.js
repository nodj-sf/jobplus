import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';

import mapStylesObject from '../constants/google_map_styles.json';
// import mapStylesObject from '../constants/google_map_styles.json';

// import { default as React, Component } from "react";
// import { default as InfoBox } from "react-google-maps/lib/addons/InfoBox";
// import InfoBox from "react-google-maps/lib/addons/InfoBox";


class GMap extends Component {


  render() {
    return (
      <GoogleMapLoader
        containerElement={ 
          <div id="mapsContainer" /> 
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


// constructor(props) {
//   super(props);
// }

// defaultOptions={{ styles: [{
//   "featureType": "water",
//   "elementType": "all",
//   "stylers": [{
//     "color": "#787878"
//   }]
// }] }}

// containerProps={{
//   ...this.props,
//   style: {
//     height: `100%`,
//   },
// }}
// defaultZoom={5}
// defaultCenter={myLatLng}
// defaultOptions={{
//   styles: fancyMapStyles,
// }}

//     <div id="mapsContainer">
//       <div id="overlay"></div>
// </div>
