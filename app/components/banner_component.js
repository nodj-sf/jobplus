import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';

import SearchBar from '../containers/search_bar_container';


export default class Banner extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <AppBar
          iconElementLeft={<h1 style={{margin: '3px 0px', padding: '0px 5px', "fontSize": "2.5em", color: '#FFF', font: '2em Oswald, Raleway, sans-serif'}}>{["Job",<span style={{color: '#7A7A7A'}} key={1}>+</span>]}</h1>}
          children={<SearchBar />}
          style={{background: 'url("http://subtlepatterns2015.subtlepatterns.netdna-cdn.com/patterns/footer_lodyas.png")'}}
        />
    );
  };
}


// <h1 className='navLogoText'>Job+</h1>
