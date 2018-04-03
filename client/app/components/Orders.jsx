import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router';
import AjaxPromise from 'ajax-promise';
import Store from '../reducers/store.js';
import loadingUntil from '../reducers/loading.js';
import { loadOrders } from '../actions/orders.js';
import Modal from 'react-modal';

class Orders extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentList: Store.getState().orders,
      searchResults: []
    };
  }

  componentDidMount() {
    this._updateOrders();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentList: nextProps.orders,
    })
  }

  _updateOrders() {
    console.log(Store.getState().user.id)
    $.get('/api/order/orders', {
      patronid: Store.getState().user.id,
    })
    .done((response) => {
      console.log("load orders", response);
      Store.dispatch(loadOrders(response));
    })
    .fail((err) => {
      console.log("/api/user/index error", err);
    });
  }

  _addOrder(evt) {
    evt.preventDefault();
    const form = evt.target.form;
    $.post("api/order/add", $(form).serialize())
      .done((data) => {
        console.log(data);
        alert("Order has been submitted.");
        form.reset();
        this._updateOrders();
      })
      .fail((data) => {
        console.log("Order error: ", data.responseText);
      });
    return false;
  }

  _searchItem() {
    const query = $('#item_search')[0].value;
    if(query) {
      $.get("api/item/items", {query})
        .done((data) => {
          this.setState({ searchResults: data, })
        })
        .fail((data) => {
          console.log("Search error: ", data.responseText);
        })
    } else {
      this.setState({ searchResults: [], })
    }
  }

  _showResult(result) {
    return (
      <div className="ResultItem" key={result.id}>
        <div className="ResultItem__image"></div>
        <div className="ResultItem__info">
          <div className="ResultItem__name">{result.Name}</div>
          <div className="ResultItem__description">ISBN: {result.ISBN}</div>
        </div>
        <form className="ResultItem__form">
          <select className="ResultItem__input ResultItem__input--student" name="studentId">
            <option value="" disabled selected hidden>Select student</option>
            {Store.getState().students && Store.getState().students.map(this._listStudents.bind(this))}
          </select>
          <input className="ResultItem__input ResultItem__input--quantity" placeholder="Qty" name="Quantity" />
          <input type="hidden" name="itemId" value={result.id} />
          <button className="ResultItem__submit" onClick={this._addOrder.bind(this)}>Place Order</button>
        </form>
      </div>
    );
  }

  _listStudents(student) {
    return (<option value={student.id} key={student.id}>{student.Fname} {student.Lname}</option>);
  }

  _searchOrder() {
    const query = $('#order_search')[0].value.toUpperCase();
    if(query) {
      let orders = Store.getState().orders.filter((order) => {
        if(order.item.Name.toUpperCase().indexOf(query) > -1) {
          return true;
        } else if(order.item.ISBN.toUpperCase().indexOf(query) > -1) {
          return true;
        } else if(order.student.Fname.toUpperCase().indexOf(query) > -1) {
          return true;
        } else if(order.student.Mname.toUpperCase().indexOf(query) > -1) {
          return true;
        } else if(order.student.Lname.toUpperCase().indexOf(query) > -1) {
          return true;
        } else {
          return false;
        }
      });
      this.setState({ currentList: orders, })
    } else {
      this.setState({ currentList: Store.getState().orders, })
    }
  }

  _renderOrder(order) {
    return (
      <tr className="OrderList__row">
        <td className="OrderList__td"><input type="checkbox" id={`order_${order.id}`} /></td>
        <td className="OrderList__td">{order.item.Name}</td>
        <td className="OrderList__td">{order.student.Fname} {order.student.Lname}</td>
        <td className="OrderList__td">{order.Quantity}</td>
        <td className="OrderList__td">{order.Status ? order.Status : `Processing`}</td>
      </tr>
    );
  }

  render() {
    return (
      <div className="Orders">
        <h1 className="Orders__title">Orders</h1>
        <div className="ItemSearch">
          <div className="ItemSearch__header">
            <div className="ItemSearch__title">Item Search</div>
          </div>
          <input type="search" id="item_search" className="ItemSearch__search" placeholder="Search for order..." onChange={this._searchItem.bind(this)} />
          <div className="ItemSearch__results">
            {this.state.searchResults && this.state.searchResults.map(this._showResult.bind(this))}
          </div>
        </div>
        <div className="OrderList">
          <div className="OrderList__header">
            <div className="OrderList__title">Active Orders</div>
            <div className="OrderList__actions">
              <input type="search" id="order_search" className="OrderList__search" placeholder="Search for order..." onChange={this._searchOrder.bind(this)} />
              <button className="OrderList__button">Reassign</button>
              <button className="OrderList__button">Cancel</button>
            </div>
          </div>
          <table className="OrderList__table">
            <thead>
              <th className="OrderList__columnHeader OrderList__columnHeader--checkbox"><input type="checkbox" id="student_all" /></th>
              <th className="OrderList__columnHeader OrderList__columnHeader--item">Item</th>
              <th className="OrderList__columnHeader OrderList__columnHeader--student">Student</th>
              <th className="OrderList__columnHeader OrderList__columnHeader--quantity">Quantity</th>
              <th className="OrderList__columnHeader OrderList__columnHeader--status">Status</th>
            </thead>
            <tbody>
              {this.state.currentList && this.state.currentList.length > 0 ? this.state.currentList.map(this._renderOrder.bind(this)) : (
                <tr className="OrderList__row">
                  <td colSpan={5} className="OrderList__td">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

module.exports = Orders;
