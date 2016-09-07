import React, { Component } from 'react';

import BaseComponent from './base_component';


export default class AboutPage extends BaseComponent {
  
  renderTeamMemberProfiles() {
    
  }

  render() {
    return (
      <div style={{ width: "100vw", height: "100vh", background: "linear-gradient(0deg, #8E9EAB, #EEF2F3)" }}>
        <h4>My name is Oliver!</h4>
        <img src="http://goo.gl/HEDVQG" className="teamProfPics" alt="Profile Photo - Isenrich, Oliver" />
      </div>
    );
  }
};

