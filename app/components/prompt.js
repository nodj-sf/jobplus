import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';

class Prompt extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const promptStyle = {
      position: 'absolute',
      zIndex: 1,
      width: 300,
      height: 500,
      display: this.props.displayPrompt ? 'block' : 'none',
      backgroundColor: '#6C7A88'
    };

    const subHeaderStyle = {
      position: 'absolute', 
      color: 'white', 
      top: '59%',
      left: '41%',
      fontFamily: 'sans-serif'
    };

    return (
      <Card style={promptStyle} zDepth={4} className="hidden-xs">
        <Card className="col-xs-12" style={{backgroundColor: '#6C7A88'}}>
          <img className="img-responsive" style={{width: 250}} src="https://image.ibb.co/nazJLn/white_logo_transparent_background.png" alt="Jobplus" border="0" />
          <h6 className="text-center" style={subHeaderStyle}>Search Jobs & Discover</h6>
        </Card>
        <div className="col-xs-12" style={{backgroundColor: '#FFFFFF', boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px'}}>
          <div className="col-xs-8 col-xs-offset-2" style={{marginTop: 25}}>
            <Subheader>Powered by</Subheader>
            <img className="img-responsive" src="https://image.ibb.co/fKvUwH/Google_Logo.png" alt="Google_Logo" border="0" />
            <img className="img-responsive" src="https://image.ibb.co/c1vOOx/yelp.png" alt="yelp" border="0" />
            <img className="img-responsive" src="https://image.ibb.co/ehnEVc/indeed_logo1.png" alt="indeed_logo1" border="0" />
          </div>
        </div>
      </Card>
    );
  }
};

const mapStateToProps = (state) => {
  const { displayPrompt } = state.globalReducer;
  return {
    displayPrompt
  };
};

export default connect(mapStateToProps, {})(Prompt);
