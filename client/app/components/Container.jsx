import React from 'react';
import { render } from 'react-dom';
import Navbar from './Navbar.jsx';
import Store from '../reducers/store.js';
import loadingUntil from '../reducers/loading.js';
import { startLoading, stopLoading } from '../actions/app.js';

class Container extends React.Component {

  componentWillMount() {
    Store.dispatch(startLoading());
  }

  componentDidMount() {
    Store.dispatch(stopLoading());
  }

  render() {
    return (
        <div className="Container">
          <Navbar />
          <main className="Container__container">
            <div className="Container__content">
              {Store.getState().isLoading ? "Loading..." : this.props.children && React.cloneElement(this.props.children, Store.getState())}
            </div>
          </main>
        </div>
    );
  }
}

module.exports = Container;
