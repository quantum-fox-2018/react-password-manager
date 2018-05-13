import React, { Component } from 'react';
import bcrypt from 'bcryptjs'
import {db} from '../firebase'
import firebase from 'firebase'
import jwt from 'jsonwebtoken'
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

class Signup extends Component {
  constructor () {
    super ()
    this.state ={
      username: '',
      password: ''
    }
  }

  handleChange = (e) => {
    // e.preventDefault()
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  addNewUser = () => {
    let {history} = this.props
    let hash = bcrypt.hashSync(this.state.password,salt)
    let newUser = {
      username: this.state.username,
      password: hash,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      updatedAt: firebase.database.ServerValue.TIMESTAMP
    }
    // this.props.signupUser(newUser)
    db.ref('/pass-user').push(newUser)
    .then(() => {
      let token = jwt.sign({username: newUser.username,password: newUser.password}, 'kitten')
      localStorage.setItem('username', this.state.username)
      localStorage.setItem('token', token)
      history.push('/home')
    })
  }

  lowerCase () {
    return (this.state.password.match(/^(?=.*[a-z])/))
  }
  
  upperCase () {
    return (this.state.password.match(/^(?=.*[A-Z])/)) 
  }
  
  oneNum () {
    return (this.state.password.match(/^(?=.*[0-9])/))
  }
  
  minLength () {
    return (this.state.password.length > 6) ? true : false
  }

  specialChar () {
    return (this.state.password.match(/^(?=.*[_\W])/))
  }

  allValid() {
    return (this.minLength() && this.upperCase() && this.lowerCase() && this.oneNum() && this.specialChar())
  }
  render() {
    return (
      <div className="container">
        <h1>Sign up page</h1>
        <form>
          <div className="form-group">
            <label>Username</label>
            <input type="text" id="username" name="username" className="form-control"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" className="form-control"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <button type="button" className={"btn btn-primary "+ (this.allValid() ? "active" : "disabled")} onClick={this.addNewUser}>Sign up</button>
        </form>
        <div style={{marginTop:'10px'}}>
          <h4>Password requirements: </h4>
            <ul className="text-left" style={{listStyle: "none"}}>
              <li className={"alert alert-dismissible " + (this.lowerCase() ? "alert-success" : "alert-danger")}> {this.lowerCase() ? '[ O ]': '[ X ]'} At least <strong>one lowercase</strong></li>
              <li className={"alert alert-dismissible " + (this.upperCase() ? "alert-success" : "alert-danger")}> {this.upperCase() ? '[ O ]': '[ X ]'} At least <strong>one capital</strong></li>
              <li className={"alert alert-dismissible " + (this.oneNum() ? "alert-success" : "alert-danger")}> {this.oneNum() ? '[ O]': '[ X ]'} At least <strong>one number</strong></li>
              <li className={"alert alert-dismissible " + (this.minLength() ? "alert-success" : "alert-danger")}> {this.minLength() ? '[ O ]': '[ X ]'} Minimum <strong>6 characters</strong></li>
              <li className={"alert alert-dismissible " + (this.specialChar() ? "alert-success" : "alert-danger")}> {this.specialChar() ? '[ O ]': '[ X ]'} At least <strong>Use one symbol</strong></li>
            </ul>
          </div>
      </div>
    );
  }
}

export default Signup;