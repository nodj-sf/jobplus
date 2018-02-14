import React, { Component, PropTypes } from 'react';
import { Router, Route, hashHistory, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TextField from 'material-ui/TextField';
import SvgIcon from 'material-ui/SvgIcon';


import {
  fetchJobs,
  userSearchInputs,
  jobInputTerm,
  locationInputTerm,
  hidePrompt,
  toggleDrawer,
  showFloatingListButton,
  setJobs,
  setQueries,
  setInitialLongLat,
  toggleKeys,
  toggleDialog
} from '../actions/index';


class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleInputValue: '',
      cityInputValue: '',
      displaySearchBar: true
    };
    this.onChangeTitleInputField = this.onChangeTitleInputField.bind(this);
    this.onChangeCityInputField = this.onChangeCityInputField.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.toggleSearchBar = this.toggleSearchBar.bind(this);
    this._enterSubmit = this._enterSubmit.bind(this);
    this.toSubmitOrNot = this.toSubmitOrNot.bind(this);
  }

  onChangeTitleInputField(event) {
    event.preventDefault();
    const titleInputValue = event.target.value;
    this.setState({titleInputValue});
  }

  onChangeCityInputField(event) {
    event.preventDefault();
    const cityInputValue = event.target.value;
    this.setState({cityInputValue});
  }

  onFormSubmit(event) {
    event.preventDefault();
    const title = this.state.titleInputValue;
    const city = this.state.cityInputValue;
    this.props.fetchJobs(title, city)
      .then((response) => {
        const jobs = response.data.results;
        const title = response.data.query;
        const city = response.data.location;
        if (jobs.length === 0) {
          this.props.toggleDialog();
        } else {
          const longitude = jobs[0].longitude;
          const latitude = jobs[0].latitude;
          this.props.setInitialLongLat(longitude, latitude);
        }
        this.props.setQueries(title, city);
        this.props.setJobs(jobs);
      })
  }

  toggleSearchBar() {
    this.setState({
      displaySearchBar: !this.state.displaySearchBar
    });
  }

  _enterSubmit(event) {
      this.onFormSubmit(event);
      this.toggleSearchBar();
  }

  toSubmitOrNot(event) {
    const keyPressType = event.key;
    if (keyPressType === 'Enter') {
      this.props.hidePrompt();
      this.props.toggleKeys();
      this.props.showFloatingListButton();
      return this._enterSubmit(event);
    } else {
      return null;
    }
  }

  render() {
    const searchBarStyle = {
      padding: 0,
      position: 'absolute',
      zIndex: 1,
      top: '20%',
      display: this.state.displaySearchBar ? 'inline-block' : 'none'
    };
    const inputStyle = {
      height: 50,
      outline: 'none',
      backgroundColor: '#6C7A89',
      color: 'white',
      border: 'none',
      boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 45px, rgba(0, 0, 0, 0.22) 0px 10px 18px'
    };
    const floatingSearchButtonStyle = {
      position: 'absolute',
      zIndex: 1,
      top: '80.5%',
      left: '91.5%'
    };

    const floatingListButtonStyle = {
      position: 'absolute',
      zIndex: 1,
      top: '80.5%',
      left: '33.3%',
      display: this.props.displayListButton ? 'block' : 'none'
    };

    const jobIcon = (
      <SvgIcon>
        <path fill="#000000" d="M10,2H14A2,2 0 0,1 16,4V6H20A2,2 0 0,1 22,8V19A2,2 0 0,1 20,21H4C2.89,21 2,20.1 2,19V8C2,6.89 2.89,6 4,6H8V4C8,2.89 8.89,2 10,2M14,6V4H10V6H14Z" />
      </SvgIcon>
    );    

    const buildingIcon = (
      <SvgIcon>
        <path fill="#000000" d="M18,15H16V17H18M18,11H16V13H18M20,19H12V17H14V15H12V13H14V11H12V9H20M10,7H8V5H10M10,11H8V9H10M10,15H8V13H10M10,19H8V17H10M6,7H4V5H6M6,11H4V9H6M6,15H4V13H6M6,19H4V17H6M12,7V3H2V21H22V7H12Z" />
      </SvgIcon>
    );

    return (
      <div>
        <div className="search-bar-style col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-4 col-md-8 col-md-offset-4 fadeIn animated" style={searchBarStyle}>
          <form onKeyPress={this.toSubmitOrNot}>
            <TextField
              type="search"
              className="col-xs-6"
              style={inputStyle}
              results="4"
              hintText="Job"
              hintStyle={{color: 'white'}}
              inputStyle={{color: 'white'}}
              defaultValue={this.props.jobTerm}
              onChange={this.onChangeTitleInputField}
              underlineShow={false}

            />
            <TextField
              type="search"
              className="col-xs-6"
              style={inputStyle}
              results="4"
              hintText="City"
              hintStyle={{color: 'white'}}
              inputStyle={{color: 'white'}}
              defaultValue={this.props.locationTerm}
              onChange={this.onChangeCityInputField}
              underlineShow={false}

            />
          </form>
        </div>
        <FloatingActionButton
          className="search-button floating-search-button-style"
          style={floatingSearchButtonStyle}
          zDepth={4}
          onClick={this.toggleSearchBar}
        >
          <i className="material-icons">search</i>
        </FloatingActionButton>

        <FloatingActionButton
          className="list-button hidden-sm hidden-md hidden-lg floating-search-button-style"
          style={floatingListButtonStyle}
          zDepth={4}
          onClick={this.props.toggleDrawer}
        >
          <i className="material-icons">view_list</i>
        </FloatingActionButton>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  const { displayPrompt, displayListButton } = state.globalReducer;
  return {
    displayPrompt,
    displayListButton
  };
};

export default connect(mapStateToProps, {
  fetchJobs,
  jobInputTerm,
  locationInputTerm,
  userSearchInputs,
  push,
  hidePrompt,
  toggleDrawer,
  showFloatingListButton,
  setJobs,
  setQueries,
  setInitialLongLat,
  toggleKeys,
  toggleDialog
})(SearchBar);
