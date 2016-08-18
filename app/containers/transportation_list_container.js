import React, { Component } from 'react';
import { connect } from 'react-redux';
import BaseComponent from '../components/base_component';


class TransportationList extends BaseComponent {
  renderList(list, job) {
    let newList = list.slice(0, 3);
    
    return newList.map((place, i) => {
      return (
        <div key={i}>
          <li className="placesLI" 
              key={place.place_id} >
            <p>{ place.name } <i>{ this.getDistanceFromLatLonInKm(job.latitude,job.longitude,place.geometry.location.lat, place.geometry.location.lng ) }</i></p>
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
