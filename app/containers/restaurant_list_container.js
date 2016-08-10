import React, { Component } from 'react';
import { connect } from 'react-redux';

import RestaurantItem from '../components/restaurant_item_component';

class RetaurantList extends Component {
  renderList() {
    return this.props.activeYelp.map((restaurant) => {
      return (
        <RestaurantItem
          key = { restaurant.id }
          restaurant = { restaurant }
        />
        );
    });
  }

  render() {
    return (
      <div id="restaurantContainer">
        <h1>Restaurant List Container</h1>
        <ul className="restaurantList">
          { this.renderList() }
        </ul>
      </div>
    ); 
  }
}

function mapStateToProps(state) {
  return {
    activeYelp: state.activeYelp
  };
}

export default connect(mapStateToProps)(RetaurantList);