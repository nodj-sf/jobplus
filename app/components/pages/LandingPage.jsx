'use strict';
import React, { Component } from 'react';
import SearchBarPrimary from '../../containers/SearchBarContainer_Primary';
import AppLogo from '../../constants/svg/AppLogo_SVG';
import Footer from '../partials/AppFooter';


const LandingPage = () => (
  <div>
    <div id="bckg-hero">
      <h1 className="intro-logo">
        <AppLogo />
      </h1>
      <SearchBarPrimary />
    </div>
    <Footer />
  </div>
);

export default LandingPage;
