import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Modal from "react-modal";


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


  render() {
    return (
      <li className="jobLI" onClick={() => this.openModal()}>
        <h2>Job</h2> 

        <div>
          <Modal
            isOpen={this.state.isModalOpen}
            onClose={() => this.closeModal()}
            style={customStyles} >

            <h2 ref="subtitle">Hello</h2>
            <button onClick={() => this.closeModal()}>close</button>
          </Modal>
        </div>
      </li>
    );
  }
}


export default JobListItem;

// <h2>{job.title}</h2>