import React, { Component } from 'react';
import auth from '../store/auth'
import user from '../store/user'

import ValidatingPassword from './ValidatingPassword'

class CreateData extends Component {
  constructor() {
    super()
    this.state = {
      url: '',
      username: '',
      password: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  resetState = () => {
    this.setState({
      url: '',
      username: '',
      password: ''
    })
  }

  submitData = () => {
    if(user.checkAllValidation()) {
      user.createData(auth.userId, this.state.url, this.state.username, this.state.password)
      this.resetState()
    } else {
      alert('check validation')
    }
  }

  render() {
    return (
      <div>
        <input type="text" name='url' placeholder="url" value={this.state.url} onChange={ this.handleChange } /> <br />
        <input type="text" name='username' placeholder="username" value={this.state.username} onChange={ this.handleChange } /> <br />
        <input type="password" name='password' placeholder="password" value={this.state.password} onChange={ this.handleChange } /> <br />
        <ValidatingPassword password={this.state.password} url={this.state.url} />
        <button type='submit' onClick={ this.submitData }>Create List</button>
      </div>
    );
  }
}

export default CreateData;