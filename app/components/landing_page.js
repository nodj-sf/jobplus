import React, { Component } from 'react';

import SearchBar from '../containers/search_bar_container';


class LandingPage extends Component {
 render() {
   return (
    <div className="col-xs-12" style={{padding: 0}}>
      <div id="bckgHero" className="mobileTopUnset mobileFullHeight col-xs-12">
        <h1 className="intro-logo" style={{ "top": "28%", "left": "50%", "transform": "translateX(-50%)", "fontSize": "10vh" }}>
          {["Job",
            <span key={1}>+</span>
          ]}
        </h1>
      </div>
      <div className="mobileLandingSearchBar col-xs-12">
        <SearchBar />
      </div>
    </div>
   );
 }
}

export default LandingPage;
