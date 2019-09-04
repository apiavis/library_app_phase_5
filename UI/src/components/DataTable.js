import React from 'react';
import { Table, ButtonGroup } from 'reactstrap';
import { deleteBookById } from "../redux/actions/libraryActionCreators";
import { connect } from "react-redux";
import store from '../redux/store';

import '../css/bootstrap.min.css';
import '../css/layout.css';

import { getBooksThisPage } from "./../redux/actions/libraryActionCreators";


const DataTable = (props) => {
  function _createTable(bookArr = []) {
    const tableContent = bookArr.map((book, index) => (
      <tr key={index} data-book-id={book.id}>
        {_createRow(book)}
      </tr>
    ));
    return tableContent;
  }

  function _createHead() {
    const columns = [
      'Title',
      'Author',
      'Cover',
      'Synopsis',
      'Num Pages',
      'Pub Date',
      'Rating',
      'Delete'
    ];
    return columns.map((column, index) => <th key={index}>{column}</th>);
  }

  function _createRow(book) {
    const rowSections = ['title', 'author', 'cover', 'synopsis', 'numPages', 'pubDate', 'rating'];

    const row = rowSections.map((prop, index) => {
      return (
        <td
          key={`${index}-${book.id}`}
          onClick={() => toggleEditModal(book.id,book.user)}
          className={prop === 'synopsis' ? 'synopsis-stretch' : ''}>
          {_formatTableContent(book, prop)}
        </td>
      );
    });

    row.push(
      <td key={`${rowSections.length + 1}-${book.id}`}>
        <input type="checkbox" onClick={() => confirmDelete(book.id)} />
      </td>
    );
    return row;
  }

  function _formatTableContent(book, prop) {
    switch (prop) {
      case 'id':
        return null;
      case 'cover':
        return (
          <img
            src={book[prop] || require('../assets/generic_cover.png')}
            alt="book cover"
            className="tableImg"
          />
        );
      case 'rating':
        return _createStars(book[prop]);
      case 'synopsis':
        return <p>{book[prop] ? book[prop].slice(0, 40) : ''}...</p>;
      default:
        return book[prop];
    }
  }

  function _createStars(rating) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<span className={`fa fa-star ${i < rating ? 'checked' : ''}`} key={i} />);
    }
    return <div>{stars}</div>;
  }

  async function toggleEditModal(id,user) {
    const bookOwner = user;
    const currentUser = store.getState().auth.user.email;
    if (bookOwner === currentUser) {
      await props.populateEditModalInputs(id);
      props.handleModalToggle('editBookModal');
      return;
    } else {
      return window.alert("You do not have permission to edit this book.");
    }
  }

  function confirmDelete(id) {
    let bookToDelete = props.booksToDisplay.find((book) => book.id === id);
    let bookOwner = bookToDelete.user;
    let proceed = window.confirm(
      `Are you sure you want to delete ${bookToDelete.title}, by ${bookToDelete.author}`
    );
    if (proceed) {
      deleteBookById(id,bookOwner);
    }
    return;
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  const tableHead = _createHead();
  const tableBody = _createTable(props.booksToDisplay);

  return (
    <div id="dataTable">
      <p className="modal-title">Books</p>

      <Table>
        <thead>
          <tr>{tableHead}</tr>
        </thead>

        <tbody>{tableBody}</tbody>
      </Table>

      <ButtonGroup className="btn-group">
        <button onClick={props.previousPage} className="btn btn-default" type="button">
          Previous Page
        </button>
        <button onClick={scrollToTop} className="btn btn-default" type="button">
          Back to Top
        </button>
        <button onClick={props.nextPage} className="btn btn-default" type="button">
          Next Page
        </button>
      </ButtonGroup>
    </div>
  );
};

function mapDispatchToProps(dispatch, ownProps) {
  return {
    getBooksThisPage
  };
}

function mapStateToProps(state) {
  return {
    bookShelf: state.library.bookShelf,
    booksToDisplay: state.library.booksToDisplay
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataTable);