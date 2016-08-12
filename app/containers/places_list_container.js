import React, { Component } from 'react';
import { connect } from 'react-redux';

class PlacesList extends Component {
  renderList() {
    return this.props.activePlaces.map((place) => {
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
          { this.renderList() }
        </ul>
      </div>
    ); 
  }
}

function mapStateToProps(state) {
  return {
    activePlaces: state.activePlaces
  };
}

export default connect(mapStateToProps)(PlacesList);