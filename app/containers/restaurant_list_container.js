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
        <div>
          <h1>Nearby Eats</h1>
          <img src="../img/Yelp_logo-black.svg" alt="Yelp corporate logo (black glyph icon)" />
        </div>
        <ul className="restaurantList">
          { this.renderList() }
        </ul>
      </div>
    ); 
  }
}

let mapStateToProps = (state) => ({ activeYelp: state.activeYelp });

export default connect(mapStateToProps)(RetaurantList);
