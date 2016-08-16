import React, { Component } from 'react';
import { connect } from 'react-redux';


class PlacesList extends Component {

  customList(trains, bus, parks, gyms) {
    var topResults = [trains[0], bus[0], parks[0], gyms[0]];
    return topResults;
  }

  renderList() {
    var newList = this.customList(this.props.activeTrains, this.props.activeBus, 
                  this.props.activeParks, this.props.activeGyms);

    return (
      <div>
        <li className="placesLI" 
            style={{"listStyleType": "none"}}
            key={newList[0].place_id} >
          <h4>Train Stop</h4>  
          <h4>{ newList[0].name }</h4>
        </li>
        <li className="placesLI" 
            style={{"listStyleType": "none"}}
            key={newList[1].place_id} >
          <h4>Bus Stop</h4>  
          <h4>{ newList[1].name }</h4>
        </li>
        <li className="placesLI" 
            style={{"listStyleType": "none"}}
            key={newList[2].place_id} >
          <h4>Park</h4>  
          <h4>{ newList[2].name }</h4>
        </li>
        <li className="placesLI" 
            style={{"listStyleType": "none"}}
            key={newList[3].place_id} >
          <h4>Gyms & Fitness</h4>  
          <h4>{ newList[3].name }</h4>
        </li>
      </div>
    );
  }

  render() {
    return (
      <div id="placesContainer">
        <h1>Nearby Amenities</h1>
        <ul className="placesList">
          { this.props.activeGyms.length && this.renderList() }
        </ul>
      </div>
    ); 
  }
}


let mapStateToProps = (state) => ({
  activeTrains: state.activeTrains,
  activeBus: state.activeBus,
  activeParks: state.activeParks,
  activeGyms: state.activeGyms
});

export default connect(mapStateToProps)(PlacesList);
