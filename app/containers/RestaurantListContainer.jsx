'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RestaurantItem from '../components/RestaurantItem';
import BaseComponent from '../components/BaseComponent';
import { toggleGooglePlacesListContainer } from '../actions/index';


class RetaurantList extends BaseComponent {
  constructor(props) {
    super(props);
    this.toggleListContainer = this.toggleListContainer.bind(this);
    this.assignClassNames = this.assignClassNames.bind(this);
  }

  // Class method calls Redux action on list of type 'Restaurant':
  toggleListContainer() {
    return this.props.toggleGooglePlacesListContainer('Restaurant');
  }

  // Class method returns CSS classes respective of the Redux store's key-value for the key
  //  specified by the passed-down `listType` prop:
  assignClassNames() {
    if (this.props.toggleContainerDisplay['list_container_Restaurant']) {
      return 'inactive';
    }
  }

  renderList(restaurantList) {
    return restaurantList.map((restaurantItem, index, restaurantList) =>
      <RestaurantItem
        restaurantListItem={ restaurantItem }
        listType='Restaurant'
        key={ restaurantItem.id }
        selectedJob={ this.props.activeJob } />
    );
  }

  render() {
    console.log(this.props.activeJob);
    return (
      (this.props.loading) ?
        <div className='restaurantContainer' style={{ minHeight: '200px' }}>
          {[
            <i
              className='fa fa-refresh fa-spin fa-5x fa-fw loadingSpinner'
              key='RefreshLoaderAnimation'>
            </i>,
            `\tLoading...`
          ]}
        </div> :
        <div className='restaurantContainer'>
          <div>
            <i
              className='collapseGlyph fa fa-reorder'
              onClick={ () => this.toggleListContainer() }>
            </i>
            <img
              src='http://goo.gl/pExEEr'
              className='AmenitiesHeader_Img'
              alt='Yelp restaurant amenity fork & knife glyph icon (Yelp Red).' />
            <h5>Nearby Eats</h5>
          </div>
          <div className='overlay overlayBottomMargin'>
            <ul className={ `restaurantList container ${this.assignClassNames()}` }>
              { this.renderList(this.props.activeYelp) }
            </ul>
          </div>
        </div>
    );
  }
};

let mapStateToProps = (state) => ({
  activeJob: state.activeJob,
  activeYelp: state.activeYelp,
  toggleContainerDisplay: state.toggleContainerDisplay,
  loading: state.loading
});

let mapDispatchToProps = (dispatch) => bindActionCreators({
  toggleGooglePlacesListContainer
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RetaurantList);


// <h5>
//   <a href='https://www.yelp.com' target='_blank'>
//     <i className='fa fa-yelp' aria-hidden='true' alt='Yelp corporate logo (black glyph icon)'></i>
//   </a> Nearby Eats
// </h5>
