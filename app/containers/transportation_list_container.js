import React, { Component } from 'react';
import { connect } from 'react-redux';

import BaseComponent from '../components/base_component';


class TransportationList extends BaseComponent {
  renderList(list, job) {
    let newList = list.slice(0, 3);
    
    return newList.map((transport, index) => {
      const [transportLat, transportLng] = [transport.geometry.location.lat, transport.geometry.location.lng],
            [jobLat, jobLng] = [job.latitude, job.longitude],
            stationDistance = this.getDistanceFromLatLonInKm(jobLat, jobLng, transportLat, transportLng),
            GMapsDirectionsURL = `https://www.google.com/maps/dir/${jobLat},${jobLng}/${transportLat},${transportLng}/`;

      if (transport.photos) {
        var img = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&maxheight=250&photoreference=${transport.photos[0].photo_reference}&key=AIzaSyC1_oLFky0FuFjjQJfY7DWwAFFupPP4sSw`;
      }
      
      return (
        <li className="restaurantLI one-third" key={transport.place_id} >
            <div className="verticallyCenter">
              <div className="nameRating">
                <a href={ `http://maps.google.com/?q=${transportLat},${transportLng}` } target="_blank" >
                  <h5 className="textEllipsis expandFromCenter">{ this.parseAndFormatJobTitle(transport.name) }</h5>
                  { 
                    (transport.photos) ? 
                      <div className="yelpPhoto textEllipsis">
                        <img src={ img } alt={ transport.name } />
                      </div> : 
                      <div className="yelpPhoto textEllipsis">
                        <img src="http://goo.gl/Uu31GG" className="fallbackImage" alt="Fallback cityscape placeholder graphic (Gray)." />
                      </div>
                      // 'No Image' 
                  }
                </a>
              </div>
              <div className="yelpDescription card-body">
                <div className="YelpRating_Div">
                  { 
                    transport.rating ? 
                      this.getStarRating(+transport.rating) :
                      <div className="starsRating">
                        {[
                          <i className="fa fa-heart cardDescriptionGlyph" key={`UserLoveRating_${transport.rating}`}></i>,
                          '\tNo Reviews'
                        ]}
                      </div>
                  }
                </div>

                <div>
                  <div style={{ "display": "inline-block", "width": "45%", "float": "left" }}>
                    {[
                      <i className="fa fa-map cardDescriptionGlyph" key={`Distance_${stationDistance}`}></i>,
                      `\t`,
                      <a href={GMapsDirectionsURL} className="YelpPhoneNo expandFromCenter" target="_blank" key={`GMapURL_${GMapsDirectionsURL}`}>
                        <em key={`StationDist_${transport.id}`} style={{ "color": this.distanceColor(stationDistance) }}>{`${stationDistance} mi`}</em>
                      </a>
                    ]}
                  </div>
                  { this.getDistanceBlocks(stationDistance) }
                </div>

                <p style={{ "fontSize": "1.25rem", "clear": "both" }}>
                  {[
                    <i className="fa fa-tags cardDescriptionGlyph" key={`AmenityTags_${index}`}></i>,
                    `\t${this.getItemTags(transport.types)}`
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
    let trainsList = props.activeTrains;
    let busList = props.activeBus;
    let job = props.activeJob;

    return (
      (this.props.loading) ?
      <div className="restaurantContainer">
        <i className="fa fa-refresh fa-spin fa-5x fa-fw loadingSpinner"></i> Loading...
      </div> :
      <div>
        <div className="restaurantContainer">
         <div style={{ "backgroundColor": "hsla(222, 100%, 63%, 0.79)" }}>
           <img src="http://goo.gl/XzVRW7" className="AmenitiesHeader_Img" alt="Transportation subway/metro glyph icon (Blue)." />
           <h5>Train Stations</h5>
         </div>
          <div className="overlay">
            <ul className="trainList container">{(trainsList.length && this.renderList(trainsList, job))
              || 'No results for this area'}
            </ul> 
          </div>
        </div>
        <div className="restaurantContainer">
          <div style={{ "backgroundColor": "hsla(138, 37%, 47%, 0.82)" }}>
            <img src="http://goo.gl/wa4ylN" className="AmenitiesHeader_Img" alt="Transportation bus glyph icon (Red)." />
            <h5>Bus Stops</h5>
          </div>
          <div className="overlay overlayBottomMargin">
            <ul className="busList container">{(busList.length && this.renderList(busList, job)) 
              || 'No results for this area' }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  activeJob: state.activeJob, 
  activeTrains: state.activeTrains,
  activeBus: state.activeBus,
  loading: state.loading
});

export default connect(mapStateToProps)(TransportationList);
                

// <img className="YelpRatingStars" src={ restaurant.rating_img_url } alt="Yelp restaurant photo." /> 
// <p className="numRestaurantReviews">{ place.rating }</p>
