import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

class navbar extends Component {
  render() {
    return (
      <div>
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Password Manager</h1>
        <button className="App-title-right">Logout</button>
      </div>
    );
  }
}

export default navbar;