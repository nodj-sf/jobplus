import React, { Component } from 'react';

class RestaurantListItem extends BaseComponent {

  render() {
    var starRatingImage = this.props.restaurant.rating_img_url;
    return (
      <li className="restaurantLI" >
        <div className="verticallyCenter">
          <div className="nameRating">
            <a target="_blank" href={ this.props.restaurant.url }>{ this.props.restaurant.name }</a>
            <img src={ this.props.restaurant.rating_img_url } /> 
            <p className="numRestaurantReviews">{`${this.props.restaurant.review_count} Reviews`}</p>
          </div>
          <div className="yelpDescription">
            <p>{ this.props.restaurant.display_address[1] } </p>
            <p>{ this.props.restaurant.display_address[0] } </p>
            <p>{ this.props.restaurant.display_address[2] } </p>
            <p>{ this.parsePhoneNumber(this.props.restaurant.phone) }</p>
          </div>
        </div>
      </li>
    );
  }
}

export default RestaurantListItem;

