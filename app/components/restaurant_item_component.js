import React, { Component } from 'react';

import BaseComponent from './base_component';


class RestaurantListItem extends BaseComponent {
  
  render() {
    let restaurant = this.props.restaurant;
    let starRatingImage = restaurant.rating_img_url;
    let job = this.props.selectedJob;
    
    return (
      <li className="restaurantLI" >
        <div className="verticallyCenter">
          <div className="nameRating">
            <a target="_blank" href={ restaurant.url }>{ restaurant.name }</a>
            <img src={ restaurant.rating_img_url } /> 
            <p className="numRestaurantReviews">{`${this.props.restaurant.review_count} Reviews`}</p>
          </div>
          <div className="yelpDescription">
            <p>{ restaurant.display_address[1] } <i>{ this.getDistanceFromLatLonInKm(restaurant.coordinate.latitude,restaurant.coordinate.longitude,job.latitude,job.longitude) }</i></p>
            <p>{ restaurant.display_address[0] } </p>
            <p>{ restaurant.display_address[2] } </p>
            <p>{ this.parsePhoneNumber(this.props.restaurant.phone) }</p>
          </div>
        </div>
      </li>
    );
  }
}

export default RestaurantListItem;

