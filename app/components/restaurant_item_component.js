import React, { Component } from 'react';

import BaseComponent from './base_component';


export default class RestaurantListItem extends BaseComponent {
  
  render() {
    const job = this.props.selectedJob,
          [jobLat, jobLng] = [job.latitude, job.longitude],
          restaurant = this.props.restaurant,
          [restLat, restLng] = [restaurant.coordinate.latitude, restaurant.coordinate.longitude],
          [starRatingImage, phoneNo, yelpURL] = [restaurant.rating_img_url, restaurant.phone, restaurant.url],
          restaurantDistance = this.getDistanceFromLatLonInKm(jobLat, jobLng, restLat, restLng),
          GMapsDirectionsURL = `https://www.google.com/maps/dir/${jobLat},${jobLng}/${restaurant.display_address[0].concat(restaurant.display_address[2]).split(' ').join('+')}/`;

    return (
      <li className='restaurantLI one-third' >
        <div className="verticallyCenter">
          <div className="nameRating">
            <a href={ restaurant.url } target="_blank">
              <h5 className="textEllipsis expandFromCenter">{ this.parseAndFormatJobTitle(restaurant.name) }</h5>
              <div className="yelpPhoto textEllipsis">
                <img src={ this.parseYelpRestaurantPhoto(restaurant.photo) } alt="Yelp restaurant star rating." />
              </div>
            </a>
          </div>
          <div className="yelpDescription card-body">
            <div className="YelpRating_Div">
              <img className="YelpRatingStars" src={ restaurant.rating_img_url } alt="Yelp restaurant photo." /> 
              <p className="numRestaurantReviews">{`${this.props.restaurant.review_count} Reviews`}</p>
            </div>

            <div className="YelpRestaurantAddress">
              {[<p key={`${restaurant.name}_AddressLine1`}>{restaurant.display_address[1]}</p>, 
                <p key={`${restaurant.name}_AddressLine2`}>{restaurant.display_address[0]}</p>
              ]}
            </div>

            <div>
              <div className="amenityDistanceInMiles">
                {[
                  <i className="fa fa-map" style={{ "color": "#14A4B5" }} key={`Distance_${restaurantDistance}`}></i>,
                  `\t`,
                  <a href={GMapsDirectionsURL} className="YelpPhoneNo expandFromCenter" target="_blank" key={`GMapURL_${GMapsDirectionsURL}`}>
                    <em key={`RestaurantDist_${restaurantDistance}`} style={{ "color": this.distanceColor(restaurantDistance) }}>{`${restaurantDistance} mi`}</em>
                  </a>
                ]}
              </div>
              { this.getDistanceBlocks(restaurantDistance) }
            </div>

            <p style={{ "clear": "both" }}>
              {[<i className="fa fa-phone-square" style={{ "color": "#14A4B5" }} key={`TelNo_${phoneNo}`}></i>,
                `\t`,
                <a href={`tel:+1${phoneNo}`} className="YelpPhoneNo expandFromCenter" target="_blank" key={`PhoneNo_${phoneNo}`}>{this.parsePhoneNumber(phoneNo)}</a>
              ]}
            </p>
          </div>
        </div>
      </li>
    );
  }
};
