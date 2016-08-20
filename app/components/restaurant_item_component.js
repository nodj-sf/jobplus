import React, { Component } from 'react';

import BaseComponent from './base_component';


class RestaurantListItem extends BaseComponent {
  
  render() {
    let restaurant = this.props.restaurant;
    let starRatingImage = restaurant.rating_img_url;
    let job = this.props.selectedJob;
    
    return (
      <li className="restaurantLI one-third" >
        <a target="_blank" href={ restaurant.url }>
          <div className="verticallyCenter">
            <div className="nameRating">
              <h5>{ restaurant.name }</h5>
              <img className="yelpPhoto" src={restaurant.photo.replace(/ms(\.jpg)$/i, "l$1")} />
              <img className="yelp-rating" src={ restaurant.rating_img_url } /> 
            </div>
            <div className="yelpDescription card-body">
              <p className="numRestaurantReviews">{`${this.props.restaurant.review_count} Reviews`}</p>
              <p>{ restaurant.display_address[1] } <em>{ this.getDistanceFromLatLonInKm(restaurant.coordinate.latitude,restaurant.coordinate.longitude,job.latitude,job.longitude) }</em></p>
              <p>{ restaurant.display_address[0] } </p>
              <p>{ this.parsePhoneNumber(this.props.restaurant.phone) }</p>
            </div>
          </div>
        </a>
      </li>
    );
  }
}

export default RestaurantListItem;

