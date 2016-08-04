import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { selectJob } from '../actions/index';


const customStyles = {
  overlay : {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(41, 37, 37, 0.59)'
  },
  content: {
    minWidth: '500px',
    minHeight: '500px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    borderRadius: '8px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '200'
  }
};


class JobListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {isModalOpen: false};
  }

  openModal() {
    this.setState({isModalOpen: true});
  }

  closeModal() {
    this.setState({isModalOpen: false});
  }

  handleClickOutside(evt) {
    this.closeModal();
  }

  clickAction() {
    this.openModal();
    selectJob(this.props.job);
  }

  render() {
    return (
      <li className='jobLI' onClick={() => this.clickAction()}>
        <h2>{this.props.job.title}</h2> 
          <Modal
            isOpen={this.state.isModalOpen}
            onClose={() => this.closeModal()}
            style={customStyles} >

            <h2 className='modalJobTitle' ref='subtitle'>{this.props.job.title}</h2>
            <hr />

            <i className='fa fa-times-circle XButton' onClick={() => this.closeModal()}></i>
          </Modal>
      </li>
    );
  }
}


export default JobListItem;
