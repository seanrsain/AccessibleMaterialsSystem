import React from 'react';
import $ from 'jquery';
import { Link, browserHistory } from 'react-router';
import Store from '../reducers/store.js';
import { clearUser } from '../actions/user.js';

var Home = React.createClass({

  _logout: function(e) {
    e.preventDefault();
    // TODO: Use AjaxPromise.
    $.get("api/user/logout")
      .done(function(){
        alert(`User successfully logged out.`);
        Store.dispatch(clearUser());
        browserHistory.push('/login');
      })
      .fail(function(data){
        console.log("Logout error: ", data.responseText);
      });
  },

  render: function() {
    return (
      <div className="Home">
        <h1 className="Home__title">Home</h1>
        <button className="Home__logout" onClick={this._logout}>Log Out</button>
      </div>
    );
  }
});

module.exports = Home;
