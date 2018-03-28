import React from 'react';
import { render } from 'react-dom';
import Store from '../reducers/store.js';
import loadingUntil from '../reducers/loading.js';
import { startLoading, stopLoading } from '../actions/app.js';
import AjaxPromise from 'ajax-promise';
import 'whatwg-fetch';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = Store.getState();
  }

  componentWillMount() {
    // Store.dispatch(startLoading());
  }

  componentDidMount() {
    // Store.dispatch(stopLoading());
    Store.subscribe(this._getState.bind(this));
  }

  _getState() {
    this.setState(Store.getState());
  }

  render() {
    return (
        <div className="App">
          {this.state.isLoading ? "Loading..." : this.props.children && React.cloneElement(this.props.children, this.state)}
        </div>
    );
  }
}

module.exports = App;
