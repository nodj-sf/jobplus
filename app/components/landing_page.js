import React, { Component } from 'react';

import SearchBar from '../containers/search_bar_container';
import Footer from './footer_component';


export default class LandingPage extends Component {
  render() {
    return (
      <div>
        <div id="bckgHero">
          <h1 className="intro-logo">
            {[
              'Job',
              <span key={1}>+</span>
            ]}
          </h1>
          <SearchBar />
        </div>

        <Footer />
      </div>
    );
  }
};
