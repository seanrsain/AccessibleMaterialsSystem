import React from 'react';
import Login from './Login.jsx';

var Splash = React.createClass({
  render: function() {
    return (
      <div className="Splash">
        <div className="Splash__info">
          <h1 className="Splash__title">GIMC</h1>
          <p className="Splash__text">The Georgia Instructional Materials Center (GIMC) is a unit within the Division for Special Education Services and Supports. The GIMC provides accessible educational materials (AEMs) to all of Georgia’s eligible K-12 students.</p>
          <p className="Splash__text">Create an account with GIMC to order materials for disabled and visually impaired students:
            <span className="Splash__patronButtons">
              <button className="Splash__button">Create Patron Account</button>
              <button className="Splash__button">Patron FAQ</button>
            </span>
          </p>
          <div className="Splash__footer">
            <div>
              <a href="" className="Splash__footerLink">Privacy Policy</a>
              <a href="" className="Splash__footerLink">Security Policy</a>
            </div>
            <div>Follow us on social media: 
              
            </div>
          </div>
        </div>
        <div className="Splash__login">
          { this.props.children }
        </div>
      </div>
    );
  }
});

module.exports = Splash;