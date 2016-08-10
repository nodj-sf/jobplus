import React, { Component } from 'react';

class RestaurantListItem extends Component {
  render() {
    return (
      <li className="restaurantLI">
        <h1>{ this.props.restaurant.name }</h1>
      </li>
    );
  }
}

export default RestaurantListItem;

