import {
  SHOW_ALL_BOOKS,
  GET_ALL_BOOKS,
  ADD_BOOKS,
  DELETE_BOOKS,
  SEARCH_FOR_BOOKS,
  SUGGEST_BOOK,
  DELETE_BOOK_BY_ID,
  NEXT_PAGE,
  PREVIOUS_PAGE,
  GET_BOOKS_THIS_PAGE,
  OP_FAILED
} from '../types/libraryActions';

const initialState = {
  modal: null,
  bookShelf: [],
  pageNum: 1,
  resultsPerPage: 5,
  booksToDisplay: [],
  bookToEdit: {},
  errorMsg: ''
};

initialState.booksToDisplay = initialState.bookShelf.slice(
  (initialState.pageNum - 1) * initialState.resultsPerPage
);

export default function libraryReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    
    case OP_FAILED:
      return { ...state, errorMsg: payload };

    case GET_ALL_BOOKS:
      return {
        ...state,
        bookShelf: payload,
        booksToDisplay: getBooksThisPage(payload, state.pageNum, state.resultsPerPage),
        errorMsg: ''
      };

    case ADD_BOOKS:
      const { bookShelf } = state;
      return {
        ...state,
        bookShelf: [...bookShelf, ...payload],
        booksToDisplay: getBooksThisPage(state.bookShelf, state.pageNum, state.resultsPerPage),
        errorMsg: ''
      };

    case DELETE_BOOKS:
      return {
        ...state,
        bookShelf: payload,
        booksToDisplay: getBooksThisPage(state.bookShelf, state.pageNum, state.resultsPerPage),
        errorMsg: ''
      };

    case SEARCH_FOR_BOOKS:
      return {
        ...state,
        booksToDisplay: payload,
        errorMsg: ''
      };

    case SUGGEST_BOOK:
      return {
        ...state,
        booksToDisplay: payload,
        errorMsg: ''
      };

    case DELETE_BOOK_BY_ID:
      return {
        ...state,
        bookShelf: payload,
        booksToDisplay: getBooksThisPage(state.bookShelf, state.pageNum, state.resultsPerPage),
        errorMsg: ''
      };

    case GET_BOOKS_THIS_PAGE:
      return {
        ...state,
        booksToDisplay: getBooksThisPage(state.bookShelf, state.pageNum, state.resultsPerPage),
        errorMsg: ''
      };

    case NEXT_PAGE:
      return {
        ...state,
        booksToDisplay: getBooksThisPage(state.bookShelf, state.pageNum, state.resultsPerPage),
        pageNum: state.pageNum + 1,
        errorMsg: ''
      };

    case PREVIOUS_PAGE:
      return {
        ...state,
        booksToDisplay: getBooksThisPage(state.bookShelf, state.pageNum, state.resultsPerPage),
        pageNum: state.pageNum - 1,
        errorMsg: ''
      };

    case SHOW_ALL_BOOKS:
      return {
        ...state,
        booksToDisplay: getBooksThisPage(state.bookShelf, state.pageNum, state.resultsPerPage),
        pageNum: 1,
        errorMsg: ''
      };

    default:
      return state;
  }
}

function getBooksThisPage(bookShelf, pageNum, resultsPerPage) {
  const startIndex = (pageNum - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  return bookShelf.slice(startIndex, endIndex);
}