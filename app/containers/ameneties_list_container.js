import React, { Component } from 'react';
import { connect } from 'react-redux';
import BaseComponent from '../components/base_component';


class AmenetiesList extends BaseComponent {
  renderList(list, job) {
    let newList = list.slice(0, 3);
    return newList.map((place, i) => {
      let img = '';

      if (place.photos) {
        img = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=' + place.photos[0].photo_reference + '&key=AIzaSyCbO9G9Z4TzOZlXfPFiV7ZAThWm6RQClqo';
      }
      
      return (
        <div className="amenetiesCard" key = {i}>
          <div className="amenetiesContent">
            <li className="placesLI" key={place.place_id} >
              <p>
                <p>{ place.name }</p>
                <a href={`http://maps.google.com/?q=${place.geometry.location.lat},${place.geometry.location.lng}`} title={ place.name } target="_blank">
                  { (place.photos) ? <img src={ img } alt={ place.name } /> : 'no image' } <br /> 
                  { place.rating } <br />
                  <i>{ this.getDistanceFromLatLonInKm(job.latitude,job.longitude,place.geometry.location.lat, place.geometry.location.lng ) }</i>
                </a>
              </p>
            </li>
          </div> 
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
