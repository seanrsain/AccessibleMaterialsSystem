import React from 'react';
import $ from 'jquery';
import { Link, browserHistory } from 'react-router';
import Store from '../reducers/store.js';
import { setUser } from '../actions/user.js';

var SignUp = React.createClass({

  _submit: function(e) {
    e.preventDefault();
    // TODO: Use AjaxPromise.
    $.post("api/user/signup", $("#signup-form").serialize())
      .done(function(data){
        console.log(data);
        alert(`User ${data.username} successfully signed up.`);
        Store.dispatch(setUser(data));
        browserHistory.push('/');
      })
      .fail(function(data){
        console.log("Signup error: ", data.responseText);
      });
  },

  render: function() {
    return (
      <div className="Signup">
        <h1 className="Signup__title">Signup</h1>
        <form id="signup-form" className="Signup__form" onSubmit={this._submit}>
          <label htmlFor="name">Full Name</label>
          <input type="text" name="name" className="Signup__input" />
          <label htmlFor="email">Email</label>
          <input type="email" name="email" className="Signup__input" />
          <label htmlFor="username">Username</label>
          <input type="text" name="username" className="Signup__input" />
          <label htmlFor="password">Password 
            <span className="Signup__forgotPassword"></span>
          </label>
          <input type="password" name="password" className="Signup__input" />
          <label htmlFor="confirm_password">Confirm Password</label>
          <input type="password" name="confirm_password" className="Signup__input" />
          <button type="submit" className="Signup__submit">Sign Up</button>
          <div>Already have an account?</div>
          <Link to={`/login`} className="Signup__createAccount">Log in to your account >></Link>
        </form>
      </div>
    );
  }
});

module.exports = SignUp;
