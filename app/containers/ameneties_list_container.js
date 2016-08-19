import React, { Component } from 'react';
import { connect } from 'react-redux';
import BaseComponent from '../components/base_component';


class AmenetiesList extends BaseComponent {
  renderList(list, job) {
    let newList = list.slice(0, 3);
    return newList.map((place, i) => {
      return (
        <div key = {i}>
          <li className="placesLI" 
              key={place.place_id} >
            <p>{place.name } <i>{ this.getDistanceFromLatLonInKm(job.latitude,job.longitude,place.geometry.location.lat, place.geometry.location.lng ) }</i></p>
          </li>
        </div>
      );    
    });
  }

  render() {
    let props = this.props;
    let parksList = props.activeParks;
    let gymsList = props.activeGyms;
    let job = props.activeJob;
    return ((this.props.loading)
      ? <div id="placesContainer">
          <i className="fa fa-cog fa-spin fa-5x fa-fw"></i> Loading...
        </div>
      : <div id="placesContainer">
         <h5>Parks</h5> 
         <ul className='trainList'>{(parksList.length && this.renderList(parksList, job)) 
          || 'There are no results for this area'}</ul> 
         <h5>Gyms & Fitness</h5> 
         <ul className='busList'>{gymsList.length && this.renderList(gymsList, job) 
          || 'There are no results for this area' }</ul>
        </div>
    ); 
  }
}

let mapStateToProps = (state) => ({
  activeJob: state.activeJob,
  activeParks: state.activeParks,
  activeGyms: state.activeGyms,
  loading: state.loading
});

export default connect(mapStateToProps)(AmenetiesList);
