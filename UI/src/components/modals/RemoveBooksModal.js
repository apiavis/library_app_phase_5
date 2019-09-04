import React from "react";

import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";

import "../../css/bootstrap.min.css";
import "../../css/layout.css";

import { removeBooks } from "../../redux/actions/libraryActionCreators";

class RemoveBooksModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      author: ""
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  removeBooks = e => {
    e.preventDefault();
    this.props.removeBooks(this.state);
    this.props.close();
  };

  componentDidMount = () => {
    document.getElementById("title").focus();
  };

  render() {
    return (
      <Modal
        isOpen
        fade={false}
        toggle={this.props.close}
        className="modal-position"
      >
        <ModalHeader toggle={this.props.close}>
          <p className="modal-title">Remove Books</p>
        </ModalHeader>

        <ModalBody>
          <form className="clearfix" onSubmit={this.removeBooks}>
            <div className="form-group">
              <label htmlFor="title">Remove By Title</label>
              <input
                onChange={this.handleChange}
                value={this.state.title}
                id="title"
                className="form-control"
                type="text"
                placeholder="Title"
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="author">Remove By Author</label>
              <input
                onChange={this.handleChange}
                value={this.state.author}
                className="form-control"
                type="text"
                placeholder="Author"
                name="author"
              />
            </div>

            <button
              className="btn btn-default btn-remove pull-right"
              type="submit"
            >
              Remove Books
            </button>
          </form>
        </ModalBody>

        <ModalFooter>
          <button variant="primary" className="btn btn-default" type="button" onClick={this.props.close}>
            Close
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    removeBooks: params => removeBooks(params)
  };
}

function mapStateToProps(state) {
  return {
    bookShelf: state.library.bookShelf
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RemoveBooksModal);