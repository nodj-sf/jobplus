import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';


class RestaurantModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    let restStyles = {
      'overlay' : {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(85, 84, 84, 1.0) 100% / 100%',
        backgroundBlendMode: 'soft-light',
        zIndex: 150
      }, 
      'content': {
        position: 'absolute',
        minWidth: '90vw',
        minHeight: '90vh',
        top: '50%',
        left: '50%',
        marginRight: '-50%',
        padding: 0,
        borderRadius: '8px',
        transform: 'translate(-50%, -50%)',
        overflow: 'hidden',
        zIndex: 200
      }  
    };

    return (

      <Modal
        isOpen={ this.props.yelpModalState }
        style={ restStyles } >

        <img src={ this.props.yelpPhoto } alt={ this.props.yelpDescription } />

        <i className='fa fa-times-circle XButton' onClick={ () => this.props.deactivateYelpModal() }></i>

      </Modal>

    );
  }

};

let mapStateToProps = (state) => ({
  yelpModalState: state.toggleYelpModal
});

export default connect(mapStateToProps)(RestaurantModal);
