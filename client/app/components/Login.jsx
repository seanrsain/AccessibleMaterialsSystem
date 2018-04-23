import React from 'react';
import $ from 'jquery';
import { Link, browserHistory } from 'react-router';
import Store from '../reducers/store.js';
import { setUser } from '../actions/user.js';

var Login = React.createClass({

  _submit: function(e) {
    e.preventDefault();
    // TODO: Use AjaxPromise.
    if(!confirm('The GIMC Registration and Ordering System provides access to student educational data for Georgia’s K-12 public school students.  As a condition of use, each GIMC Registration and Ordering System user must agree to comply with the Family Educational Rights and Privacy Act (FERPA) policies before access is granted.  By proceeding to the Login below you are agreeing to protect student identity and abide by FERPA’s regulations, click the “Ok” button below.  You will then be granted access.')) return false;
    $.post("api/user/login", $("#login-form").serialize())
      .done(function(data){
        // console.log(data);
        // alert(`User ${data.username} successfully logged in.`);
        Store.dispatch(setUser(data));
        browserHistory.push('/');
      })
      .fail(function(data){
        console.log("Login error: ", data.responseText);
      });
  },

  render: function() {
    return (
      <div className="Login">
        <h3 className="Login__title">Login</h3>
        <form id="login-form" className="Login__form" onSubmit={this._submit}>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" className="Login__input" />
          <label htmlFor="password">Password 
            <span className="Login__forgotPassword">(<a href="">forgot password?</a>)</span>
          </label>
          <input type="password" name="password" className="Login__input" />
          <button type="submit" className="Login__submit">Log In</button>
          <div>Don't have an account?</div>
          <Link to={`/signup`} className="Login__createAccount">Create a patron account >></Link>
        </form>
      </div>
    );
  }
});

module.exports = Login;
