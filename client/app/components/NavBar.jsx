import React from 'react';
import { Link, browserHistory } from 'react-router';

var Navbar = React.createClass({

  _goToIndex: function(){
    browserHistory.push('/');
  },

  render: function() {
    return (
      <div className="Navbar">
        <span className="Navbar__logo" onClick={this._goToIndex}>GIMC</span>
        <nav className="Navbar__nav">
          <ul className="Navbar__list">
            <li className="Navbar__listItem"><Link to={`/students`} className="Navbar__link">Students</Link></li>
            <li className="Navbar__listItem"><Link to={`/orders`} className="Navbar__link">Orders</Link></li>
          </ul>
          <Link to={`/students`} className="Navbar__profile"></Link>
        </nav>
      </div>
    );
  }

});

export default Navbar;
