'use strict';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Router, Route, hashHistory, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import BaseComponent from '../components/base_component';
import { activeJob, scrapeDetails } from '../actions/index';


class JobDetail extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = { companyLogoURL: '' };
  }

  componentDidMount() {
    // this.setState({ companyLogoURL: this.props.activeCompanyData.logo });
    // this.refs.img.src = this.props.activeCompanyData.logo;
    // console.log('REF IMG:', this.refs.img);
  }

  render() {
    let details = '';
    if (this.props.scrapeDetails) {
      details = this.props.scrapeDetails.data.details;
    }

    return !this.props.job
      ? ( <h1>Job</h1> )
      : (
        <div className='job-detail'>
          <h3>
            <a
              href={ this.props.job.url }
              className='expandFromCenter'
              target='_blank'>
              { this.props.job.jobtitle }
            </a>
          </h3>
          <div className="job-company-header">
            <img
              ref="img"
              src={ `${this.props.activeCompanyData.logo}?size=100` }
              alt={ `${this.props.job.company} corporate logo (100px).` }
              onError={ () => this.src='https://upload.wikimedia.org/wikipedia/commons/c/ce/Example_image.png' } />
            <div>
              <h4>{ this.props.job.company }</h4>
              <hr />
              <div className="job-meta-info">
                <h6>
                  {[
                    /hour/gmi.test(this.props.formattedRelativeTime)
                      ? <i
                        className='fa fa-clock-o'
                        key='FA-Clock-Face_Glyph' />
                      : <i
                        className='fa fa-location-arrow'
                        key='FA-Directional-Arrow_Glyph' />,
                    `\t`,
                    this.props.job.formattedLocation
                  ]}
                </h6>
                <h6>
                  {[
                    <i
                      className='fa fa-calendar'
                      key='FA-Calendar_Glyph' />,
                    `\t`,
                    this.props.job.formattedRelativeTime
                  ]}
                </h6>
              </div>
            </div>
          </div>

          <blockquote>
            {[
              details,
              `\u2026`,
            ]}
          </blockquote>
          <a
            href={ this.props.job.url }
            className='link-state expandFromCenter'
            target='_blank'
            key={ `JobURL_${this.props.job.key}` }>
            More
          </a>
        </div>
      );
  }
}

let mapStateToProps = (state) => ({
  job: state.activeJob,
  activeCompanyData: state.activeCompanyData,
  scrapeDetails: state.scrapeDetails
});

let mapDispatchToProps = (dispatch) => bindActionCreators({
  push
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(JobDetail);
