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
        <input type="text" name='email' placeholder="email" onChange={ this.handleChange } /> <br />
        <input type="password" name='password' placeholder="password"  onChange={ this.handleChange } /> <br />
        <button onClick={ ()=> auth.signUp(this.state.email, this.state.password) }>Sign Up</button>
        <br/>
      </div>
    );
  }
}

export default register;