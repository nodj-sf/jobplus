import React, { Component } from 'react';

import RestaurantItem from '../components/retaurant_item_component';

var dummyData = [{
  id: '123456789',
  name: 'pseudoRestaurant',
  url: 'www.pesudo.com',
  rating: 5,
  review_count: 999,
  phone: 123-456-7891,
  coordinate: null
}, {
  id: '123456789',
  name: 'pseudoRestaurant',
  url: 'www.pesudo.com',
  rating: 5,
  review_count: 999,
  phone: 123-456-7891,
  coordinate: null
}, {
  id: '123456789',
  name: 'pseudoRestaurant',
  url: 'www.pesudo.com',
  rating: 5,
  review_count: 999,
  phone: 123-456-7891,
  coordinate: null
}];

class RetaurantList extends Component {
  constructor(props) {
    super(props);

    this.state = {restaurant: dummyData};
  }
  //renderList
  renderList() {
    return this.state.restaurant.map(function(restaurant) {
      return (
        <RestaurantItem />
      );
    });
  }

  render() {
    return (
      <div id="restaurantContainer">
        <h1>Restaurant List Container</h1>
        <ul className="restaurantList">
          
        </ul>
      </div>
    ); 
  }
}

export default RetaurantList;