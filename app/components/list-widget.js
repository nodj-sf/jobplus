import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'material-ui/Card';

import TabComponent from './tab-component';

class ListWidget extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const displayListWidget = !this.props.displayPrompt ? true : false;
    const listWidgetStyle = {
      position: 'absolute',
      zIndex: 1,
      width: 350,
      height: 700,
      display: displayListWidget ? 'block' : 'none'
    };
    return (
      <Card
        style={listWidgetStyle}
        zDepth={4}
        className="hidden-xs fadeIn animated"
      >
        <TabComponent />
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

export default connect(mapStateToProps, {})(ListWidget);
