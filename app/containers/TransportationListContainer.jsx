'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import BaseComponent from '../components/BaseComponent';
import DisplayList from './DisplayListContainer';
import { toggleGooglePlacesListContainer, loading } from '../actions/index';


class TransportationList extends BaseComponent {
  constructor(props) {
    super(props);
    // this.delayOnLoad = this.delayOnLoad.bind(this);
    // this.getData = this.getData.bind(this);
  }

  assignDisplayClass(obj) {
    return obj === 'flex' ? 'GPlacesList container' : 'GPlacesList container inactive';
  }

  renderList(transportationList) {
    return transportationList.map((transportItem, index, transportationList) =>
      <DisplayList
        item={ transportItem }
        list={ transportItem.list }
        listType={ transportItem.listType }
        key={ `DisplayList_${transportItem.listType}` }
        job={ this.props.activeJob }
        toggler={ this.props.toggleContainerDisplay } />
    );
  }

  render() {
    const listMap = [
      {
        list: this.props.activeTrains,
        listType: 'Train',
        listCategory: 'Transit',
        listImage: {
          headerGlyph: {
            sourceURL: 'http://goo.gl/XzVRW7',
            altDescription: 'Subway/metro transport glyph icon (Blue).'
          },
          fallbackGraphic: {
            sourceURL: 'http://goo.gl/cYuu6z',
            altDescription: 'Fallback subway/metro transport placeholder graphic (Blue).'
          }
        },
        headerStyle: {
          backgroundColor: 'hsla(222, 100%, 63%, 0.79)'
        }
      }, {
        list: this.props.activeBus,
        listType: 'Bus',
        listCategory: 'Transit',
        listImage: {
          headerGlyph: {
            sourceURL: 'http://goo.gl/wa4ylN',
            altDescription: 'Bus transport glyph icon (Green).'
          },
          fallbackGraphic: {
            sourceURL: 'http://goo.gl/0ZTNZR',
            altDescription: 'Fallback bus transport placeholder graphic (Green).'
          }
        },
        headerStyle: {
          backgroundColor: 'hsla(138, 37%, 47%, 0.82)'
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
        <div>
          { this.renderList(listMap) }
        </div>
    );
  }
};

let mapStateToProps = (state) => ({
  activeJob: state.activeJob,
  activeTrains: state.activeTrains,
  activeBus: state.activeBus,
  loading: state.loading,
  toggleContainerDisplay: state.toggleContainerDisplay
});

let mapDispatchToProps = (dispatch) => bindActionCreators({
  toggleGooglePlacesListContainer
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TransportationList);
