import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';
import App from './components/App.jsx';
import Home from './components/Home.jsx';
import Splash from './components/Splash.jsx';
import Students from './components/Students.jsx';
import Orders from './components/Orders.jsx';
import Store from './reducers/store.js';
const target = document.getElementById('app');

function redirectIfSignedIn(){
  var state = Store.getState();
  if(state.isLoading) return;

  if(state.user){
    browserHistory.replace('/');
  } else {
    console.log("User is not present");
  }
}

function redirectUnlessSignedIn(){
  var state = Store.getState();
  if(state.isLoading) return;

  if(state.user){
    console.log("User is present");
  } else {
    browserHistory.replace('/login');
  }
}

Store.subscribe(refresh);
function refresh() {
  console.log("REFRESH");
  browserHistory.replace(location);
}

var routes = ReactDOM.render(
    <Router history={browserHistory}>
      <Route path="/login" component={Splash} onChange={redirectIfSignedIn} onEnter={redirectIfSignedIn}/>
      <Route path="/" component={App} onChange={redirectUnlessSignedIn} onEnter={redirectUnlessSignedIn}>
        <IndexRoute component={Home}/>
        <Route path="students" component={Students} onChange={redirectUnlessSignedIn} onEnter={redirectUnlessSignedIn}/>
        <Route path="orders" component={Orders} onChange={redirectUnlessSignedIn} onEnter={redirectUnlessSignedIn}/>
      </Route>
    </Router>,
  target
);
