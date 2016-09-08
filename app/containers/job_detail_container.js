import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Router, Route, hashHistory, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import BaseComponent from '../components/base_component';


class JobDetail extends BaseComponent {
  constructor(props) {
    super(props);
  }

  render() {
    let details = '';
    if (this.props.scrapDetails) {
      details = this.props.scrapDetails.data.details;
    }

    return !this.props.job ? 
      <h1>Job</h1> :
      (<div className="job-detail">
        <h3>
          <a 
            href={this.props.job.url} 
            className="expandFromCenter" 
            target="_blank">{ this.props.job.jobtitle }</a>
        </h3>
        <h4>{ this.props.job.company }</h4> 
        <hr />
        <h6>
          {[
            /hour/gmi.test(this.props.formattedRelativeTime) ?
              <i className="fa fa-clock-o" key="FA-Clock-Face_Glyph"></i> :
              <i className="fa fa-location-arrow" key="FA-Directional-Arrow_Glyph"></i>,
            `\t`,
            this.props.job.formattedLocation
          ]}
        </h6>
        <p>
          {[
            <i className="fa fa-calendar" key="FA-Calendar_Glyph"></i>,
            `\t`,
            this.props.job.formattedRelativeTime
          ]}
        </p>
        <blockquote>
          {[
            details,
            `\u2026`,
            <a href={ this.props.job.url } className="link-state" target="_blank" key={ `JobURL_${this.props.job.key}` }>More</a>
          ]}
        </blockquote>
      </div>
      );
  }
}

let mapStateToProps = (state) => ({ 
  job: state.activeJob,
  scrapDetails: state.scrapDetails
});

let mapDispatchToProps = (dispatch) => bindActionCreators({
  push 
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(JobDetail);
