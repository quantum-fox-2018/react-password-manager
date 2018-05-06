import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { db } from '../firebase'
import { getUsers } from '../store/users/actions'
const salt = bcrypt.genSaltSync(10);

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
  register = () => {
    const hash = bcrypt.hashSync(this.state.password, salt)
    db.ref('password-manager/users/').push({
      username: this.state.username,
      email: this.state.email,
      password: hash
    })
    const token = jwt.sign({username:this.state.username ,email: this.state.email}, 'SECRET')
    localStorage.setItem('token', token)
    alert('Register success!')
    this.props.history.push('/home')
  }
  login = () => {
    const users = this.props.users.data
    users.map(user => {
      if(user.email === this.state.email){
        const check = bcrypt.compareSync(this.state.password, user.password)
        if(check){
          const token = jwt.sign({username:user.username ,email: user.email}, 'SECRET')
          localStorage.setItem('token', token)
          alert('Login success!')
          this.props.history.push('/home')
        }
      }
    })
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
        <form>
          <h1>Register</h1>
          <label>Username </label>
          <input type="text" name="username" placeholder="username..."
          value={this.state.username}
          onChange={this.handleChange}
          />
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
          <button type="button" onClick={this.register}>Register</button>
        </form>
        <form>
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
          <button type="button" onClick={this.login}>Login</button>
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