import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';

import { setOrigin, setDestination, unSetOrigin, unSetDestination } from '../actions/index';

class SetDirectionButtons extends Component {
  constructor(props) {
    super(props);
    this.setOrigin = this.setOrigin.bind(this);
    this.unSetOrigin = this.unSetOrigin.bind(this);
    this.setDestination = this.setDestination.bind(this);
    this.unSetDestination = this.unSetDestination.bind(this);
  }

  setOrigin() {
    // this.props.setOrigin();
  }

  setDestination() {
    // this.props.setDestination();
  }

  unSetOrigin() {
    this.props.unSetOrigin();
  }
  unSetDestination() {
    this.props.unSetDestination();
  }

  render() {
    const { direction_origin, direction_destination } = this.props;
    const unsetColor = 'rgba(0, 0, 0, 0.3)';
    const originButtonColor = Object.keys(direction_origin).length > 0 ? '#4688F1' : unsetColor;
    const destinationButtonColor = Object.keys(direction_destination).length > 0 ? '#EC644B' : unsetColor;

    const setOriginButton = (
      <IconButton
        tooltip={ direction_origin ? null : 'set origin'}
        iconStyle={{color: originButtonColor}}
        children={
          <i className="material-icons direction-icon">fiber_manual_record</i>
        }
      />
    );
    const setDestinationButton = (
      <IconButton
        tooltip={ direction_origin ? null : 'set destination'}
        iconStyle={{color: destinationButtonColor}}
        children={
          <i className="material-icons direction-icon">fiber_manual_record</i>
        }
      />
    );
    return (
      <div className="col-xs-12 text-center" style={{height: 200}}>
        <div style={{color: 'rgba(0, 0, 0, 0.54)'}}>Set direction</div>
        { setOriginButton }
        { setDestinationButton }
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  const { direction_origin, direction_destination } = state.globalReducer;
  return {
    direction_origin,
    direction_destination
  };
};

export default connect(mapStateToProps, {
  setOrigin,
  setDestination,
  unSetOrigin,
  unSetDestination
})(SetDirectionButtons);
