import React, { Component } from 'react';
import { connect } from 'react-redux';
import Subheader from 'material-ui/Subheader';

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
      <div className="col-xs-12 text-center">
        <i className="fa fa-cog fa-spin fa-2x fa-fw"></i> <span>Loading...</span>
      </div> :
      <div>
        <div>
          <Subheader style={{color: '#52B3D9'}} className="text-center"><i className="fa fa-yelp" aria-hidden="true" alt="Yelp corporate logo (black glyph icon)"></i> Nearby Eats</Subheader>
        </div>
        <div className="col-xs-12 mobilePaddingLeftRight0">
          <ul className="col-xs-12 mobilePaddingLeftRight0" style={{listStyle: 'none'}}>{ this.renderList() }</ul>
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
