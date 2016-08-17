import React, { Component } from 'react';
import { connect } from 'react-redux';
import BaseComponent from '../components/base_component';


class AmenetiesList extends BaseComponent {

  customList(parks, gyms) {
    let topResults = [parks[0], gyms[0]];
    return topResults;
  }

  renderList() {
    let props = this.props;
    let newList = this.customList(props.activeParks, props.activeGyms);
    
    return (
      <div>
        <li className="placesLI" 
            style={{"listStyleType": "none"}}
            key={newList[0].place_id} >
          <h5>Parks & Recreation</h5>  
          <p>{ newList[0].name } { this.getDistanceFromLatLonInKm(props.activeJob.latitude,props.activeJob.longitude,newList[0].geometry.location.lat, newList[0].geometry.location.lng ) }</p>
        </li>
        <li className="placesLI" 
            style={{"listStyleType": "none"}}
            key={newList[1].place_id} >
          <h5>Gyms & Fitness</h5>  
          <p>{ newList[1].name } { this.getDistanceFromLatLonInKm(props.activeJob.latitude,props.activeJob.longitude,newList[1].geometry.location.lat, newList[1].geometry.location.lng ) }</p>
        </li>
      </div>
    );
  }

  render() {
    return (
      <div id="placesContainer">
        <h3>Nearby Amenities</h3>
        <ul className="AmenetiesList">
          { this.props.activeGyms.length && this.renderList() }
        </ul>
      </div>
    ); 
  }
}


let mapStateToProps = (state) => ({
  activeJob: state.activeJob, 
  activeParks: state.activeParks,
  activeGyms: state.activeGyms
});

export default connect(mapStateToProps)(AmenetiesList);
