import React, { Component, PropTypes } from 'react';
import { Router, Route, hashHistory, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import RaisedButton from 'material-ui/RaisedButton';

import { fetchJobs, userSearchInputs, jobInputTerm, locationInputTerm } from '../actions/index';


class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.onJobTitleInputChange = this.onJobTitleInputChange.bind(this);
    this.onLocationInputChange = this.onLocationInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onJobTitleInputChange(evt) {
    evt.preventDefault();
    this.props.jobInputTerm(evt.target.value).payload;
  }

  onLocationInputChange(evt) {
    evt.preventDefault();
    this.props.locationInputTerm(evt.target.value).payload;
  }

  onFormSubmit(evt) {
    evt.preventDefault();
    this.props.fetchJobs(this.props.jobTerm, this.props.locationTerm);
    this.props.push('/results');
  }

  render() {
    return (
      <div className="col-xs-12 text-center" style={{padding: 0, paddingTop: 10}}>
        <form className="col-xs-12" style={{marginBottom: 0, paddingLeft: 0, paddingRight: 0}} onSubmit={this.onFormSubmit}>
          <input
            type="search"
            className="col-xs-5 col-md-5"
            results="4"
            placeholder="Job"
            defaultValue={this.props.jobTerm}
            onChange={this.onJobTitleInputChange}
          />
          <input
            type="search"
            className="col-xs-5 col-md-5"
            results="4"
            placeholder="City"
            defaultValue={this.props.locationTerm}
            onChange={this.onLocationInputChange}
          />
          <div className="col-xs-2 col-md-2" style={{padding: 0}}>
            <RaisedButton fullWidth={true} label={<i className="material-icons" style={{padding: 6}}>search</i>} type="submit" primary={true} />
          </div>
        </form>
      </div>
    );
  }
};


let mapStateToProps = (state) => ({
  jobTerm: state.jobInputTerm,
  locationTerm: state.locationInputTerm
});

let mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchJobs,
  jobInputTerm,
  locationInputTerm,
  userSearchInputs,
  push
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
