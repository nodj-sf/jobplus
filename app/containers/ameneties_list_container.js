import React, { Component } from 'react';
import { connect } from 'react-redux';

import BaseComponent from '../components/base_component';
// import DBIc from '../../public/img/dumbell_glyph.svg';


class AmenitiesList extends BaseComponent {
  renderList(list, job) {
    let newList = list.slice(0, 3);

    return newList.map((place, index) => {
      const [placeLat, placeLng] = [place.geometry.location.lat, place.geometry.location.lng],
            [jobLat, jobLng] = [job.latitude, job.longitude],
            amenityDistance = this.getDistanceFromLatLonInKm(jobLat, jobLng, placeLat, placeLng),
            GMapsDirectionsURL = `https://www.google.com/maps/dir/${jobLat},${jobLng}/${placeLat},${placeLng}/`;

      if (place.photos) {
        var img = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=${place.photos[0].photo_reference}&key=AIzaSyC1_oLFky0FuFjjQJfY7DWwAFFupPP4sSw`;
      }
      
      return (
        <li className="restaurantLI one-third" key={index} >
          <div className="verticallyCenter">
            <div className="nameRating">
              <a 
                href={ `http://maps.google.com/?q=${place.geometry.location.lat},${place.geometry.location.lng}` } 
                className="textEllipsis" 
                target="_blank" >
                <h5 className="textEllipsis expandFromCenter">{ this.parseAndFormatJobTitle(place.name) }</h5>
                { 
                  (place.photos) ? 
                    <div className="yelpPhoto textEllipsis">
                      <img src={ img } alt={ place.name } />
                    </div> : 
                    // No Image
                    <div className="yelpPhoto textEllipsis">
                      <img src="http://goo.gl/Uu31GG" className="fallbackImage" alt="Fallback cityscape placeholder graphic (Gray)." />
                    </div>
                }
              </a>
            </div>
            <div className="yelpDescription card-body">
              <div className="YelpRating_Div">
                { 
                  place.rating ? 
                    this.getStarRating(+place.rating) :
                    'No Reviews'
                }
              </div>

              <div>
                <div className="amenityDistanceInMiles">
                  {[
                    <i className="fa fa-map" style={{ "color": "#14A4B5" }} key={`Distance_${amenityDistance}`}></i>,
                    `\t`,
                    <a href={GMapsDirectionsURL} className="YelpPhoneNo expandFromCenter" target="_blank" key={`GMapURL_${GMapsDirectionsURL}`}>
                      <em key={`AmenityDist_${place.id}`} style={{ "color": this.distanceColor(amenityDistance) }}>{`${amenityDistance} mi`}</em>
                    </a>
                  ]}
                </div>
                { this.getDistanceBlocks(amenityDistance) }
              </div>

              <p style={{ "fontSize": "1.25rem", "clear": "both" }}>
                {[
                  <i className="fa fa-tags" style={{ "color": "#14A4B5", "fontSize": "1.6rem" }} key={`AmenityTags_${index}`}></i>,
                  `\t${this.getItemTags(place.types)}`
                ]}
              </p>
            </div>
          </div>
        </li>
      );    
    });
  }

  render() {
    let props = this.props;
    let parksList = props.activeParks;
    let gymsList = props.activeGyms;
    let job = props.activeJob;
    
    return (
      (this.props.loading) ?
      (
        <div className="restaurantContainer">
          <i className="fa fa-refresh fa-spin fa-5x fa-fw loadingSpinner"></i> Loading...
        </div>
      ) :
      (
        <div>
          <div className="restaurantContainer">
            <div style={{ "backgroundColor": "rgba(90, 153, 126, 0.79)" }}>
              <img src="http://goo.gl/GLF2Rk" className="AmenitiesHeader_Img" alt="Park amenity landscape glyph icon (Green)." />
              <h5>Parks</h5>
            </div>
            <div className="overlay">
              <ul className='trainList container'>{(parksList.length && this.renderList(parksList, job)) 
                || 'There are no results for this area'}
              </ul> 
            </div>
          </div>
          <div className="restaurantContainer">
            <div style={{ "backgroundColor": "hsla(0, 0%, 20%, 0.57)" }}>
              <img src="http://goo.gl/zeyx0P" className="AmenitiesHeader_Img" alt="Gym amenity dumbell glyph icon (Red)." />
              <h5>Gyms</h5>
            </div>
            <div className="overlay overlayBottomMargin">
              <ul className='busList container'>{gymsList.length && this.renderList(gymsList, job) 
                || 'There are no results for this area' }
              </ul>
            </div>
          </div>
        </div>
      )
    ); 
  }
}


let mapStateToProps = (state) => ({
  activeJob: state.activeJob,
  activeParks: state.activeParks,
  activeGyms: state.activeGyms,
  loading: state.loading
});

export default connect(mapStateToProps)(AmenitiesList);



// <i className="fa fa-futbol-o" aria-hidden="true" key="FontAwesome (.fa) soccer ball glyph icon (Black)."></i>

// {[,
//   <img src={DBIc} className="amenityHeaderGlyph" />,
//   "Gyms & Fitness"
// ]}


// <div className="yelpDescription card-body">
//   <p className="numRestaurantReviews">{ place.rating }</p>
//   <i>{ `${this.getDistanceFromLatLonInKm(job.latitude,job.longitude,place.geometry.location.lat, place.geometry.location.lng)} mi` }</i>
// </div>


// var React = require('react');
// var Icon = require('babel!svg-react!../svg/my-icon.svg?name=Icon');

// module.exports = React.createClass({
//     render () {
//         return <Icon className='normal' />;
//     }
// });
