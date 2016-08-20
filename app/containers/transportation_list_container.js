import React, { Component } from 'react';
import { connect } from 'react-redux';
import BaseComponent from '../components/base_component';


class TransportationList extends BaseComponent {
  renderList(list, job) {
    let newList = list.slice(0, 3);
    
    return newList.map((place, i) => {
      let img = '';

      if (place.photos) {
        img = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=50&photoreference=' + place.photos[0].photo_reference + '&key=AIzaSyCbO9G9Z4TzOZlXfPFiV7ZAThWm6RQClqo';
      }
      
      return (
        <div key={i}>
          <li className="placesLI" key={place.place_id} >
            <p>
              <a href={`http://maps.google.com/?q=${place.geometry.location.lat},${place.geometry.location.lng}`} title={ place.name } target="_blank">
                { (place.photos) ? <img src={ img } alt={ place.name } /> : 'no image' } <br /> 
                { place.name } <br />
                { place.rating } <br />
                <i>{ this.getDistanceFromLatLonInKm(job.latitude,job.longitude,place.geometry.location.lat, place.geometry.location.lng ) }</i>
              </a>
            </p>
          </li>
        </div>
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
