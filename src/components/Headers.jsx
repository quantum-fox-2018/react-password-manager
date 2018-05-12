import React, { Component } from 'react';
import { Link } from "react-router-dom";

import auth from '../store/auth'

class Headers extends Component {
  render() {
    return (
      <div>
        <button onClick={ ()=> auth.signOut() }>Sign Out</button>
        <h1>Welcome to YourPass Manager</h1>
        <div>
          <img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" />
        </div>
        <Link to={`/home/add`}><i className="fas fa-plus fa-5x" style={{color: "white", paddingBottom:"30px"}}></i></Link>
        <p style={{color: "white"}}>Add</p>
      </div>
    );
  }
}

export default Headers;