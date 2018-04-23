import React from 'react';
import { render } from 'react-dom';
import $ from 'jquery';
import Navbar from './Navbar.jsx';
import Store from '../reducers/store.js';
import loadingUntil from '../reducers/loading.js';
import { startLoading, stopLoading } from '../actions/app.js';
import { loadStudents } from '../actions/students.js';
import { loadOrders } from '../actions/orders.js';

class Container extends React.Component {

  componentWillMount() {
    Store.dispatch(startLoading());
    this._updateStudents();
    this._updateOrders();
  }

  componentDidMount() {
    Store.dispatch(stopLoading());
  }

  _updateStudents() {
    $.get('/api/student/students', {
      patronid: Store.getState().user.id,
    })
    .done((response) => {
      // console.log("load students", response);
      Store.dispatch(loadStudents(response));
    })
    .fail((err) => {
      console.log("/api/user/index error", err);
    });
  }

  _updateOrders() {
    $.get('/api/order/orders', {
      patronid: Store.getState().user.id,
    })
    .done((response) => {
      // console.log("load orders", response);
      Store.dispatch(loadOrders(response));
    })
    .fail((err) => {
      console.log("/api/user/index error", err);
    });
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
