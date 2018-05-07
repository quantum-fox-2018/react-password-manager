import React, { Component } from 'react';
import {signupUser} from '../store/users/users.action'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

class Signup extends Component {
  constructor () {
    super ()
    this.state ={
      username: '',
      password: ''
    }
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  addNewUser = () => {
    let {history} = this.props
    let newUser = {
      username: this.state.username,
      password: this.state.password
    }
    this.props.signupUser(newUser)
    history.push('/')
  }

  render() {
    return (
      <div className="container">
        <h1>Sign up page</h1>
        <form>
          <div class="form-group">
            <label>Username</label>
            <input type="text"  name="username" class="form-control"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" name="password" class="form-control"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <button type="button" class="btn btn-primary" onClick={this.addNewUser}>Sign up</button>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => bindActionCreators({
  signupUser
}, dispatch)

export default connect(null, mapDispatchToProps) (Signup);