import React from 'react';
import { connect } from "react-redux";

import '../css/bootstrap.min.css';
import '../css/layout.css';

import { suggestBook, searchForBooks, getAllBooks, getBooksThisPage, showAllBooks } from "../redux/actions/libraryActionCreators";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: ''
    };
  }

  scrollToTable = () => {
    document.getElementById('dataTable').scrollIntoView({ behavior: 'smooth' });
    getAllBooks();
    getBooksThisPage();
    showAllBooks();
  };

  updateVal = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  searchForBooks = async (e) => {
    e.preventDefault();
    const { title, author } = this.state;
    if (title || author) {
      let booksFound = await this.props.searchForBooks(this.state);
      this.props.updateDisplayedBooks(booksFound);
      this.setState({
        title: '',
        author: ''
      });
    }
  };

  suggestBook = () => {
    this.props.suggestBook();
  };

  render() {
    return (
      <nav className="row navbar navbar-default navbar-container">
        <form id="search-form" className="navbar-form text-center">
          <div className="form-group col-xs-2">
            <button
              onClick={this.scrollToTable}
              className="btn btn-default pull-left navbar-btn vert-spacing"
              type="button">
              Show All Books
            </button>
          </div>

          <div className="form-group navbar-inputs-stack col-xs-8">
            <input
              onChange={this.updateVal}
              value={this.state.title}
              placeholder="Title"
              className="form-control"
              type="text"
              name="title"
            />

            <input
              onChange={this.updateVal}
              value={this.state.author}
              placeholder="Author"
              className="form-control"
              type="text"
              name="author"
            />

            <button
              data-modal-target="bookDisplayModal"
              onClick={this.searchForBooks}
              type="submit"
              className="btn btn-default navbar-btn">
              Search
            </button>
          </div>

          <div className="form-group col-xs-2">
            <button
              data-modal-target="bookDisplayModal"
              onClick={this.suggestBook}
              className="btn btn-default pull-right navbar-btn vert-spacing"
              type="button">
              Suggest Book
            </button>
          </div>
        </form>
      </nav>
    );
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    searchForBooks: params => searchForBooks(params),
    suggestBook,
    showAllBooks
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
)(Navbar);