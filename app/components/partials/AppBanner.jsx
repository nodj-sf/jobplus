'use strict';
import React, { Component } from 'react';
import SearchBar from '../../containers/SearchBarContainer';
import AppLogo from '../../constants/svg/AppLogo_SVG';


const Banner = () => (
  <div className="bannerCont">
    <a href="/">
      <h1 className="intro-logo">
        <AppLogo />
      </h1>
    </a>
    <SearchBar className="twelve columns" />
  </div>
);

export default Banner;
