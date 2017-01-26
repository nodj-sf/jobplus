'use strict';
import React, { Component } from 'react';
import SearchBarHome from '../../containers/SearchBarContainer_Home';
import Footer from '../partials/AppFooter';


export default class LandingPage extends Component {
  render() {
    return (
      <div>
        <div id='bckgHero'>
          <h1 className='intro-logo'>
            {[
              'Job',
              <span key='logo-Plus_Span'>+</span>
            ]}
          </h1>
          <SearchBarHome />
        </div>

        <Footer />
      </div>
    );
  }
};
