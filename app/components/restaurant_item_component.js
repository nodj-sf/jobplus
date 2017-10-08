import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';

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


    const restaurantName = restaurant.name;
    const restaurantImage = this.parseYelpRestaurantPhoto(restaurant.photo);
    const restaurantRatingImage = restaurant.rating_img_url;
    const restaurantReviewCount = <Subheader style={{padding: 0}}>{this.props.restaurant.review_count + ' reviews'}</Subheader>;
    const restaurantAddressDisplay = <p className="YelpRestaurantAddress">{  restaurant.display_address[0]+ '(' + restaurant.display_address[1] +')' }</p>;
    const restaurantDescriptiveReview = restaurant.snippetText;
    const restaurantUrl = restaurant.url;
    const milesToRestaurant = (
      <p>
        {[<i className="fa fa-map" style={{ "color": "#14A4B5" }} key={`Distance:${restaurantDistance}`}></i>,
          `\t`,
          <a href={GMapsDirectionsURL} className="YelpPhoneNo expandFromCenter" target="_blank" key={`GMapURL:${GMapsDirectionsURL}`}>
            <em key={"Restaurant_Dist"} style={{ "color": this.distanceColor(restaurantDistance) }}>{`${restaurantDistance} mi`}</em>
          </a>
        ]}
      </p>);
    const restaurantNumber = (
      <p>
        {[<i className="fa fa-phone-square" style={{ "color": "#14A4B5" }} key={`TelNo:${phoneNo}`}></i>,
          `\t`,
          <a href={`tel:+1${phoneNo}`} className="YelpPhoneNo expandFromCenter" target="_blank" key={`PhoneNo:${phoneNo}`}>{this.parsePhoneNumber(phoneNo)}</a>
        ]}
      </p>
    );

    return (
      <li className="mobilePaddingLeftRight0 col-xs-12 col-md-3">
        <Card>
          <a href={restaurantUrl} target="_blank">
            <img className="img-responsive" src={restaurantImage} />
          </a>
          <CardTitle title={restaurantName} />
          <div className="col-xs-12">
            <div style={{width: '30%'}}>
              <img className="img-responsive" src={restaurantRatingImage} />
            </div>
            <div style={{width: '50%'}}>{restaurantReviewCount}</div>
          </div>
          <CardText>
            <p>{restaurantDescriptiveReview}</p>
            {restaurantAddressDisplay}
            {restaurantNumber}
          </CardText>
        </Card>
      </li>
    );
  }
};
