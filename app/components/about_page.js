import React, { Component } from 'react';

import Footer from './footer_component';


export default class AboutPage extends Component {
  
  renderTeamMemberProfiles(team) {
    return team.map(member => {
      return (
        <div className="profileCard">
          <div className="teamProfPics">
            <img src={ member.profilePic.url } alt={ member.profilePic.descript } />
          </div>
          <div className="socialShare_Container">
            <div>
              <h4>{ member.name }</h4>
              <h6>{ member.job }</h6>
            </div>
            <div className="socialMediaIcons">
              <a href={ member.social.GitHub } target="_blank">
                <img src="http://goo.gl/j932OM" alt="GitHub OctoCat logo (Black)." />
              </a>
              <a href={ member.social.LinkedIn } target="_blank">
                <img src="http://goo.gl/UIzz0I" alt="LinkedIn logo (Blue)." />
              </a>
            </div>
          </div>
        </div>
      );
    });  
  }

  render() {
    const teamMemberProfiles = [
      {
        name: "Oliver Isenrich",
        job: "Full-Stack Engineer",
        profilePic: { url: "http://goo.gl/HEDVQG", descript: "Profile Photo - Isenrich, Oliver" },
        social: { GitHub: "https://github.com/IsenrichO", LinkedIn: "https://www.linkedin.com/in/isenricholiver" }
      }, {
        name: "Damon Nguyen",
        job: "Full-Stack Engineer",
        profilePic: { url: "http://goo.gl/zTlonL", descript: "Profile Photo - Nguyen, Damon" },
        social: { GitHub: "https://github.com/damonnguyen92", LinkedIn: "https://www.linkedin.com/in/damonnguyen92" }
      }, {
        name: "Nick Daniele",
        job: "Full-Stack Engineer",
        profilePic: { url: "http://goo.gl/1b09P5", descript: "Profile Photo - Daniele, Nick" },
        social: { GitHub: "https://github.com/nickdaniele", LinkedIn: "https://www.linkedin.com/in/ngdaniele" }
      }, {
        name: "Justin Lien",
        job: "Full-Stack Engineer",
        profilePic: { url: "http://goo.gl/Vwr1zt", descript: "Profile Photo - Lien, Justin" },
        social: { GitHub: "https://github.com/JustinLien", LinkedIn: "https://www.linkedin.com/in/justinmlien" }
      }
    ];

    return (
      <div style={{ width: "100vw", height: "100vh", background: "#F5F5F5" }}>  
        <div className='bannerCont'>
          <a href='/'>
            <h1 className='intro-logo'>
              {[
                'Job',
                <span key={ "logo-Plus_Span" }>+</span>
              ]}
            </h1>
          </a>
        </div>

        <div className="meetTheTeam_Container">{ this.renderTeamMemberProfiles(teamMemberProfiles) }</div>
        <Footer />
      </div>
    );
  }
};
