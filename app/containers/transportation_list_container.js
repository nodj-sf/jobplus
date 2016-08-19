import React, { Component } from 'react';
import { connect } from 'react-redux';
import BaseComponent from '../components/base_component';


class TransportationList extends BaseComponent {
  renderList(list, job) {
    let newList = list.slice(0, 3);
    
    return newList.map((place, i) => {
      let img = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=50&photoreference=' + place.photos[0].photo_reference + '&key=AIzaSyCbO9G9Z4TzOZlXfPFiV7ZAThWm6RQClqo';
      return (
        <div key={i}>
          <li className="placesLI" key={place.place_id} >
            <p>
              <a href={`http://maps.google.com/?q=${place.geometry.location.lat},${place.geometry.location.lng}`} title={ place.name } target="_blank">
                <img src={ img } alt={ place.name } /> <br />
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
         <h5>Train Stop</h5> 
         <ul className='trainList'>{trainsList.length && this.renderList(trainsList,job)}</ul> 
         <h5>Bus Stop</h5> 
         <ul className='busList'>{busList.length && this.renderList(busList,job)}</ul>
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

// photo
// https://maps.googleapis.com/maps/api/place/photo?maxwidth=50&photoreference=CoQBcwAAAOsUa8IdbCrpnECXNLhtQY-dbWiWTtLqjYOoLO6elxocU5sUFwVqJcA4DrWLPPBcPMTS3ULRJQdpowbvahypxY14kXOJW12NgjNi5qJcxOHg-y9piGv-WrOYDCKrlJMlBfKemXho-TLGsZU1go_Q_cLnfvdxhPAhagvn3HIEhAd6EhAOJNdCdSkGWi9-rnykLxQyGhSD0o2chO_CTvIz5cJ78aRRIkPMIg&key=AIzaSyCbO9G9Z4TzOZlXfPFiV7ZAThWm6RQClqo
// place link
// https://maps.googleapis.com/maps/api/place/details?reference=CmRYAAAAciqGsTRX1mXRvuXSH2ErwW-jCINE1aLiwP64MCWDN5vkXvXoQGPKldMfmdGyqWSpm7BEYCgDm-iv7Kc2PF7QA7brMAwBbAcqMr5i1f4PwTpaovIZjysCEZTry8Ez30wpEhCNCXpynextCld2EBsDkRKsGhSLayuRyFsex6JA6NPh9dyupoTH3g&sensor=true&key=AIzaSyCbO9G9Z4TzOZlXfPFiV7ZAThWm6RQClqo

// http://maps.google.com/?q=37.7850153,-122.4023464
// https://maps.googleapis.com/maps/api/staticmap?center=37.7850153,-122.4023464&size=400x400&zoom=14&key=AIzaSyCbO9G9Z4TzOZlXfPFiV7ZAThWm6RQClqo
// https://maps.googleapis.com/maps/api/staticmap?center=Berkeley,CA&zoom=14&size=400x400&key=AIzaSyCbO9G9Z4TzOZlXfPFiV7ZAThWm6RQClqo

