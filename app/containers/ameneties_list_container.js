import React, { Component } from 'react';
import { connect } from 'react-redux';
import BaseComponent from '../components/base_component';


class AmenetiesList extends BaseComponent {
  renderList(list, job) {
    let newList = list.slice(0, 3);
    return newList.map((place) => {
      return (
        <div>
          <li className="placesLI" 
              key={place.place_id} >
            <p>{place.name } <i>{ this.getDistanceFromLatLonInKm(job.latitude,job.longitude,place.geometry.location.lat, place.geometry.location.lng ) }</i></p>
          </li>
        </div>
      );    
    });
  }

  render() {
    let parksList = this.props.activeParks;
    let gymsList = this.props.activeGyms;
    let job = this.props.activeJob;
    return (
      <div id="placesContainer">
       <h5>Parks</h5> 
       <ul className='trainList'>{parksList.length && this.renderList(parksList, job)}</ul> 
       <h5>Gyms & Fitness</h5> 
       <ul className='busList'>{gymsList.length && this.renderList(gymsList, job)}</ul>
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
