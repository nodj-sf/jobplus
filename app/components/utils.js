import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow, SearchBox } from 'react-google-maps';
import StarRatings from 'react-star-ratings';

import SetDirectionButtons from './set-direction-buttons';

// New class `BaseComponent` extends React `Component`, but is modified to include
// a variety of static helper class methods that may be shared by all sub-classes.
export default class Utils extends Component {
  constructor(props) {
    super(props);
  }

  // Returns Hex color value based on input distance:
  distanceColor(dist) {
    return dist <= 1.0 ?
      "#25DC25" : dist <= 2.0 ?
      "#E0E108" : dist <= 3.0 ?
      "#E17E08" :
      "#FD0505";
  }

  // Returns formatted string specifying the posting's job title:
  parseAndFormatJobTitle(job) {
    const specialFormatTerms = {
      '(nyc)': '(NYC)',
      '.net': '.NET',
      'and': '&',
      'dba': 'DBA',
      'dev/ops': 'Dev/Ops',
      'ios': 'iOS',
      'javascript': 'JavaScript',
      'js': 'JS',
      'nosql': 'NoSQL',
      'nyc': 'NYC',
      'of': 'of',
      'php': 'PHP',
      'with': 'w/'
    };

    return job
      .trim()
      // .split(/[\s|\/]/gmi)
      .split(' ')
      .reduce((memo, index) => {
        return index.toLowerCase() in specialFormatTerms ?
          memo += ` ${specialFormatTerms[index.toLowerCase()]} ` :
          memo += ` ${index.charAt(0).toUpperCase()}${index.slice(1).toLowerCase()} `;
      })
      .replace(/\s(\/)\s/gmi, "$1")
      // .replace(/\band\b/gmi, "&")
      .trim();
  }

  // Returns formatted string specifying the period of time since job listing's post date:
  parseAndFormatDaysSincePosted(days) {
    return days
      .match(/(\w+){1,}/gmi)
      .map(str => `${str[0].toLowerCase()}${str.slice(1)}`)
      .join(' ');
  }

  // Modifies plain-text nine-digit phone number [Format: XXXXXXXXX] to
  // conform to the desired style [Format: +1 (XXX) XXX-XXX]:
  parsePhoneNumber(num) {
    if (num) {
      return num.replace(/^(\d{3})(\d{4})(\d{3})/, "+1 ($1) $2-$3");
    }
  }

  // Modifes photo URL from default small-file size ('ms') to large-file size ('l'):
  parseYelpRestaurantPhoto(photo) {
    return photo.replace(/ms(\.jpg)$/i, "l$1");
  }

  // Removes all embedded HTML tags from the `job` object's `snippet` value:
  tagFreeSnippet(descrip) {
    return descrip ?
      descrip.replace(/<[^>]+>|\.(?=\.{3,})/gmi, '') :
      descrip;
  }

  // Returns the radian-valued float equivalent of the given input in degrees:
  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  // Returns the Euclidean distance separating two geographical points in miles (mi):
  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371,       // Radius (r) of the Earth in kilometers (km)
          kmToMilesConversionFactor = 0.621371;

    let [dLat, dLon] = [this.deg2rad(lat2 - lat1), this.deg2rad(lon2 - lon1)];  // Class method `deg2rad` defined above
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)),
        d = R * c;        // Distance (d) in kilometers (km)
    return +`${(d * kmToMilesConversionFactor).toFixed(2)}`; // Convert kilometers (km) to miles (mi)
  }

  createMarkers(data, type, selectedItem) {
    const selectedItemIndex = selectedItem.index;
    const selectedItemType = selectedItem.type;
    if (type === 'job') {
      const jobMarkers = data.map((job, index) => {
        const displayShowInfo = selectedItemIndex === index && type === selectedItemType ? true : false;
        return {
          markerType: 'job',
          coords: { "lat": job.latitude, "lng": job.longitude },
          // jobKey: job.jobkey,
          markerKey: job.jobkey,
          markerTitle: job.jobtitle,
          company: job.company,
          formattedLocation: job.formattedLocation,
          coordinate: job.coordinate,
          snippet: job.snippet,
          url: job.url,
          formattedRelativeTime: job.formattedRelativeTime,
          showInfo: displayShowInfo,
          index
        };
      });
      this.setState({jobMarkers: jobMarkers});
    }
    if (type === 'restaurant') {
        const restaurantMarkers = data.map((restaurant, index) => {
          const displayShowInfo = selectedItemIndex === index && type === selectedItemType ? true : false;
          return {
            markerType: 'restaurant',
            coords: { "lat": restaurant.coordinate.latitude, "lng": restaurant.coordinate.longitude },
            markerKey: restaurant.id,
            markerTitle: restaurant.name,
            address: restaurant.display_address,
            url: restaurant.url,
            imageUrl: restaurant.photo,
            textSnippet: restaurant.snippetText,
            ratingImageUrl: restaurant.rating_img_url,
            showInfo: displayShowInfo,
            rating: restaurant.rating,
            review_count: restaurant.review_count,
            index,
          };
        });
        this.setState({restaurantMarkers: restaurantMarkers});
    }
    if (type === 'train') {
      const trainMarkers = data.slice(0, 7).map((trainMarker, index) => {
        const displayShowInfo = selectedItemIndex === index && type === selectedItemType ? true : false;
        return {
          markerType: 'train',
          coords: { "lat": trainMarker.geometry.location.lat, "lng": trainMarker.geometry.location.lng },
          markerKey: trainMarker.id,
          markerTitle: trainMarker.name,
          vicinity: trainMarker.vicinity,
          showInfo: displayShowInfo,
          index
        };
      })
      this.setState({trainMarkers: trainMarkers});
    }
    if (type === 'bus') {
      const busMarkers = data.slice(0, 7).map((bus, index) => {
        const displayShowInfo = selectedItemIndex === index && type === selectedItemType ? true : false;
        const image = bus.photos && bus.photos.length > 0 ?  `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${bus.photos[0].photo_reference}` : null;
        return {
          markerType: 'bus',
          coords: { "lat": bus.geometry.location.lat, "lng": bus.geometry.location.lng },
          markerKey: bus.id,
          markerTitle: bus.name,
          vicinity: bus.vicinity,
          showInfo: displayShowInfo,
          index,
          image
        };
      })
      this.setState({busMarkers: busMarkers});
    }
    if (type === 'gym') {
      const gymMarkers = data.slice(0, 7).map((gymMarkers, index) => {
        const displayShowInfo = selectedItemIndex === index && type === selectedItemType ? true : false;
        const image = gymMarkers.photos && gymMarkers.photos.length > 0 ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${gymMarkers.photos[0].photo_reference}` : null;
        return {
          markerType: 'gym',
          coords: { "lat": gymMarkers.geometry.location.lat, "lng": gymMarkers.geometry.location.lng },
          markerKey: gymMarkers.id,
          markerTitle: gymMarkers.name,
          vicinity: gymMarkers.vicinity,
          rating: gymMarkers.rating,
          showInfo: displayShowInfo,
          index,
          image
        };
      })
      this.setState({gymMarkers: gymMarkers});
    }
    if (type === 'park') {
      const parkMarkers = data.slice(0, 7).map((parkMarker, index) => {
        const displayShowInfo = selectedItemIndex === index && type === selectedItemType ? true : false;
        const image = parkMarker.photos && parkMarker.photos.length > 0 ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${parkMarker.photos[0].photo_reference}` : null;
        return {
          markerType: 'park',
          coords: { "lat": parkMarker.geometry.location.lat, "lng": parkMarker.geometry.location.lng },
          markerKey: parkMarker.id,
          markerTitle: parkMarker.name,
          vicinity: parkMarker.vicinity,
          rating: parkMarker.rating,
          showInfo: displayShowInfo,
          index,
          image
        };
      });
      this.setState({parkMarkers: parkMarkers});
    }
    console.log('this.state: ', this.state)
  }

  renderInfoWindow(marker, ref) {
    if (marker.markerType === "restaurant") {
      return (
        <InfoWindow
          className="fadeIn animated"
          key={`${marker.markerKey}_info_window`}>
            <div style={{width: '300px'}}>
              <div className="col-xs-12">
                <h4 className="infoWindow_Header text-center">{marker.markerTitle}</h4>
                <a href={marker.url} target="_blank">
                  <img className="img-responsive" style={{margin: '0px auto', padding: '5px 0px', width: '250px'}} src={this.parseYelpRestaurantPhoto(marker.imageUrl)} />
                </a>
              </div>
              <div className="col-xs-12 text-center">
                <StarRatings rating={marker.rating} starRatedColor="#6C7A89" numberOfStars={5} starDimension="16px" />
              </div>
              <div className="col-xs-12">
                <i className="material-icons col-xs-1" style={{color: 'rgb(214, 69, 65)', padding: 0}}>location_on</i>
                <p className="col-xs-11" style={{padding: 0, fontSize: '.8em', marginTop: 6}}>{marker.address}</p>
              </div>
              <div className="col-xs-12">
                <blockquote style={{fontSize: '.9em', borderLeft: '5px solid #6C7A89', padding: 10, paddingTop: 0}}><i className="material-icons" style={{color: '#6C7A89'}}>format_quote</i>{marker.textSnippet}</blockquote>
              </div>
            </div>
        </InfoWindow>
      );
    } else if (marker.markerType === 'job') {
      return (
        <InfoWindow
          className="fadeIn animated"
          key={`${marker.markerKey}_info_window`}>
            <div style={{width: '300px'}}>
              <div className="col-xs-12">
                <h4 className="infoWindow_Header">{marker.company}</h4>
                <a href={marker.url} target="_blank">
                  <h5 className="infoWindow_Header">{this.parseAndFormatJobTitle(marker.markerTitle)}</h5>
                </a>
              </div>
              <div className="col-xs-12">
                <p>This job was posted {marker.formattedRelativeTime}</p>
                <blockquote style={{fontSize: '.9em', borderLeft: '5px solid #6C7A89', padding: 10, paddingTop: 0}}><i className="material-icons" style={{color: '#6C7A89'}}>format_quote</i>{marker.snippet.replace(/[b/<>]/g, '')}</blockquote>
              </div>
            </div>
        </InfoWindow>
      );
    } else if (marker.markerType === 'park') {
        return (
          <InfoWindow
            key={`${marker.markerKey}_info_window`}>
              <div style={{width: '300px'}}>
                <div className="col-xs-12 text-center">
                  <h4>{this.parseAndFormatJobTitle(marker.markerTitle)}</h4>
                  <h5>{marker.company}</h5>
                </div>
                <div className="col-xs-12 text-center">
                  {marker.rating ? <StarRatings rating={marker.rating} starRatedColor="#6C7A89" numberOfStars={5} starDimension="16px" /> : null}
                </div>
                <div className="col-xs-12">
                  <i className="material-icons col-xs-1" style={{color: 'rgb(214, 69, 65)', padding: 0}}>location_on</i>
                  <div className="col-xs-11" style={{fontSize: '.8em', marginTop: 6}}>{marker.vicinity}</div>
                </div>
              </div>
          </InfoWindow>
        );
      } else if (marker.markerType === 'train') {
          return (
            <InfoWindow
              key={`${marker.markerKey}_info_window`}>
                <div style={{width: '300px'}}>
                  <div className="col-xs-12 text-center">
                    <h4>{this.parseAndFormatJobTitle(marker.markerTitle)}</h4>
                    <h5>{marker.company}</h5>
                  </div>
                  <div className="col-xs-12 text-center">
                    {marker.rating ? <StarRatings rating={marker.rating} starRatedColor="#6C7A89" numberOfStars={5} starDimension="16px" /> : null}
                  </div>
                  <div className="col-xs-12">
                    <i className="material-icons col-xs-1" style={{color: 'rgb(214, 69, 65)', padding: 0}}>location_on</i>
                    <div className="col-xs-11" style={{fontSize: '.8em', marginTop: 6}}>{marker.vicinity}</div>
                  </div>
                </div>
            </InfoWindow>
          );
        } else if (marker.markerType === 'bus') {
          debugger;
            return (
              <InfoWindow
                key={`${marker.markerKey}_info_window`}>
                  <div style={{width: '300px'}}>
                    <div className="col-xs-12 text-center">
                      <h4>{this.parseAndFormatJobTitle(marker.markerTitle)}</h4>
                      <h5>{marker.company}</h5>
                    </div>
                    <div className="col-xs-12 text-center">
                      {marker.rating ? <StarRatings rating={marker.rating} starRatedColor="#6C7A89" numberOfStars={5} starDimension="16px" /> : null}
                    </div>
                    <div className="col-xs-12">
                      <i className="material-icons col-xs-1" style={{color: 'rgb(214, 69, 65)', padding: 0}}>location_on</i>
                      <div className="col-xs-11" style={{fontSize: '.8em', marginTop: 6}}>{marker.vicinity}</div>
                    </div>
                  </div>
              </InfoWindow>
            );
          } else if (marker.markerType === 'gym') {
            return (
              <InfoWindow
                key={`${marker.markerKey}_info_window`}>
                  <div style={{width: '300px'}}>
                    <div className="col-xs-12 text-center">
                      <h4>{this.parseAndFormatJobTitle(marker.markerTitle)}</h4>
                      <h5>{marker.company}</h5>
                    </div>
                    <div className="col-xs-12 text-center">
                      {marker.rating ? <StarRatings rating={marker.rating} starRatedColor="#6C7A89" numberOfStars={5} starDimension="16px" /> : null}
                    </div>
                    <div className="col-xs-12">
                      <i className="material-icons col-xs-1" style={{color: 'rgb(214, 69, 65)', padding: 0}}>location_on</i>
                      <div className="col-xs-11" style={{fontSize: '.8em', marginTop: 6}}>{marker.vicinity}</div>
                    </div>
                  </div>
              </InfoWindow>
            );
          }
  }

  addMarker(marker, index) {
    const MAX_ZINDEX = 800,
          onClick = () => this.handleMarkerClick(marker);

    let MAP_PIN = 'M 168.13014858503527 114.76652327113317 C 189.29733269688495 66.37538239750444 169.10629117101143 -0.743769309370748 88.35629117101149 0.006230690629195124 C 7.606291171011549 0.7562306906291383 -13.333356542955187 65.32715433879548 7.575247535632002 114.10675303790794 C 24.570783547217786 153.75719661632445 32.21524550334891 164.64004753237344 47.9861005922736 196.98393269349776 Q 63.75695568119835 229.32781785462203 88.39695364891526 279.86111234908753 L 128.26355111697524 197.31381781011032 Q 152.60629117101155 150.2562306906292 168.13014858503527 114.76652327113317 Z',
        PIN_SCALE = (1 / 10),
        PIN_FILL_COLOR = '#696969',
        PIN_STROKE_WEIGHT = 0.75,
        PIN_Z_INDEX = MAX_ZINDEX;

    switch (marker.markerType) {
      case 'job':
        MAP_PIN = 'M409.133,109.203c-19.608-33.592-46.205-60.189-79.798-79.796C295.736,9.801,259.058,0,219.273,0   c-39.781,0-76.47,9.801-110.063,29.407c-33.595,19.604-60.192,46.201-79.8,79.796C9.801,142.8,0,179.489,0,219.267   c0,39.78,9.804,76.463,29.407,110.062c19.607,33.592,46.204,60.189,79.799,79.798c33.597,19.605,70.283,29.407,110.063,29.407   s76.47-9.802,110.065-29.407c33.593-19.602,60.189-46.206,79.795-79.798c19.603-33.596,29.403-70.284,29.403-110.062   C438.533,179.485,428.732,142.795,409.133,109.203z';
        PIN_SCALE = 1 / 30;
        PIN_FILL_COLOR = '#52B3D9';
        PIN_Z_INDEX = MAX_ZINDEX;
        PIN_STROKE_WEIGHT = 1.50;
        break;
      case 'restaurant':
        MAP_PIN = 'M409.133,109.203c-19.608-33.592-46.205-60.189-79.798-79.796C295.736,9.801,259.058,0,219.273,0   c-39.781,0-76.47,9.801-110.063,29.407c-33.595,19.604-60.192,46.201-79.8,79.796C9.801,142.8,0,179.489,0,219.267   c0,39.78,9.804,76.463,29.407,110.062c19.607,33.592,46.204,60.189,79.799,79.798c33.597,19.605,70.283,29.407,110.063,29.407   s76.47-9.802,110.065-29.407c33.593-19.602,60.189-46.206,79.795-79.798c19.603-33.596,29.403-70.284,29.403-110.062   C438.533,179.485,428.732,142.795,409.133,109.203z';
        PIN_SCALE = (1 / 30);
        PIN_FILL_COLOR = '#D64541';
        break;
      case 'train':
        MAP_PIN = 'M409.133,109.203c-19.608-33.592-46.205-60.189-79.798-79.796C295.736,9.801,259.058,0,219.273,0   c-39.781,0-76.47,9.801-110.063,29.407c-33.595,19.604-60.192,46.201-79.8,79.796C9.801,142.8,0,179.489,0,219.267   c0,39.78,9.804,76.463,29.407,110.062c19.607,33.592,46.204,60.189,79.799,79.798c33.597,19.605,70.283,29.407,110.063,29.407   s76.47-9.802,110.065-29.407c33.593-19.602,60.189-46.206,79.795-79.798c19.603-33.596,29.403-70.284,29.403-110.062   C438.533,179.485,428.732,142.795,409.133,109.203z';
        PIN_FILL_COLOR = '#6C7A89';
        PIN_SCALE = 1 / 30;
        break;
      case 'bus':
        MAP_PIN = 'M409.133,109.203c-19.608-33.592-46.205-60.189-79.798-79.796C295.736,9.801,259.058,0,219.273,0   c-39.781,0-76.47,9.801-110.063,29.407c-33.595,19.604-60.192,46.201-79.8,79.796C9.801,142.8,0,179.489,0,219.267   c0,39.78,9.804,76.463,29.407,110.062c19.607,33.592,46.204,60.189,79.799,79.798c33.597,19.605,70.283,29.407,110.063,29.407   s76.47-9.802,110.065-29.407c33.593-19.602,60.189-46.206,79.795-79.798c19.603-33.596,29.403-70.284,29.403-110.062   C438.533,179.485,428.732,142.795,409.133,109.203z';
        PIN_FILL_COLOR = '#6C7A89';
        PIN_SCALE = 1 / 30;
        break;
      case 'park':
        MAP_PIN = 'M409.133,109.203c-19.608-33.592-46.205-60.189-79.798-79.796C295.736,9.801,259.058,0,219.273,0   c-39.781,0-76.47,9.801-110.063,29.407c-33.595,19.604-60.192,46.201-79.8,79.796C9.801,142.8,0,179.489,0,219.267   c0,39.78,9.804,76.463,29.407,110.062c19.607,33.592,46.204,60.189,79.799,79.798c33.597,19.605,70.283,29.407,110.063,29.407   s76.47-9.802,110.065-29.407c33.593-19.602,60.189-46.206,79.795-79.798c19.603-33.596,29.403-70.284,29.403-110.062   C438.533,179.485,428.732,142.795,409.133,109.203z';
        PIN_FILL_COLOR = '#F7CA18';
        PIN_SCALE = 1 / 30;
        break;
      case 'gym':
        MAP_PIN = 'M409.133,109.203c-19.608-33.592-46.205-60.189-79.798-79.796C295.736,9.801,259.058,0,219.273,0   c-39.781,0-76.47,9.801-110.063,29.407c-33.595,19.604-60.192,46.201-79.8,79.796C9.801,142.8,0,179.489,0,219.267   c0,39.78,9.804,76.463,29.407,110.062c19.607,33.592,46.204,60.189,79.799,79.798c33.597,19.605,70.283,29.407,110.063,29.407   s76.47-9.802,110.065-29.407c33.593-19.602,60.189-46.206,79.795-79.798c19.603-33.596,29.403-70.284,29.403-110.062   C438.533,179.485,428.732,142.795,409.133,109.203z';
        PIN_FILL_COLOR = '#000';
        PIN_SCALE = 1 / 30;
        break;
      default:
        PIN_FILL_COLOR = '#FFF';
        break;
    }
    return (
      <Marker
        animation="BOUNCE"
        key={`Marker_${marker.markerKey}`}
        ref={`${marker.markerType}_Marker_${index}`}
        data-jobTitle={marker.markerTitle}
        data-formattedLocation={marker.formattedLocation}
        // data-jobTitle={marker.restaurantTitle}
        position={ new google.maps.LatLng(marker.coords) }
        // title={marker.restaurantTitle}
        icon={{
          path: MAP_PIN,
          scale: PIN_SCALE,
          fillColor: PIN_FILL_COLOR,
          fillOpacity: 1,
          strokeColor: '#FFF',
          strokeWeight: PIN_STROKE_WEIGHT
        }}
        onClick={onClick}
        zIndex={PIN_Z_INDEX} >

        { marker.showInfo ? this.renderInfoWindow(marker, index) : null }
      </Marker>
    );
  }

  centerMap(coordinates) {
    if (coordinates !== undefined) {
      const latitude = coordinates.lat;
      const longitude = coordinates.lng;
      return {
        lat: latitude,
        lng: longitude
       }
    } else {
      return this.state.jobMarkers.length ? this.state.jobMarkers[0].coords : this.state.defaultCenter;
    }
  }

  centerZoomOverUSA() {
    this.setState({ zoomLevel: 5 });
  }

  handleMarkerClick(targetMarker) {
    const type = targetMarker.markerType;
    const index = targetMarker.index;
    const targetMarkerCordinates = targetMarker.coords;
    this.centerMap(targetMarkerCordinates);
    this.props.selectItem(index, type);
  }

  closeAllMarkers() {
    let allMarkers = [
      this.props.jobMarkers,
      this.props.restaurantMarkers
    ];

    allMarkers.forEach(markerSet => {
      this.setState({
        markers: markerSet.map(marker => Object.assign( marker, {showInfo: false}))
      });
    });
  }

  jobMarkerCallbackHandler() {
    return this.state.jobMarkers.map((marker) => {
      return this.addMarker(marker, marker.index);
    });
  }

  restaurantMarkerCallbackHandler() {
    return this.state.restaurantMarkers.map((marker, index) => {
      return this.addMarker(marker, index);
    });
  }

  busMarkerCallbackHandler() {
    return this.state.busMarkers.map((marker, index) => {
      return this.addMarker(marker, index);
    });
  }

  trainMarkerCallbackHandler() {
    return this.state.trainMarkers.map((marker, index) => {
      return this.addMarker(marker, index);
    });
  }

  parkMarkerCallbackHandler() {
    return this.state.parkMarkers.map((marker, index) => {
      return this.addMarker(marker, index);
    });
  }

  gymMarkerCallbackHandler() {
    return this.state.gymMarkers.map((marker, index) => {
      return this.addMarker(marker, index);
    });
  }

}
