import React, { Component } from 'react';
import { connect } from 'react-redux';


class TransportationList extends Component {

  customList(trains, bus) {
    var topResults = [trains[0], bus[0]];
    return topResults;
  }

  renderList() {
    var newList = this.customList(this.props.activeTrains, this.props.activeBus);
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
      </div>
    );
  }

  render() {
    return (
      <div id="placesContainer">
        <h1>Nearby Amenities</h1>
        <ul className="TransportationList">
          { this.props.activeBus.length && this.renderList() }
        </ul>
      </div>
    ); 
  }
}


let mapStateToProps = (state) => ({
  activeTrains: state.activeTrains,
  activeBus: state.activeBus,
});

export default connect(mapStateToProps)(TransportationList);
