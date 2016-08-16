import React, { Component } from 'react';
import { connect } from 'react-redux';


class AmenetiesList extends Component {

  customList(parks, gyms) {
    var topResults = [parks[0], gyms[0]];
    return topResults;
  }

  renderList() {
    var newList = this.customList(this.props.activeParks, this.props.activeGyms);
    return (
      <div>
        <li className="placesLI" 
            style={{"listStyleType": "none"}}
            key={newList[0].place_id} >
          <h4>Parks & Recreation</h4>  
          <h4>{ newList[0].name }</h4>
        </li>
        <li className="placesLI" 
            style={{"listStyleType": "none"}}
            key={newList[1].place_id} >
          <h4>Gyms & Fitness</h4>  
          <h4>{ newList[1].name }</h4>
        </li>
      </div>
    );
  }

  render() {
    return (
      <div id="placesContainer">
        <h1>Nearby Amenities</h1>
        <ul className="AmenetiesList">
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

export default connect(mapStateToProps)(AmenetiesList);
