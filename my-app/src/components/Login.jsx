import React, { Component } from 'react';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {Link, BrowserRouter as Router} from 'react-router-dom'
import {getUser} from '../store/users/users.action'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import swal from 'sweetalert2'

export class Login extends Component {
  constructor () {
    super ()
    this.state ={
      username: '',
      password: ''
    }
  }
  componentDidMount () {
    this.props.getUser()
  }
  
  handleChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.name] : e.target.value
    })
  }
  
  loginButton = () => {
    const dataUser = this.props.user.data
    // console.log(input)
    dataUser.map(value => {
      console.log('mapvalue==', value)
      if(value.username === this.state.username) {
        let checkPass = bcrypt.compareSync(this.state.password,value.password)
        if(checkPass) {
          let token = jwt.sign({id:value.id, password: value.password}, 'kitten')
          localStorage.setItem('username', this.state.username)
          localStorage.setItem('token', token)
          swal(
            'Welcome!',
            'Welcome back to password manager!',
            'success'
          )
          this.props.history.push('/home')
        }
      }
    })
  }

  render() {
    return (
      <Router>
      <div className="container">
        <form>
          <div className="form-group">
            <label>Username</label>
            <input type="text"  name="username" className="form-control"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input id="password" type="password" name="password" className="form-control"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <button type="button" className="btn btn-primary" onClick={this.loginButton}>Login</button>
        </form>
        <div className="container">
        <p>New user?</p>
          <Link to="/signup">
            Sign up Here
          </Link>
        </div>
      </div>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getUser
}, dispatch)

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps, mapDispatchToProps) (Login);