'use strict';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Router, Route, hashHistory, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import BaseComponent from '../components/base_component';
import { activeJob, scrapeDetails } from '../actions/index';
import BusinessIcon from '../../assets/img/business-icon.svg';


class JobDetail extends BaseComponent {
  constructor(props) {
    super(props);
    this.renderLogo = this.renderLogo.bind(this);
    this.state = { companyLogoURL: this.props.activeCompanyData.logo };
  }

  // componentDidMount() {
    // this.setState({ companyLogoURL: this.props.activeCompanyData.logo });
    // this.refs.img.src = this.props.activeCompanyData.logo;
    // console.log('REF IMG:', this.refs.img);
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.activeCompanyData.logo !== undefined) {
  //     this.setState({ companyLogoURL: nextProps.activeCompanyData.logo });
  //     console.log('NEXT PROPS:', nextProps);
  //   }
  // }

  renderLogo() {
    const logoURL = this.props.activeCompanyData.logo;
    console.log('CALLING RENDER_LOGO', logoURL, BusinessIcon);

    // ? 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Example_image.png'
    this.refs.img.src = (
      !logoURL
        ? BusinessIcon
        : `${this.props.activeCompanyData.logo}?size=100`
    );
  }

  componentWillReceiveProps(nextProps) {
    this.renderLogo();
  }

  componentDidMount() { this.renderLogo(); }

  render() {
    let details = '',
        currentJob = this.props.job;
    if (this.props.scrapeDetails) {
      details = this.props.scrapeDetails.data.details;
    }

    return !this.props.job
      ? ( <h1>Job</h1> )
      : (
        <div className="job-detail">
          <h3 className="textEllipsis">
            <a
              href={ this.props.job.url }
              className='expandFromCenter'
              target='_blank'>
              { this.props.job.jobtitle }
            </a>
          </h3>
          <div className="job-company-header">
            <div>
              <img
                ref="img"
                src={ this.renderLogo }
                alt={ `${this.props.job.company} corporate logo (100px).` }
                onError={ () => this.src='https://upload.wikimedia.org/wikipedia/commons/c/ce/Example_image.png' } />
            </div>
            <div>
              <a
                href={ `http://${this.props.activeCompanyData.domain}` }
                target="_blank"
                rel="external">
                <h4>{ this.props.job.company }</h4>
              </a>
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


// this.parseAndFormatJobTitle(currentJob.jobtitle)
