import React, { Component } from 'react';
import auth from '../store/auth'

class register extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div>
        <h2 className="fadeIn first">Sign Up</h2>
        <input type="text" id="login" className="fadeIn second" name="email" placeholder="email" onChange={ this.handleChange } /> <br />
        <input type="password" id="password" className="fadeIn third" name="password" placeholder="password"  onChange={ this.handleChange } /> <br />
        <input type="submit" className="fadeIn fourth" value="Sign Up" onClick={ ()=> auth.signUp(this.state.email, this.state.password) } />
        <br/>
      </div>
    );
  }
}

export default register;