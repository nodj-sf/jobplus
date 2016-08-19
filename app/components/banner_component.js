import React, { Component } from 'react';

import SearchBar from '../containers/search_bar_container';


export default class Banner extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='bannerCont'>
        <a href='/'>
          <h1 className='navLogoText'>Job+</h1>
        </a>
        <SearchBar className="twelve columns" /> 
      </div>
    );
  };
}
