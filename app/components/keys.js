import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';

class Keys extends Component {
  render() {
    const keysStyle = {
      position: 'fixed',
      zIndex: 5,
      left: '88%'
    };
    const mobileKeysStyle = {
      fontSize: '.8em',
      display: 'inline-block'
    };
    const mobileKeysContainerStyle = {
      position: 'absolute',
      width: '100%',
      display: this.props.displayKeys ? 'block' : 'none'
    }
    const listItemStyle = {
      fontSize: '1em',
      maxHeight: 35,
      paddingBottom: 16,
      cursor: 'default',
      display: this.props.displayKeys ? 'block' : 'none'
    };
    return (
      <div>
        <Card className="hidden-xs fadeIn animated" style={keysStyle} zDepth={4}>
          <List>
            <ListItem style={listItemStyle} primaryText="Jobs" hoverColor="#FFFFFF" leftIcon={<i className="material-icons" style={{color: '#52B3D9'}}>fiber_manual_record</i>} />
            <ListItem style={listItemStyle} primaryText="Restaurants" hoverColor="#FFFFFF" leftIcon={<i className="material-icons" style={{color: '#D64541'}}>fiber_manual_record</i>} />
            <ListItem style={listItemStyle} primaryText="Bus/Trains" hoverColor="#FFFFFF" leftIcon={<i className="material-icons" style={{color: '#6C7A89'}}>fiber_manual_record</i>} />
            <ListItem style={listItemStyle} primaryText="Gyms" hoverColor="#FFFFFF" leftIcon={<i className="material-icons" style={{color: '#F7CA18'}}>fiber_manual_record</i>} />
            <ListItem style={listItemStyle} primaryText="Parks" hoverColor="#FFFFFF" leftIcon={<i className="material-icons" style={{color: '#000'}}>fiber_manual_record</i>} />
          </List>
        </Card>
        <Card className="hidden-sm hidden-md hidden-lg fadeIn animated" style={mobileKeysContainerStyle}>
          <span>
            <i className="material-icons" style={{color: '#52B3D9'}}>fiber_manual_record</i> <p style={mobileKeysStyle}>Jobs</p>
          </span>
          <span>
            <i className="material-icons" style={{color: '#D64541'}}>fiber_manual_record</i> <p style={mobileKeysStyle}>Restaurants</p>
          </span>
          <span>
            <i className="material-icons" style={{color: '#6C7A89'}}>fiber_manual_record</i> <p style={mobileKeysStyle}>Bus/Trains</p>
          </span>
          <span>
            <i className="material-icons" style={{color: '#F7CA18'}}>fiber_manual_record</i> <p style={mobileKeysStyle}>Gyms</p>
          </span>
          <span>
            <i className="material-icons" style={{color: '#000'}}>fiber_manual_record</i> <p style={mobileKeysStyle}>Parks</p>
          </span>
        </Card>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  const { displayKeys } = state.globalReducer;
  return {
    displayKeys
  }
};

export default connect(mapStateToProps, {})(Keys);
