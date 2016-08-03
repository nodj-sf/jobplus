import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Modal from "react-modal";
import onClickOutside from "react-onclickoutside";


const customStyles = {
  overlay : {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(193, 193, 193, 0.75)"
  },
  content: {
    minWidth: "500px",
    minHeight: "500px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    borderRadius: "8px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};


// const JobListItem = ({job}) => {
class JobListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {isModalOpen: false}
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

  render() {
    return (
      <li className="jobLI" onClick={() => this.openModal()}>
        <h2>{this.props.job.title}</h2> 

          <Modal
            isOpen={this.state.isModalOpen}
            onClose={() => this.closeModal()}
            // closeTimeoutMS={3000}
            style={customStyles} >

            <h2 className="modalJobTitle" ref="subtitle">{this.props.job.title}</h2>
            <hr />

            <i className="fa fa-times-circle XButton" onClick={() => this.closeModal()}></i>
          </Modal>

      </li>
    );
  }
}


export default JobListItem;

// <h2>{job.title}</h2>
