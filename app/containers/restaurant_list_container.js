import React, { Component } from 'react';
import { connect } from 'react-redux';

import RestaurantItem from '../components/restaurant_item_component';
import BaseComponent from '../components/base_component';


class RetaurantList extends BaseComponent {
  renderList() {
    return this.props.activeYelp.map((restaurant, index) =>
      <RestaurantItem
        key={ restaurant.id }
        restaurant={ restaurant }
        selectedJob={ this.props.activeJob } />
    );
  }

  render() {
    return (
      (this.props.loading) ?
        <div className='restaurantContainer' style={{ minHeight: '200px' }}>
          {[
            <i className='fa fa-refresh fa-spin fa-5x fa-fw loadingSpinner' key='RefreshLoaderAnimation'></i>,
            `\tLoading...`
          ]}
        </div> :
        <div className='restaurantContainer'>
          <div>
            <img src='http://goo.gl/pExEEr' className='AmenitiesHeader_Img' alt='Yelp restaurant amenity fork & knife glyph icon (Yelp Red).' />
            <h5>Nearby Eats</h5>
          </div>
          <div className='overlay overlayBottomMargin'>
            <ul className='restaurantList container'>{ this.renderList() }</ul>
          </div>
        </div>
    ); 
  }
}

let mapStateToProps = (state) => ({
  activeJob: state.activeJob, 
  activeYelp: state.activeYelp,
  loading: state.loading
});

export default connect(mapStateToProps)(RetaurantList);


// <h5>
//   <a href="https://www.yelp.com" target="_blank">
//     <i className="fa fa-yelp" aria-hidden="true" alt="Yelp corporate logo (black glyph icon)"></i>
//   </a> Nearby Eats
// </h5>
