import React, { Component } from 'react';

class RestaurantListItem extends Component {
  render() {
    console.log('this.props.restaurant: ', this.props.restaurant);
    var starRatingImage = this.props.restaurant.rating_img_url;
    console.log('starRatingImage: ', starRatingImage);
    return (
      <li className="restaurantLI" style={{"list-style-type": "none"}} >
        <div className="nameRating">
          <a style={{"textDecoration": "none"}} target="_blank" href={ this.props.restaurant.url }>{ this.props.restaurant.name }</a>
          <img src={ this.props.restaurant.rating_img_url } /> { this.props.restaurant.review_count } reviews
        </div>
        <div className="yelpDesctiption">
          <p>{ this.props.restaurant.display_address[1] } </p>
          <p>{ this.props.restaurant.display_address[0] } </p>
          <p>{ this.props.restaurant.display_address[2] } </p>
          <p>{ this.props.restaurant.phone.replace(/^(\d{3})(\d{4})(\d{3})/, "+1 ($1) $2-$3") } </p>
        </div>
      </li>
    );
  }
}

export default RestaurantListItem;

