import React, { Component } from 'react';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { db } from '../firebase'
const salt = bcrypt.genSaltSync(10)

class register extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      email: '',
      password: ''
    }
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
  handleChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.name] : e.target.value
    })
    this.passwordCheck()
  }
  passwordCheck = () => {
    let myInput = this.state.password;
    let letter = document.getElementById("letter");
    let capital = document.getElementById("capital");
    let number = document.getElementById("number");
    let length = document.getElementById("length");
    
    // Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    if(myInput.match(lowerCaseLetters)) {  
      letter.classList.remove("invalid");
      letter.classList.add("valid");
    } else {
      letter.classList.remove("valid");
      letter.classList.add("invalid");
    }
    
    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if(myInput.match(upperCaseLetters)) {  
      capital.classList.remove("invalid");
      capital.classList.add("valid");
    } else {
      capital.classList.remove("valid");
      capital.classList.add("invalid");
    }

    // Validate numbers
    var numbers = /[0-9]/g;
    if(myInput.match(numbers)) {  
      number.classList.remove("invalid");
      number.classList.add("valid");
    } else {
      number.classList.remove("valid");
      number.classList.add("invalid");
    }
    
    // Validate length
    if(myInput.length >= 8) {
      length.classList.remove("invalid");
      length.classList.add("valid");
    } else {
      length.classList.remove("valid");
      length.classList.add("invalid");
    }
  }
  render() {
    return (
      <div>
        <form className="login container">
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
            <input type="password" name="password" placeholder="password..." id="psw"
            value={this.state.password}
            onChange={this.handleChange}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required
            />
            <button className="btn" type="button" onClick={this.register}>Register</button>
          </form>
          <div id="message">
            <h3>Password must contain the following:</h3>
            <p id="letter" class="invalid">A <b>lowercase</b> letter</p>
            <p id="capital" class="invalid">A <b>capital (uppercase)</b> letter</p>
            <p id="number" class="invalid">A <b>number</b></p>
            <p id="length" class="invalid">Minimum <b>8 characters</b></p>
          </div>
      </div>
    );
  }
}

export default register;