import React, { Component } from 'react';
import { connect } from 'react-redux';
import BaseComponent from '../components/base_component';


class TransportationList extends BaseComponent {
  renderList(list, job) {
    let newList = list.slice(0, 3);
    
    return newList.map((place, i) => {
      let img = '';

      if (place.photos) {
        img = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&maxheight=250&photoreference=' + place.photos[0].photo_reference + '&key=AIzaSyCbO9G9Z4TzOZlXfPFiV7ZAThWm6RQClqo';
      }
      
      return (
        <li className="restaurantLI" key={place.place_id} >
          <a target="_blank" href={ `http://maps.google.com/?q=${place.geometry.location.lat},${place.geometry.location.lng}` } >
            <div className="verticallyCenter">
              <div className="nameRating">
                <h5>{ place.name }</h5>
                { (place.photos) ? <img className="yelpPhoto" src={ img } alt={ place.name } /> : 'no image' }
              </div>
              <div className="yelpDescription card-body">
                <p className="numRestaurantReviews">{ place.rating }</p>
                <i>{ this.getDistanceFromLatLonInKm(job.latitude,job.longitude,place.geometry.location.lat, place.geometry.location.lng ) }</i>
              </div>
            </div>
          </a>
        </li>
      );    
    });
  }

  render() {
    let props = this.props;
    let trainsList = props.activeTrains;
    let busList = props.activeBus;
    let job = props.activeJob;

    return ((this.props.loading)
      ? <div id="placesContainer">
          <i className="fa fa-cog fa-spin fa-5x fa-fw"></i> Loading...
        </div>
      : <div id="placesContainer">
         <h5>Train Stops</h5> 
         <ul className='trainList'>{(trainsList.length && this.renderList(trainsList,job)) 
          || 'There are no results for this area...'}</ul> 
         <h5>Bus Stops</h5> 
         <ul className='busList'>{(busList.length && this.renderList(busList,job)) 
          || 'There are no results for this area...'}</ul>
        </div>);
  }
}


let mapStateToProps = (state) => ({
  activeJob: state.activeJob, 
  activeTrains: state.activeTrains,
  activeBus: state.activeBus,
  loading: state.loading
});

export default connect(mapStateToProps)(TransportationList);
