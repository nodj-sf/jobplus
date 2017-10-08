import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';

import BaseComponent from '../components/base_component';


class AmenitiesList extends BaseComponent {
  renderList(list, job) {
    let newList = list.slice(0, 3);
    return newList.map((place, i) => {
      const amenitiesName = place.name;
      const ratingDescription = place.rating ? `Ratings: ${place.rating}/5` : <span style={{fontSize: '.8em'}}>Not Rated</span>;
      const distanceDescription = `Miles away: ${this.getDistanceFromLatLonInKm(job.latitude, job.longitude, place.geometry.location.lat, place.geometry.location.lng)}`;
      let amenitiesPlaceImage = '';
      if (place.photos) {
        amenitiesPlaceImage = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&maxheight=250&photoreference=${place.photos[0].photo_reference}&key=AIzaSyC56PLIo323RpHzaKe-ZunaS_0Tn5DgyGY`;
      }
      return (
        <li key={place.place_id} className="col-xs-12 col-md-4 mobilePaddingLeftRight0" style={{listStyle: 'none'}} >
          <a target="_blank" href={ `http://maps.google.com/?q=${place.geometry.location.lat},${place.geometry.location.lng}` } >
            <Card>
              <img className="col-xs-12 img-responsive" style={{padding: 0}} src={amenitiesPlaceImage} />
              <CardTitle title={amenitiesName} subtitle={distanceDescription + ", " + ratingDescription} />
            </Card>
          </a>
        </li>
      );
    });
  }

  render() {
    let props = this.props;
    let parksList = props.activeParks;
    let gymsList = props.activeGyms;
    let job = props.activeJob;

    return (
      (this.props.loading) ?
      <div className="col-xs-12 text-center">
        <i className="fa fa-cog fa-spin fa-2x fa-fw"></i> <span>Loading...</span>
      </div> :
      <div>
        <div>
          <Subheader style={{color: '#52B3D9'}} className="text-center">{[<i className="fa fa-futbol-o" aria-hidden="true" key="FontAwesome soccer ball glyph icon"></i>,`\tParks`]}</Subheader>
          <div>
            <ul>{(parksList.length && this.renderList(parksList, job))
              || 'There are no results for this area'}
            </ul>
          </div>
        </div>
        <div>
          <Subheader style={{color: '#52B3D9'}} className="text-center">Gyms & Fitness</Subheader>
          <div>
            <ul>{gymsList.length && this.renderList(gymsList, job) || 'There are no results for this area' }</ul>
          </div>
        </div>
      </div>
    );
  }
}


let mapStateToProps = (state) => ({
  activeJob: state.activeJob,
  activeParks: state.activeParks,
  activeGyms: state.activeGyms,
  loading: state.loading
});

export default connect(mapStateToProps)(AmenitiesList);
