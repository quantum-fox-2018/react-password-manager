import React, { Component } from 'react'
import Nav from './Nav'
import SignIn from './SignInUp/SignIn'
import SignUp from './SignInUp/SignUp'
import '../style/SignInUP.css'

class SignInUP extends Component {
  render() {
    return (
      <div>
        <Nav />
        <div className="container white z-depth-2">
          <div className="row">
            <div className="col s6">
              <ul className="tabs teal">
                <li className="tab"><span className="white-text"> LOGIN</span></li>
              </ul>
              <SignIn />
            </div>
            <div className="col s6">
              <ul className="tabs teal">
                <li className="tab"><span className="white-text"> REGISTER</span></li>
              </ul>
              <SignUp />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SignInUP