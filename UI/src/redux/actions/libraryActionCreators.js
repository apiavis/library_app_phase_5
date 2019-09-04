import axios from 'axios';
import store from '../store';

import { baseUrl, numResults } from '../../util/defaultAxiosConfig';
import {
  sortBooksById,
  sanitizeBookData,
  unique
} from '../../util/helperFunctions';

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

export function getAllBooks() {
  const token = store.getState().auth.user.token;
  return axios
    .get(`${baseUrl}/library/${numResults}`, { headers: { "x-access-token": token } })
    .then((res) => {
      if (res.status === 200 && res.data && res.data.length) {
        const allBooks = sanitizeBookData(sortBooksById(res.data));
        const action = {
          type: GET_ALL_BOOKS,
          payload: allBooks
        };
        store.dispatch(action);
      }

    })
    .catch((err) => {
      const action = {
        type: GET_ALL_BOOKS,
        payload: []
      };
      store.dispatch({ type: OP_FAILED, payload: err });
    });
}

export function addBooks(bookArr) {
  const token = store.getState().auth.user.token;
  return axios
    .post(`${baseUrl}/library/`, { books: bookArr }, { headers: { "x-access-token": token } })
    .then((res) => {
      if (res.status === 200 && res.data.length) {
        const addedBooks = sanitizeBookData(sortBooksById(bookArr));
        const action  = {
          type: ADD_BOOKS,
          payload: addedBooks
        };
        store.dispatch(action);
        getAllBooks();
      }
    })
    .catch((err) => {
      const action  = {
        type: ADD_BOOKS,
        payload: []
      };
      store.dispatch(action);
      store.dispatch({ type: OP_FAILED, payload: err });
    });
}

export function removeBooks(params) {
  const { title, author } = params;
  const token = store.getState().auth.user.token;
  var currentUser = store.getState().auth.user.email
  axios.get(
    `${baseUrl}/library/searchBy/?title=${title}&author=${author}`, { headers: { "x-access-token": token } })
  .then((res) => {
    var bookOwner = res.data[0].user;
    if (currentUser === bookOwner) {
      return axios.delete(
        `${baseUrl}/library/deleteBy/?title=${title}&author=${author}`, { headers: { "x-access-token": token } })
        .then((res) => {
          if (res.status === 200 && res.data) {
            const removedBooks = res.data;
            const action  = {
              type: DELETE_BOOKS,
              payload: removedBooks 
            };
            store.dispatch(action);
            getAllBooks();
          }
        })
        .catch((err) => {
          store.dispatch({ type: OP_FAILED, payload: err });
        }
      )
    } else {
      return window.alert("You do not have permission to remove this book.");
    }
  })
  .catch((err) => {
    console.log('Error searching for books: ', err);
  })
}

export function editBook(book) { 
  return (dispatch) => {
  const token = store.getState().auth.user.token;
  const id = book.id;
  return axios.put(`${baseUrl}/library/update/${id}`, book, { headers: { "x-access-token": token } })
  .then((res) => {
    if (res.status === 200 && res.data) {
      getAllBooks();
    }
  })
  .catch((err) => {
    dispatch({ type: OP_FAILED, payload: err });
  });
}
}

export function searchForBooks(params) {
  const token = store.getState().auth.user.token;
  const { title, author } = params;
  return axios.get(
    `${baseUrl}/library/searchBy/?title=${title}&author=${author}`, { headers: { "x-access-token": token } })
  .then((res) => {
    if (res.status === 200 && res.data) {
      let matchingBooks = unique(res.data.filter((e) => typeof e !== 'string'));
      const action  = {
        type: SEARCH_FOR_BOOKS,
        payload: matchingBooks 
      };
      store.dispatch(action);
    }
  })
  .catch((err) => {
    store.dispatch({ type: OP_FAILED, payload: err });
  })
}

export function suggestBook() {
  const token = store.getState().auth.user.token;
  return axios.get(`${baseUrl}/library/random`, { headers: { "x-access-token": token } })
  .then((res) => {
    let suggestedBook = [res.data];
    if (suggestedBook && suggestedBook.length) {
      const action  = {
        type: SUGGEST_BOOK,
        payload: suggestedBook 
      };
      store.dispatch(action);
    }
  })
  .catch((err) => {
    store.dispatch({ type: OP_FAILED, payload: err });
  })
}

export function deleteBookById(id,bookOwner) {
  const token = store.getState().auth.user.token;
  var currentUser = store.getState().auth.user.email
  if (currentUser === bookOwner) {
    return axios.delete(`${baseUrl}/library/deleteById/${id}`, { headers: { "x-access-token": token } })
    .then((res) => {
      const action  = {
        type: DELETE_BOOK_BY_ID,
        payload: [res.data] 
      };
      store.dispatch(action);
      getAllBooks();
    })
    .catch((err) => {
      store.dispatch({ type: OP_FAILED, payload: err });
    })
  } else {
    return window.alert("You do not have permission to remove this book.");
  }
}

export const nextPage = () => {
  const action  = {
    type: NEXT_PAGE
  };
  store.dispatch(action);
  getBooksThisPage();
};

export const previousPage = () => {
  const action  = {
    type: PREVIOUS_PAGE
  };
  store.dispatch(action); 
  getBooksThisPage();
};

export const getBooksThisPage = () => {
  const action  = {
    type: GET_BOOKS_THIS_PAGE
  };
  store.dispatch(action);
};

export const showAllBooks = () => {
  const action  = {
    type: SHOW_ALL_BOOKS
  };
  store.dispatch(action);
};