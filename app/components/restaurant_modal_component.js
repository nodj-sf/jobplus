import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';

import yelpRestaurantModalStyles from '../constants/yelp_restaurant_modal_styles.json';


class RestaurantModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        isOpen={ this.props.yelpModalState[`Yelp_Modal_${this.props.yelpID}`] }
        style={ yelpRestaurantModalStyles } >

        <div className='yelpModalContainer'>
          <div className='yelpRestaurantTitleBar'>
            <a href={ this.props.yelpRestaurantURL } target='_blank'>{ this.props.yelpRestaurantName }</a>
          </div>
          <img className='featuredImg' src={ this.props.yelpPhoto.originalFileSize } alt={ this.props.yelpDescription } />
          <div className='modalToolbar'>
            <a href={ this.props.yelpPhoto.yelpLightboxURL(this.props.yelpID) } target='_blank'>View On Yelp</a>
            <a href={ this.props.yelpPhoto.originalFileSize } download={ this.props.yelpID + '_Yelp_Photo' }>Download</a>
          </div>
        </div>
        <i className='fa fa-times-circle XButton' onClick={ () => this.props.deactivateYelpModal() }></i>
      </Modal>

    );
  }

};

let mapStateToProps = (state) => ({
  yelpModalState: state.toggleYelpModal
});

export default connect(mapStateToProps)(RestaurantModal);


