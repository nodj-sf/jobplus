import React, { Component } from 'react';
import { connect } from 'react-redux';
import BaseComponent from '../components/base_component';


class TransportationList extends BaseComponent {

  customList(trains, bus) {
    let topResults = [trains[0], bus[0]];
    return topResults;
  }

  renderList() {
    let props = this.props;
    let newList = this.customList(props.activeTrains, props.activeBus);
    return (
      <div>
        <li className="placesLI" 
            style={{"listStyleType": "none"}}
            key={newList[0].place_id} >
          <h5>Train Stop</h5>  
          <p>{ newList[0].name } { this.getDistanceFromLatLonInKm(props.activeJob.latitude,props.activeJob.longitude,newList[0].geometry.location.lat, newList[0].geometry.location.lng ) }</p>
        </li>
        <li className="placesLI" 
            style={{"listStyleType": "none"}}
            key={newList[1].place_id} >
          <h5>Bus Stop</h5>  
          <p>{ newList[1].name } { this.getDistanceFromLatLonInKm(props.activeJob.latitude,props.activeJob.longitude,newList[1].geometry.location.lat, newList[1].geometry.location.lng ) }</p>
        </li>
      </div>
    );
  }

  render() {
    return (
      <div id="placesContainer">
        <h4>Nearby Amenities</h4>
        <ul className="TransportationList">
          { this.props.activeBus.length && this.renderList() }
        </ul>
      </div>
    ); 
  }
}


let mapStateToProps = (state) => ({
  activeJob: state.activeJob, 
  activeTrains: state.activeTrains,
  activeBus: state.activeBus,
});

export default connect(mapStateToProps)(TransportationList);
