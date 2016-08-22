import React, { Component } from 'react';

import BaseComponent from './base_component';


export default class RestaurantListItem extends BaseComponent {
  
  render() {
    const job = this.props.selectedJob,
          [jobLat, jobLng] = [job.latitude, job.longitude],
          restaurant = this.props.restaurant,
          [restLat, restLng] = [restaurant.coordinate.latitude, restaurant.coordinate.longitude],
          [starRatingImage, phoneNo, yelpURL] = [restaurant.rating_img_url, restaurant.phone, restaurant.url],
          restaurantDistance = this.getDistanceFromLatLonInKm(restLat, restLng, jobLat, jobLng),
          GMapsDirectionsURL = `https://www.google.com/maps/dir/${jobLat},${jobLng}/${restaurant.display_address[0].concat(restaurant.display_address[2]).split(' ').join('+')}/`;

    let distanceColor = restaurantDistance <= 1.0 ?
      "#25DC25" : restaurantDistance <= 2.0 ?
      "#E0E108" : restaurantDistance <= 3.0 ?
      "#E17E08" :
      "#FD0505";

    return (
      <li className="restaurantLI one-third" >
        <div className="verticallyCenter">
          <div className="nameRating">
            <a href={ restaurant.url } target="_blank">
              <h5 className="textEllipsis">{ restaurant.name }</h5>
              <img className="yelpPhoto" src={this.parseYelpRestaurantPhoto(restaurant.photo)} alt="Yelp restaurant star rating." />
            </a>
          </div>
          <div className="yelpDescription card-body">
            <div className="YelpRating_Div">
              <img className="YelpRatingStars" src={ restaurant.rating_img_url } alt="Yelp restaurant photo." /> 
              <p className="numRestaurantReviews">{`${this.props.restaurant.review_count} Reviews`}</p>
            </div>

            <p className="YelpRestaurantAddress">{ restaurant.display_address[1] }</p>
            <p className="YelpRestaurantAddress">{ restaurant.display_address[0] }</p>

            <p>
              {[<i className="fa fa-map" style={{ "color": "#14A4B5" }} key={`Distance:${restaurantDistance}`}></i>,
                `\t`,
                <a href={GMapsDirectionsURL} className="YelpPhoneNo" target="_blank" key={`GMapURL:${GMapsDirectionsURL}`}>
                  <em key={"Restaurant_Dist"} style={{ "color": distanceColor }}>{`${restaurantDistance} mi`}</em>
                </a>
              ]}
            </p>
            <p>
              {[<i className="fa fa-phone-square" style={{ "color": "#14A4B5" }} key={`TelNo:${phoneNo}`}></i>,
                `\t`,
                <a href={`tel:+1${phoneNo}`} className="YelpPhoneNo" target="_blank" key={`PhoneNo:${phoneNo}`}>{this.parsePhoneNumber(phoneNo)}</a>
              ]}
            </p>
          </div>
        </div>
      </li>
    );
  }
};
