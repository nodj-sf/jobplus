import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
  selectJob,
  fetchRestaurants,
  setRestaurants,
  fetchTrains,
  setTrains,
  fetchBus,
  setBus,
  fetchGyms,
  setGyms,
  fetchParks,
  setParks,
  scrapDetail,
  loading
} from '../actions/index';

import GMap from './GMap';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import loadPlaceholderStyle from './load-placeholder';
import SearchBar from './search-bar';
import TabComponent from './tab-component';
import ListWidget from './list-widget';
import Prompt from './prompt';
import Keys from './keys';
import styles from './app.css'

function handleActive(tab) {
  alert(`A tab with this route property ${tab.props['data-route']} was activated.`);
}


class JobPlus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openDialog: this.props.displayDialog
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState({
      open: !this.state.open
    });
  }

  componentWillReceiveProps(nextProps, nextState) {
    const city = nextProps.city;
    const longitude = nextProps.initialLongitude;
    const latitude = nextProps.initialLatitude;
    if (longitude && latitude) {
      this.props.fetchTrains(latitude, longitude)
        .then((results) => {
          const trains = results.data.results;
          this.props.setTrains(trains);
        });
      this.props.fetchBus(latitude, longitude)
        .then((results) => {
          const bus = results.data.results;
          this.props.setBus(bus);
        });
      this.props.fetchGyms(latitude, longitude)
        .then((results) => {
          const gyms = results.data.results;
          this.props.setGyms(gyms);
        });
      this.props.fetchParks(latitude, longitude)
        .then((results) => {
          const parks = results.data.results;
          this.props.setParks(parks);
        });
    }
    if (city && longitude && latitude) {
      this.props.fetchRestaurants(city, latitude, longitude)
        .then((results) => {
          const restaurants = results.data;
          this.props.setRestaurants(restaurants);
        });
    }
  }

  render() {
    console.log('this.state', this.state)
    return (
      <div style={{height: '100%', width: '100%', padding: 0, position: 'fixed'}}>
        <SearchBar />
        <Prompt />
        <ListWidget />
        <Keys />
        <Drawer open={this.props.displayDrawer} style={{zIndex: 10}} width='100%'>
          <TabComponent />
        </Drawer>
        <Dialog
          modal={true}
          open={this.state.openDialog}
          style={{zIndex: 5}}
        >
          Sorry, but we cannot find any listing for that search. Please input different search query. <RaisedButton className="text-center" label="ok" primary={true} style={{marginLeft: 10}} />
        </Dialog>
        <GMap />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  const { title, city, initialLongitude, initialLatitude, displayDrawer, jobs, displayDialog } = state.globalReducer;
  return {
    title,
    city,
    initialLongitude,
    initialLatitude,
    displayDrawer,
    jobs,
    displayDialog
  };
};

export default connect(mapStateToProps, {
  selectJob,
  fetchRestaurants,
  setRestaurants,
  fetchBus,
  setBus,
  fetchTrains,
  fetchParks,
  setParks,
  fetchGyms,
  setGyms,
  scrapDetail,
  loading,
  fetchTrains,
  setTrains
})(JobPlus);
