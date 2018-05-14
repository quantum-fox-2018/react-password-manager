import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getUsers } from '../store/users/actions'

class login extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      email: '',
      password: ''
    }
  }
  componentDidMount() {
    this.props.getUsers()
  }
  login = () => {
    const users = this.props.users.data
    users.map(user => {
      if(user.email === this.state.email){
        const check = bcrypt.compareSync(this.state.password, user.password)
        if(check){
          const token = jwt.sign({username:user.username ,email: user.email, password: user.password}, 'SECRET')
          localStorage.setItem('token', token)
          alert('Login success!')
          this.props.history.push('/home')
        } else {
          alert('Password is wrong!')
        }
      } else {
        alert('Email not found!')
      }
    })
    window.location.reload()
  }
  handleChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.name] : e.target.value
    })
  }
  render() {
    return (
      <div>
        <form className="login container">
          <h1>Login</h1>
          <label>Email </label>
          <input type="text" name="email" placeholder="email..."
          value={this.state.email}
          onChange={this.handleChange}
          />
          <label>Password </label>
          <input type="password" name="password" placeholder="password..."
          value={this.state.password}
          onChange={this.handleChange}
          />
          <button className="btn" type="button" onClick={this.login}>Login</button>
          <span>Don't have an account? Register <Link to={"/register"}>here</Link> </span>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getUsers
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(login);