import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'

import '../css/Auth.css'

class Auth extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <div className="wrapper fadeInDown">
              <div id="formContent">

                <h2 className="inactive underlineHover"><Link to="/">Sign In</Link></h2>
                <h2 className="inactive underlineHover"><Link to="/signup">Sign Up</Link></h2>

                <div className="fadeIn first">
                  <img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" />
                </div>
                <h1 className="fadeIn first" style={{color: "grey"}}>YourPass Manager</h1>
                <Switch>
                  <Route exact path="/" component={SignIn}/>
                  <Route path="/signup" component={SignUp}/>
                </Switch>
              </div>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default Auth;