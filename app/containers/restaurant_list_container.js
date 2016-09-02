import React, { Component } from 'react';
import { connect } from 'react-redux';

import RestaurantItem from '../components/restaurant_item_component';


class RetaurantList extends Component {
  renderList() {
    let selectedJob = this.props.activeJob,
        chunkedArr = [];   

    return this.props.activeYelp.map((restaurant) => {
      return (
        <RestaurantItem
          key = { restaurant.id }
          restaurant = { restaurant }
          selectedJob = { selectedJob } />
      );
    });
  }

  render() {
    return (
      (this.props.loading) ?
      <div className="restaurantContainer">
        <i className="fa fa-refresh fa-spin fa-5x fa-fw loadingSpinner"></i>Loading...
      </div> :
      <div className="restaurantContainer">
        <div>
          <img src="http://goo.gl/pExEEr" className="AmenitiesHeader_Img" alt="Yelp restaurant amenity fork & knife glyph icon (Yelp Red)." />
          <h5>Nearby Eats</h5>
        </div>
        <div className="overlay overlayBottomMargin">
          <ul className="restaurantList container">
            { this.renderList() }
          </ul>
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
