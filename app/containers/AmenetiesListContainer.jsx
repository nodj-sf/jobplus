'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BaseComponent from '../components/BaseComponent';
import DisplayList from './DisplayListContainer';
import { toggleGooglePlacesListContainer } from '../actions/index';


class AmenitiesList extends BaseComponent {
  constructor(props) {
    super(props);
    this.renderList = this.renderList.bind(this);
  }

  renderList(amenitiesList) {
    return amenitiesList.map((item, index, amenitiesList) =>
      <DisplayList
        item={ item }
        list={ item.list }
        listType={ item.listType }
        key={ `DisplayList_${item.listType}` }
        job={ this.props.activeJob }
        toggler={ this.props.toggleContainerDisplay } />
    );
  }

  render() {
    const listMap = [
      {
        list: this.props.activeParks,
        listType: 'Park',
        listCategory: 'Amenity',
        listImage: {
          headerGlyph: {
            sourceURL: 'http://goo.gl/GLF2Rk',
            altDescription: 'Park amenity landscape glyph icon (Green).'
          },
          fallbackGraphic: {
            sourceURL: 'http://goo.gl/1YTep6',
            altDescription: 'Fallback park amenity placeholder graphic (Light Green).'
          }
        },
        headerStyle: {
          backgroundColor: 'rgba(90, 153, 126, 0.79)'
        }
      }, {
        list: this.props.activeGyms,
        listType: 'Gym',
        listCategory: 'Amenity',
        listImage: {
          headerGlyph: {
            sourceURL: 'http://goo.gl/zeyx0P',
            altDescription: 'Gym amenity dumbell glyph icon (Black).'
          },
          fallbackGraphic: {
            sourceURL: 'http://goo.gl/OYfm0X',
            altDescription: 'Fallback gym amenity placeholder graphic (Gray).'
          }
        },
        headerStyle: {
          backgroundColor: 'hsla(0, 0%, 20%, 0.57)'
        }
      }
    ];

    return (
      (this.props.loading) ?
        <div className='restaurantContainer' style={{ minHeight: '200px' }}>
          {[
            <i
              className='fa fa-refresh fa-spin fa-5x fa-fw loadingSpinner'
              key='RefreshLoaderAnimation'>
            </i>,
            `\tLoading...`
          ]}
        </div> :
        <div>{ this.renderList(listMap) }</div>
    );
  }
}


let mapStateToProps = (state) => ({
  activeJob: state.activeJob,
  activeParks: state.activeParks,
  activeGyms: state.activeGyms,
  loading: state.loading,
  toggleContainerDisplay: state.toggleContainerDisplay
});

let mapDispatchToProps = (dispatch) => bindActionCreators({
  toggleGooglePlacesListContainer
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AmenitiesList);
