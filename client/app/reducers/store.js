import { createStore } from 'redux';
import { browserHistory } from 'react-router';
import { loadState } from '../lib/LocalStorage.js';

const persistedState = loadState();

function appStore(state, action) {
  if (typeof state === 'undefined') {
    return {
      user: null,
      students: [],
      orders: [],
      isLoading: false,
    }
  }

  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.user }
    case 'CLEAR_USER':
      return { ...state, user: null }
    case 'LOADING':
      return { ...state, isLoading: action.isLoading }
    case 'LOAD_STUDENTS':
      return { ...state, students: action.students }
    case 'LOAD_ORDERS':
      return { ...state, orders: action.orders }
    default:
      return state
  }
}

module.exports = createStore(appStore, persistedState);
