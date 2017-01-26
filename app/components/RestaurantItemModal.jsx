'use strict';
import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import yelpRestaurantModalStyles from '../constants/json/yelp_restaurant_modal_styles.json';


class RestaurantModal extends Component {
  constructor(props) {
    super(props);
    this.getRestaurantIndex = this.getRestaurantIndex.bind(this);
    this.viewNextPhoto = this.viewNextPhoto.bind(this);
  }

  getRestaurantIndex(restaurant) {
    let restaurantID = restaurant.replace(/Yelp_Modal_/, '');
    return this.props.yelpListings.findIndex(obj => obj.id === restaurantID);
  }

  viewNextPhoto() {
    this.props.deactivateYelpModal();

  }

  render() {
    return (
      <Modal
        isOpen={ this.props.yelpModalState[`Yelp_Modal_${this.props.yelpID}`] }
        style={ yelpRestaurantModalStyles }
        contentLabel='Yelp Restaurant Modal Component' >
        <i
          className='fa fa-times-circle XButton'
          onClick={ () => this.props.deactivateYelpModal() }>
        </i>
        <div className='yelpModalContainer'>
          <div className='yelpRestaurantTitleBar'>
            <a
              href={ this.props.yelpRestaurantURL }
              target='_blank'
              className='expandFromCenter'>
              { this.props.yelpRestaurantName }
            </a>
          </div>
          <div className='navigation-arrows-wrapper'>
            <i
              className='navigation-arrow-icon'
              onClick={ () => this.viewNextPhoto() }>
            </i>
            <i
              className='navigation-arrow-icon'
              onClick={ () => this.viewNextPhoto() }>
            </i>
          </div>
          <img
            className='featuredImg'
            src={ this.props.yelpPhoto.originalFileSize }
            alt={ this.props.yelpDescription } />
          <div className='modalToolbar'>
            <a
              href={ this.props.yelpPhoto.yelpLightboxURL(this.props.yelpID) }
              target='_blank'>
              View On Yelp
            </a>
            <a
              href={ this.props.yelpPhoto.originalFileSize }
              download={ `${this.props.yelpID}_Yelp_Photo` }>
              Download
            </a>
          </div>
        </div>
      </Modal>
    );
  }

};

let mapStateToProps = (state) => ({
  yelpModalState: state.toggleYelpModal,
  yelpListings: state.activeYelp
});

export default connect(mapStateToProps)(RestaurantModal);


// &lt;
// &gt;
