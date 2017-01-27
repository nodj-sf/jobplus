'use strict';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Router, Route, hashHistory, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import BaseComponent from '../components/BaseComponent';
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
          <h3 className="text-of">
            <a
              href={ currentJob.url }
              className="expandFromCenter"
              target="_blank">
              { currentJob.jobtitle }
            </a>
          </h3>
          <div className="job-company-header">
            <div>
              <img
                ref="img"
                src={ this.renderLogo }
                alt={ `${currentJob.company} corporate logo (100px).` }
                onError={ () => this.src='https://upload.wikimedia.org/wikipedia/commons/c/ce/Example_image.png' } />
            </div>
            <div>
              <a
                href={ `http://${this.props.activeCompanyData.domain}` }
                target="_blank"
                rel="external">
                <h4>{ currentJob.company }</h4>
              </a>
              <hr />
              <div className="job-meta-info">
                <h6>
                  {[
                    /hour/gmi.test(this.props.formattedRelativeTime) ?
                      (
                        <i
                          key="FA-Clock-Face_Glyph"
                          className="fa fa-clock-o"
                          title="Job posting time" />
                      ) : (
                        <i
                          key="FA-Directional-Arrow_Glyph"
                          className="fa fa-location-arrow"
                          title="Job posting location" />
                      ),
                    `\t${currentJob.formattedLocation}`
                  ]}
                </h6>
                <h6>
                  {[
                    <i
                      key="FA-Calendar_Glyph"
                      className="fa fa-calendar"
                      title="Job posting date" />,
                    `\t${currentJob.formattedRelativeTime}`
                  ]}
                </h6>
                <h6>
                  {[
                    <i
                      key="FA-Certificate_Glyph"
                      className="fa fa-certificate"
                      title="Job post source" />,
                    `\tvia ${currentJob.source}`
                  ]}
                </h6>
              </div>
            </div>
          </div>

          <blockquote>{ `${details}\u2026` }</blockquote>
          <a
            href={ currentJob.url }
            className="link-state expandFromCenter"
            target="_blank"
            key={ `JobURL_${currentJob.key}` }>
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
