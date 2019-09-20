import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';

class LoadPlaceholder extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const loadPlaceholderStyle = {
      width: '100%',
      height: 550,
      zIndex: 9,
      backgroundColor: 'red'
    };
    return (
      <div style={loadPlaceholderStyle}>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps, {})(LoadPlaceholder);
