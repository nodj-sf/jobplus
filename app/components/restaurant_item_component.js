import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BaseComponent from './base_component';
import RestaurantModal from './restaurant_modal_component';
import { toggleYelpModal } from '../actions/index';


class RestaurantListItem extends BaseComponent {
  constructor(props) {
    super(props);
    this.toggleYelpModal = this.toggleYelpModal.bind(this);
  }

  // Class method controls visibility of the Yelp Modal respective of `restaurant.id`:
  toggleYelpModal() {
    return this.props.toggleYelpModal(this.props.restaurantListItem.id);
  }

  render() {
    const restaurant = this.props.restaurantListItem,
          restaurantCoords = { lat: restaurant.coordinate.latitude, lng: restaurant.coordinate.longitude },
          jobCoords = { lat: this.props.selectedJob.latitude, lng: this.props.selectedJob.longitude },
          restaurantAddress = this.parseAndFormatYelpRestaurantAddress(restaurant.display_address),
          restaurantDistance = this.getDistanceFromLatLngInKm(jobCoords, restaurantCoords),
          phoneNo = restaurant.phone,
          GMapsDirectionsURL = this.getGoogleMapsDirectionsURL(restaurantAddress, jobCoords, 'Yelp API');

    return (
      <li className='restaurantLI one-third' >
        <div className='nameRating'>
          <a href={ restaurant.url } target='_blank'>
            <h5 className='textEllipsis expandFromCenter'>
              { this.parseAndFormatJobTitle(restaurant.name) }
            </h5>
          </a>
          {
            (restaurant.photo) ?
              <div className='yelpPhoto textEllipsis' data-magnify='&#x1f50d'>
                <img 
                  src={ this.parseYelpRestaurantPhoto(restaurant.photo).originalFileSize } 
                  alt={ `Yelp user review rating: ${ restaurant.rating } star(s)` } />
                <div className='yelpAlphaLayer'>
                  <img 
                    src='http://goo.gl/r1ypJW'
                    className='cursorAction'
                    alt='Magnifying glass image-expansion action glyph icon (White).'
                    onClick={ () => this.toggleYelpModal() } />
              
                    <RestaurantModal 
                      yelpID={ this.props.restaurantListItem.id }
                      yelpRestaurant={ restaurant }
                      yelpRestaurantName={ this.parseAndFormatJobTitle(restaurant.name) }
                      yelpPhoto={ this.parseYelpRestaurantPhoto(restaurant.photo) }
                      yelpDescription={ `Yelp user review rating: ${ restaurant.rating } star(s)` }
                      deactivateYelpModal={ this.toggleYelpModal } />
                </div>
              </div> :
              // No Image
              <div className='yelpPhoto textEllipsis'>
                <img 
                  src='http://goo.gl/vkE0vf' 
                  className='fallbackImage' 
                  alt='Fallback Yelp restaurant placeholder graphic (Red).' />
              </div>
          }
        </div>
        <div className='yelpDescription card-body'>
          <div className='YelpRating_Div'>
            <img 
              className='YelpRatingStars' 
              src={ restaurant.rating_img_url } 
              alt='Yelp restaurant photo.' /> 
            <p className='numRestaurantReviews'>
              { `${this.props.restaurantListItem.review_count} Reviews` }
            </p>
          </div>

          <div className='YelpRestaurantAddress'>
            {
              Array.from(
                Object.keys(restaurantAddress),
                (key, val) => restaurantAddress[key]
              ).map((addressComponent, index) => 
                <p key={ `${restaurant.name}_AddressLine${index}` }>
                  { addressComponent }
                </p>
              )
            }
          </div>

          <div>
            <div className='amenityDistanceInMiles'>
              {[
                <i className='fa fa-map' key={ `Distance_${restaurantDistance}` }></i>,
                `\t`,
                <a 
                  href={ GMapsDirectionsURL } 
                  className='YelpPhoneNo expandFromCenter' 
                  target='_blank' 
                  key={ `GMapURL_${GMapsDirectionsURL}` }>

                  <em 
                    key={`RestaurantDist_${restaurantDistance}`} 
                    style={{ color: this.distanceColor(restaurantDistance) }}>
                    { `${restaurantDistance} mi` }
                  </em>
                </a>
              ]}
            </div>
            { this.getDistanceBlocks(restaurantDistance) }
          </div>

          <p style={{ clear: 'both' }}>
            {[
              <i 
                className='fa fa-phone-square' 
                key={ `TelNo_${phoneNo}` }>
              </i>,
              `\t`,
              <a 
                href={ `tel:+1${phoneNo}` } 
                className='YelpPhoneNo expandFromCenter' 
                target='_blank' 
                key={ `PhoneNo_${phoneNo}` }>
                { this.parsePhoneNumber(phoneNo) }
              </a>
            ]}
          </p>
        </div>
      </li>
    );
  }
};

let mapStateToProps = (state) => ({
  yelpModalState: state.toggleYelpModal
});

let mapDispatchToProps = (dispatch) => bindActionCreators({
  toggleYelpModal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantListItem);
