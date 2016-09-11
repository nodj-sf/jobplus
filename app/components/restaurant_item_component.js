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

  // Class methods for control of the Yelp Modal visibility:
  toggleYelpModal() {
    return this.props.toggleYelpModal(this.props.restaurant.id);
  }

  render() {
    const [jobLat, jobLng] = [this.props.selectedJob.latitude, this.props.selectedJob.longitude],
          restaurant = this.props.restaurant,
          address = restaurant.display_address,
          restAddress = [address[1], address[0], ...address.slice(2)],
          [restLat, restLng] = [restaurant.coordinate.latitude, restaurant.coordinate.longitude],
          [starRatingImage, phoneNo, yelpURL] = [restaurant.rating_img_url, restaurant.phone, restaurant.url],
          restaurantDistance = this.getDistanceFromLatLonInKm(jobLat, jobLng, restLat, restLng),
          GMapsDirectionsURL = `https://www.google.com/maps/dir/${jobLat},${jobLng}/${address[0].concat(address[2]).split(' ').join('+')}/`;

    return (
      <li className='restaurantLI one-third' >
        <div className='verticallyCenter'>
          <div className='nameRating'>
            <a href={ restaurant.url } target='_blank'>
              <h5 className='textEllipsis expandFromCenter'>{ this.parseAndFormatJobTitle(restaurant.name) }</h5>
            </a>
            {
              (restaurant.photo) ?
                <div className='yelpPhoto textEllipsis' data-magnify='&#x1f50d'>
                  <img 
                    src={ this.parseYelpRestaurantPhoto(restaurant.photo).originalFileSize } 
                    alt={ `Yelp user review rating: ${ restaurant.rating } star(s)` } />
                  <div className='yelpAlphaLayer'>
                    <img 
                      src='http://goo.gl/UCXx0a' 
                      alt='Magnifying glass image-expansion action glyph icon (White).'
                      onClick={ () => this.toggleYelpModal() } />
                
                      <RestaurantModal 
                        yelpID={ this.props.restaurant.id }
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
                    src='http://goo.gl/PFTnu8' 
                    className='fallbackImage' 
                    alt='Fallback Yelp restaurant placeholder graphic (Red).' />
                </div>
            }
          </div>
          <div className='yelpDescription card-body'>
            <div className='YelpRating_Div'>
              <img className='YelpRatingStars' src={ restaurant.rating_img_url } alt='Yelp restaurant photo.' /> 
              <p className='numRestaurantReviews'>{ `${this.props.restaurant.review_count} Reviews` }</p>
            </div>

            <div className='YelpRestaurantAddress'>
              {
                restAddress.map((addressComponent, index) => 
                  <p key={ `${restaurant.name}_AddressLine${index}` }>{ addressComponent }</p>
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
                <i className='fa fa-phone-square' key={ `TelNo_${phoneNo}` }></i>,
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

// <div className='yelpPhoto textEllipsis' data-magnify='🔍'>

// <div className='YelpRestaurantAddress'>
//   {[
//     <p key={ `${restaurant.name}_AddressLine1` }>{ restaurant.display_address[1] }</p>, 
//     <p key={ `${restaurant.name}_AddressLine2` }>{ restaurant.display_address[0] }</p>
//   ]}
// </div>
