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

      let img = '';

        console.log(`Google Place:\t${transport}\n${Object.keys(transport)}\n${transport.rating}\n${transport.types}\n${transport.formatted_address}`);

      if (transport.photos) {
        img = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&maxheight=250&photoreference=${transport.photos[0].photo_reference}&key=AIzaSyC1_oLFky0FuFjjQJfY7DWwAFFupPP4sSw`;
      }
      
      return (
        <li className="restaurantLI one-third" key={transport.place_id} >
            <div className="verticallyCenter">
              <div className="nameRating">
                <a href={ `http://maps.google.com/?q=${transportLat},${transportLng}` } className="textEllipsis" target="_blank" >
                  <h5 className="textEllipsis expandFromCenter">{ transport.name }</h5>
                  { 
                    (transport.photos) ? 
                      <img src={ img } className="yelpPhoto" alt={ transport.name } /> : 
                      'No Image' 
                  }
                </a>
              </div>
              <div className="yelpDescription card-body">
                <div className="YelpRating_Div">
                  { transport.rating ? 
                      this.getStarRating(+transport.rating) :
                      'No Reviews'
                  }
                </div>

                <p>
                  {[<i className="fa fa-map" style={{ "color": "#14A4B5" }} key={`Distance:${stationDistance}`}></i>,
                    `\t`,
                    <a href={GMapsDirectionsURL} className="YelpPhoneNo expandFromCenter" target="_blank" key={`GMapURL:${GMapsDirectionsURL}`}>
                      <em key={`Amenity_Dist:${transport.id}`} style={{ "color": this.distanceColor(stationDistance) }}>{`${stationDistance} mi`}</em>
                    </a>
                  ]}
                </p>

                <p style={{ "fontSize": "1.25rem" }}>
                  {[<i className="fa fa-tags" style={{ "color": "#14A4B5", "fontSize": "1.6rem" }} key={`AmenityTags_${index}`}></i>,
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
          <h5>
            {[
              <i className="fa fa-subway" aria-hidden="true" key="FontAwesome train glyph icon"></i>,
              " Train Stops"
            ]}
          </h5> 
          <div className="overlay">
            <ul className="trainList container">{(trainsList.length && this.renderList(trainsList,job))
              || 'No results for this area'}
            </ul> 
          </div>
        </div>
        <div className="restaurantContainer">
          <h5>
            {[
              <i className="fa fa-bus" aria-hidden="true" key="FontAwesome bus glyph icon"></i>,
              " Bus Stops"
            ]}
          </h5> 
          <div className="overlay">
            <ul className="busList container">{(busList.length && this.renderList(busList,job)) 
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
