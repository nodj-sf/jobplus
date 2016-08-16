import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow, SearchBox } from 'react-google-maps';
import { default as InfoBox } from 'react-google-maps/lib/addons/InfoBox';
import Modal from 'react-modal';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BaseComponent from './base_component';
import GMap_Modal from './google_maps_modal_component';
import mapStylesObject from '../constants/google_map_styles.json';
// import FrownyFaceImg from '../../public/img/favicon.png';
import { fetchJobs, selectJob, toggleModal, toggleModalOff } from '../actions/index';


// Code for potential inclusion at later date:
const geolocation = (() => {
  // canUseDOM && navigator.geolocation || {
  //   getCurrentPosition: (success, failure) => {
  //     failure(`Your browser doesn't support geolocation.`);
  //   },
  // }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      // console.log(`Location found: ${pos.lat} ${pos.lng}`);
      // console.log(`Google Maps LatLng: ${new google.maps.LatLng(pos.lat, pos.lng)}`);
      return new google.maps.LatLng(pos.lat, pos.lng);
    });
    // console.log(`Your browser doesn't support geolocation.`);
    return new google.maps.LatLng(37.745951, -122.439421);
  }
})();


class GMap extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      defaultCenter: new google.maps.LatLng(37.745951, -122.439421),
      geoPos: null,
      zoomLevel: 10
    };

    this.modalNo = this.modalNo.bind(this);
    this.addTimeDelayedMarker = this.addTimeDelayedMarker.bind(this);
    this.markerCallbackHandler = this.markerCallbackHandler.bind(this);
  }

  centerMap() {
    // console.log(`First map marker coordinates: ${this.props.markers[0].coords}`);
    return this.props.markers.length ? this.props.markers[0].coords : this.state.defaultCenter;
  }

  centerZoomOverUSA() {
    this.setState({ zoomLevel: 5 });
  }

  // Toggle to 'true' to show InfoWindow and re-render component
  handleMarkerClick(targetMarker) {
    this.closeAllMarkers();
    this.setState({ 
      markers: this.props.markers.map(marker => {
        return marker === targetMarker ? Object.assign(marker, {showInfo: true}) : marker;
      }) 
    });
  }

  handleMarkerClose(targetMarker) {
    this.setState({
      markers: this.props.markers.map(marker => {
        return marker === targetMarker ? { marker, showInfo: false } : marker;
      })
    });
  }

  closeAllMarkers() {
    this.setState({
      markers: this.props.markers.map(marker => Object.assign( marker, {showInfo: false}))
    });
  }

  renderInfoWindow(marker, ref, company) {
    const onCloseclick = this.handleMarkerClose.bind(this, marker);
    const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      console.log(`Marker Keys: ${Object.getOwnPropertyNames(marker)}`);
      console.log(`Job Name: ${marker.jobTitle}`);

    return (
      <InfoWindow
        key={`${ref}_info_window`}
        onCloseclick={onCloseclick} >

          <div>
            {
              company.map((companyMarker, index) => {
                return (
                  <div>
                    <h4 className="infoWindow_Header">{`${ALPHABET[this.props.markers.indexOf(companyMarker)]}.\t`}</h4>
                    <h4 className="infoWindow_Header">{this.parseAndFormatJobTitle(companyMarker.jobTitle)}</h4>
                  </div>
                );
              })
            }
            <h5 className="infoWindow_Header">{marker.company}</h5>
            <hr />
            <p>{marker.formattedLocation}</p>
          </div>
         
      </InfoWindow>
    );
  }

  // Class methods for control of the Google Maps Modal visibility:
  modalYes() {
    return this.props.toggleModal()
  }

  modalNo() {
    return this.props.toggleModalOff();
  }

  addTimeDelayedMarker(marker, index, company) {
    const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
          MAX_ZINDEX = 1000,
          onClick = () => this.handleMarkerClick(marker),
          MAP_PIN = 'M0-165c-27.618 0-50 21.966-50 49.054C-50-88.849 0 0 0 0s50-88.849 50-115.946C50-143.034 27.605-165 0-165z',
          PIN_FILL_COLOR = marker.jobKey === this.props.activeJob.jobkey ? '#14A4B5' : '#7A7A7A';

    return (
      <Marker
        key={index}
        ref={`marker_${index}`}
        data-jobTitle={marker.jobTitle}
        data-formattedLocation={marker.formattedLocation}
        position={ new google.maps.LatLng(marker.coords) }
        // animation={google.maps.Animation.DROP}
        title={marker.company}
        icon={{
          path: MAP_PIN,
          scale: 1/5,
          fillColor: PIN_FILL_COLOR,       // '#14A4B5',   // 'rgb(14, 119, 233)',         // #0E77E9',
          fillOpacity: 1,
          strokeColor: '#000',
          strokeWeight: 1
        }}
        // icon={`data:image/svg+xml,<svg%20xmlns%3D"http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg"%20width%3D"38"%20height%3D"38"%20viewBox%3D"0%200%2038%2038"><path%20fill%3D"%23808080"%20stroke%3D"%23ccc"%20stroke-width%3D".5"%20d%3D"M34.305%2016.234c0%208.83-15.148%2019.158-15.148%2019.158S3.507%2025.065%203.507%2016.1c0-8.505%206.894-14.304%2015.4-14.304%208.504%200%2015.398%205.933%2015.398%2014.438z"%2F><text%20transform%3D"translate%2819%2018.5%29"%20fill%3D"%23fff"%20style%3D"font-family%3A%20Arial%2C%20sans-serif%3Bfont-weight%3Abold%3Btext-align%3Acenter%3B"%20font-size%3D"12"%20text-anchor%3D"middle"`}
        opacity={0.90}
        zIndex={MAX_ZINDEX}
        label={{ "text": ALPHABET[index++ % index]}}
        showInfo={false}
        onClick={onClick} >

        { marker.showInfo ? this.renderInfoWindow(marker, index, company) : null }
      </Marker>
    );
     
  }

  markerCallbackHandler() {
    let getMarkersForCompany = (company) => this.props.markers.filter(marker => marker.company === company);
      // console.log("Horizon, Inc.:", getMarkersForCompany("Horizon Technology Partners, Inc"));

    let uniqueCompanyNames = [...new Set(this.props.markers.map(marker => marker.company))];
      // console.log(`Unique Company Names: ${uniqueCompanyNames}`);

    let markersByUniqueCompanyName = {};
    uniqueCompanyNames.forEach(companyName => {
      // if (!markersByUniqueCompanyName.has(marker.company)) {
      //   markersByUniqueCompanyName.set(marker.company, [marker]);
      // } else if (markersByUniqueCompanyName.has(marker.company)) {
      //   markersByUniqueCompanyName[marker.company].push(marker);
      // }
      markersByUniqueCompanyName[companyName] = getMarkersForCompany(companyName);
    });
      // console.log("Unique Markers By Company:", Object.keys(markersByUniqueCompanyName), Object.values(markersByUniqueCompanyName));

    return Object.values(markersByUniqueCompanyName).map((company, index) => {
      return this.addTimeDelayedMarker(company[0], index, company);
    });

    // return this.props.markers.map((marker, index) => {
    //   return this.addTimeDelayedMarker(marker, index);
    // });



  }

  render() {
      console.log("Active Job:", this.props.activeJob);
    return (
      <GoogleMapLoader
        containerElement={ 
          <div 
            id="mapsContainer" 
            onDoubleClick={() => this.modalYes()} /> 
        }   
        googleMapElement={
          <GoogleMap 
            center={this.centerMap()}
            defaultCenter={this.state.defaultCenter}
            defaultZoom={this.state.zoomLevel} 
            maxZoom={19}
            defaultOptions={{ styles: mapStylesObject }}
            scrollwheel={false}
            ref="map" >

            { this.markerCallbackHandler() }

            <GMap_Modal center={this.centerMap()} modalEnable={this.modalYes} modalDisable={this.modalNo} />
          </GoogleMap>
        } 
      />
    );
  }
}

let mapStateToProps = (state) => ({
  markers: state.jobs.map(job => ({ 
    coords: new google.maps.LatLng(job.latitude, job.longitude),
    coords: { "lat": job.latitude, "lng": job.longitude },
    jobKey: job.jobkey,
    jobTitle: job.jobtitle,
    company: job.company, 
    formattedLocation: job.formattedLocation,
    showInfo: false
  })),
  toggleModal: state.toggleModal,
  activeJob: state.activeJob
});

let mapDispatchToProps = (dispatch) => bindActionCreators({ 
  selectJob,
  toggleModal,
  toggleModalOff
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GMap);


// {
//   // Show InfoWindow only if `showInfo` key of the marker is `true`. That is, when the 
//   // Marker pin has been clicked and 'handleMarkerClick' has been successfully fired.
//   marker.showInfo ? this.renderInfoWindow(index, marker) : null 
// }


// function pinDropper() {
//                 let markers = [];


// const pinDropDelay = 1000,
//                     delayPinDrop = (fn) => setTImeOut(fn, pinDropDelay); 
// delayPinDrop(() => newMarker, pinDropDelay);

// const dropPins = () => setTimeout(function() { return newMarker; }, 1000);
// dropPins();
