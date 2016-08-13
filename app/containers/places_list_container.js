import React, { Component } from 'react';
import { connect } from 'react-redux';

class PlacesList extends Component {
  customList(trains, bus, parks, gyms) {
    console.log('trains', trains);
    console.log('bus', bus);
    console.log('parks', parks);
    console.log('gyms', gyms);
    // var train = [], bus = [], park = [], gym = [];
    // for (var i = 0; i < places.length; i++) {
    //   var current = places[i]; 
    //   if (current.types.includes('subway_station' || 'train_station')) {
    //     train.push(current);
    //   }
    //   if (current.types.includes('bus_station' || 'transit_station')) {
    //     bus.push(current);
    //   }
    //   if (current.types.includes('park')) {
    //     park.push(current);
    //   }
    //   if (current.types.includes('gym')) {
    //     gym.push(current);
    //   }
    // }
    // console.log('train: ', train[0], 'bus: ', bus[0], 'park: ', park[0],'gym :', gym[0] );
    return trains;
  }

  renderList() {
    const newList = this.customList(/* this.props.activePlaces */ this.props.activeTrains, this.props.activeBus, this.props.activeParks, this.props.activeGyms);
    return newList.map((place) => {
      return (
        <li className="placesLI" 
            style={{"listStyleType": "none"}}
            key={place.place_id} >
          <h4>{ place.name } <small>{ place.vicinity }</small></h4>
          <p>{ place.rating }</p>
        </li>
      );
    });
  }

  render() {
    // console.log('ActivePlaces', this.props.activePlaces);
    return (
      <div id="placesContainer">
        <h1>Places List Container</h1>
        <ul className="placesList">
          { this.props.activeGyms.length && this.renderList() }
        </ul>
      </div>
    ); 
  }
}

function mapStateToProps(state) {
  return {
    //activePlaces: state.activePlaces,
    activeTrains: state.activeTrains,
    activeBus: state.activeBus,
    activeParks: state.activeParks,
    activeGyms: state.activeGyms
  };
}

export default connect(mapStateToProps)(PlacesList);
