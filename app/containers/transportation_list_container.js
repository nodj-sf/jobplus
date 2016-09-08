import React, { Component } from 'react';
import { connect } from 'react-redux';

import BaseComponent from '../components/base_component';


class TransportationList extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      trainListDisplayState: "flex",
      busListDisplayState: "flex"
    };

    this.collapseTrainList = this.collapseTrainList.bind(this);
    this.collapseBusList = this.collapseBusList.bind(this);
  }

  renderList(list, job) {    
    return list.slice(0, 6).map((transport, index) => {
      const [transportLat, transportLng] = [transport.geometry.location.lat, transport.geometry.location.lng],
            [jobLat, jobLng] = [job.latitude, job.longitude],
            stationDistance = this.getDistanceFromLatLonInKm(jobLat, jobLng, transportLat, transportLng),
            GMapsDirectionsURL = `https://www.google.com/maps/dir/${jobLat},${jobLng}/${transportLat},${transportLng}/`,
            fallbackImageURL = (transport.types.includes('bus_station') ? 'http://goo.gl/0ZTNZR' : 'http://goo.gl/MvtTS3'),
            fallbackImageAlt = (transport.types.includes('bus_station') ? 'Fallback bus placeholder graphic (Green).' : 'Fallback metro placeholder graphic (Blue).');

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
                      // No Image 
                      <div className="yelpPhoto textEllipsis">
                        <img src={ fallbackImageURL } className="fallbackImage" alt={ fallbackImageAlt } />
                      </div>
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
                          <i className="fa fa-heart cardDescriptionGlyph" key={ `UserLoveRating_${transport.rating}` }></i>,
                          '\tNo Reviews'
                        ]}
                      </div>
                  }
                </div>

                <div>
                  <div className="amenityDistanceInMiles">
                    {[
                      <i className="fa fa-map cardDescriptionGlyph" key={ `Distance_${stationDistance}` }></i>,
                      `\t`,
                      <a href={ GMapsDirectionsURL } className="YelpPhoneNo expandFromCenter" target="_blank" key={ `GMapURL_${GMapsDirectionsURL}` }>
                        <em key={ `StationDist_${transport.id}` } style={{ color: this.distanceColor(stationDistance) }}>{ `${stationDistance} mi` }</em>
                      </a>
                    ]}
                  </div>
                  { this.getDistanceBlocks(stationDistance) }
                </div>

                <p style={{ fontSize: "1.25rem", clear: "both" }}>
                  {[
                    <i className="fa fa-tags cardDescriptionGlyph" key={ `AmenityTags_${index}` }></i>,
                    `\t${this.getItemTags(transport.types)}`
                  ]}
                </p>
              </div>
            </div>
        </li>
      );    
    });
  }

  collapseTrainList() {
    this.setState({ trainListDisplayState: this.state.trainListDisplayState === "flex" ? "none" : "flex" });
  }

  collapseBusList() {
    this.setState({ busListDisplayState: this.state.busListDisplayState === "flex" ? "none" : "flex" });
  }

  render() {
    let props = this.props,
        job = props.activeJob,
        [trainList, busList] = [props.activeTrains, props.activeBus];

    return (
      (this.props.loading) ?
        <div className="restaurantContainer">
          <i className="fa fa-refresh fa-spin fa-5x fa-fw loadingSpinner"></i> Loading...
        </div> :
        <div>
          <div className="restaurantContainer">
            <div style={{ backgroundColor: "hsla(222, 100%, 63%, 0.79)" }}>
              <i className="collapseGlyph fa fa-reorder" onClick={ this.collapseTrainList }></i>
              <img src="http://goo.gl/XzVRW7" className="AmenitiesHeader_Img" alt="Transportation subway/metro glyph icon (Blue)." />
              <h5>Train Stations</h5>
            </div>
            <div className="overlay">
              {
                trainList.length 
                  ? <ul className="trainList container" style={{ display: this.state.trainListDisplayState }}>
                      { this.renderList(trainList, job) }
                    </ul>
                  : <p className="noResultsMsg">{ `No results for train stations in this area` }</p>
              }
            </div>
          </div>
          <div className="restaurantContainer">
            <div style={{ backgroundColor: "hsla(138, 37%, 47%, 0.82)" }}>
              <i className="collapseGlyph fa fa-reorder" onClick={ this.collapseBusList }></i>
              <img src="http://goo.gl/wa4ylN" className="AmenitiesHeader_Img" alt="Transportation bus glyph icon (Red)." />
              <h5>Bus Stations</h5>
            </div>
            <div className="overlay overlayBottomMargin">
              {
                busList.length 
                  ? <ul className="busList container" style={{ display: this.state.busListDisplayState }}>
                      { this.renderList(busList, job) }
                    </ul>
                  : <p className="noResultsMsg">{ `No results for bus stations in this area` }</p>
              }
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
