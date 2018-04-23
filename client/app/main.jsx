import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';
import { saveState } from './lib/LocalStorage.js';
import App from './components/App.jsx';
import Container from './components/Container.jsx';
import Splash from './components/Splash.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Home from './components/Home.jsx';
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
    // console.log("User is not present");
  }
}

function redirectUnlessSignedIn(){
  var state = Store.getState();
  if(state.isLoading) return;

  if(state.user){
    // console.log("User is present");
  } else {
    browserHistory.replace('/login');
  }
}

Store.subscribe(refresh);
function refresh() {
  // console.log("REFRESH");
  browserHistory.replace(location);
}

Store.subscribe(() => {
  saveState({
    user: Store.getState().user
  });
})

var routes = ReactDOM.render(
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route component={Container} onChange={redirectUnlessSignedIn} onEnter={redirectUnlessSignedIn}>
          <IndexRoute component={Home}/>
          <Route path="/students" component={Students}/>
          <Route path="/orders" component={Orders}/>
        </Route>
        <Route path="/login" component={Splash} onChange={redirectIfSignedIn} onEnter={redirectIfSignedIn}>
          <IndexRoute component={Login}/>
          <Route path="/signup" component={Signup}/>
        </Route>
      </Route>
    </Router>,
  target
);
