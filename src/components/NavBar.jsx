import React, { Component } from 'react';
import auth from '../store/auth'

class NavBar extends Component {
  render() {
    return (
      <div>
        <button onClick={ ()=> auth.signOut() }>Sign Out</button>
      </div>
    );
  }
}

export default NavBar;