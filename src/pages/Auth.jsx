import React, { Component } from 'react';

import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'

class Auth extends Component {
  render() {
    return (
      <div>
        <br/>
        <h1>Sign Up</h1>
        <SignUp />
        <br/>
        <hr/>
        <h1>Sign In</h1>
        <SignIn />
      </div>
    );
  }
}

export default Auth;