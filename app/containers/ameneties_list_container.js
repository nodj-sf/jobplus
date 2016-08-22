import React, { Component } from 'react';
import { connect } from 'react-redux';

import BaseComponent from '../components/base_component';


class AmenetiesList extends BaseComponent {
  renderList(list, job) {
    let newList = list.slice(0, 3);

    return newList.map((place, i) => {
      let img = '';

      if (place.photos) {
        img = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=${place.photos[0].photo_reference}&key=AIzaSyC56PLIo323RpHzaKe-ZunaS_0Tn5DgyGY`;
      }
      
      return (
        <li className="restaurantLI one-third" key = {i} >
          <a target="_blank" href={ `http://maps.google.com/?q=${place.geometry.location.lat},${place.geometry.location.lng}` } >
            <div className="verticallyCenter">
              <div className="nameRating">
                <h5 className="textEllipsis expandFromCenter">{ place.name }</h5>
                { 
                  (place.photos) ? 
                  <img className="yelpPhoto" src={ img } alt={ place.name } /> : 
                  'No Image' 
                }
              </div>
              <div className="yelpDescription card-body">
                <p className="numRestaurantReviews">{ place.rating }</p>
                <i>{ this.getDistanceFromLatLonInKm(job.latitude,job.longitude,place.geometry.location.lat, place.geometry.location.lng ) }</i>
              </div>
            </div>
          </a>
        </li>
      );    
    });
  }

  render() {
    let props = this.props;
    let parksList = props.activeParks;
    let gymsList = props.activeGyms;
    let job = props.activeJob;
    
    return (
      (this.props.loading) ?
      <div className="restaurantContainer">
        <i className="fa fa-refresh fa-spin fa-5x fa-fw"></i> Loading...
      </div> :
      <div>
        <div className="restaurantContainer">
          <h5>
            {[<i className="fa fa-futbol-o" aria-hidden="true"></i>,
              `\tParks`
            ]}
          </h5> 
          <div className="overlay">
            <ul className='trainList container'>{(parksList.length && this.renderList(parksList, job)) 
              || 'There are no results for this area'}
            </ul> 
          </div>
        </div>
        <div className="restaurantContainer">
          <h5>Gyms & Fitness</h5>
          <div className="overlay">
            <ul className='busList container'>{gymsList.length && this.renderList(gymsList, job) 
              || 'There are no results for this area' }
            </ul>
          </div>
        </div>
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
