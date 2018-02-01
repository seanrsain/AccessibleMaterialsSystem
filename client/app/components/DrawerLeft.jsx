import React from 'react';
import $ from 'jquery';
import { Link, browserHistory } from 'react-router';
import Store from '../reducers/store.js';

class DrawerLeft extends React.Component {

  _handleClose(){
    Store.dispatch({
      type: "CLOSE_DRAWER",
      open: false
    });
    console.log('closed');
  }

  _handleLogout(e, _handleClose){
    e.preventDefault();
    // TODO: Use AjaxPromise.
    $.get("api/user/logout")
      .done(function(data){
        Store.dispatch({type: "CLOSE_DRAWER",open: false});
        setTimeout(function(){
          Store.dispatch({
            type: "USER_SESSION",
            user: null,
            snack: "You're logged out. Have a nice day!"
          });
        }, 100);
        browserHistory.push('/');
        console.log('logged out');
      })
      .fail(function(data){
        console.log(data);
      });
  }

  render() {

    return (
      <div>
      </div>
    );
  }
}

module.exports = DrawerLeft;
