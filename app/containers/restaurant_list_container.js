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
          <a href="https://www.yelp.com" target="_blank">
            <img src="../img/Yelp_logo-black.svg" alt="Yelp corporate logo (black glyph icon)" />
          </a>
          <h1>Nearby Eats</h1>
        </div>
        <div className="overlay">
          <ul className="restaurantList">
            { this.renderList() }
          </ul>
        </div>
      </div>
    ); 
  }
}

let mapStateToProps = (state) => ({ activeYelp: state.activeYelp });

export default connect(mapStateToProps)(RetaurantList);
