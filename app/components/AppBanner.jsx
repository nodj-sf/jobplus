'use strict';
import React, { Component } from 'react';
import SearchBar from '../containers/SearchBarContainer';


const Banner = () => (
  <div className="bannerCont">
    <a href="/">
      <h1 className="intro-logo">
        {[
          'Job',
          <span key="logo-Plus_Span">+</span>
        ]}
      </h1>
    </a>
    <SearchBar className="twelve columns" />
  </div>
);

export default Banner;

// <h1 className='navLogoText'>Job+</h1>
