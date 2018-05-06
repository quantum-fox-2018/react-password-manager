import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { AddPassword as AddPasswordAction } from '../../store/password/password.action'
import PasswordValidation from './PasswordValidation'

class AddPassword extends Component {
  constructor() {
    super()
    this.state = {
      newUrl: '',
      newEmail: '',
      newPassword: '',
      upperCase: false,
      lowerCase: false,
      specialChar: false,
      number: false,
      minLength: false,
      isItValid: false
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    }, () => {
      this.uCaseValidation()
      this.lCaseValidation()
      this.sCharValidation()
      this.numberValidation()
      this.lengthValidation()
    })
  }

  uCaseValidation = () => {
    let upperCase = /[A-Z]/g.test(this.state.newPassword)
    if (upperCase) {
      this.setState({ upperCase: true }, () => this.checkAllValidation())
    } else {
      this.setState({ upperCase: false })
    }
    // console.log('upperCase ', upperCase)
  }

  lCaseValidation = () => {
    let lowerCase = /[a-z]/g.test(this.state.newPassword)
    if (lowerCase) {
      this.setState({ lowerCase: true }, () => this.checkAllValidation())
    } else {
      this.setState({ lowerCase: false })
    }
    // console.log('lowerCase ', lowerCase)
  }

  sCharValidation = () => {
    // \W => nonword char
    let specialChar = /\W/g.test(this.state.newPassword)
    if (specialChar) {
      this.setState({ specialChar: true }, () => this.checkAllValidation())
    } else {
      this.setState({ specialChar: false })
    }
    // console.log('special char ', specialChar)
  }

  numberValidation = () => {
    // \d digit char
    let number =  /\d/g.test(this.state.newPassword)
    if (number) {
      this.setState({ number: true }, () => this.checkAllValidation())
    } else {
      this.setState({ number: false })
    }
    // console.log('number ', number)
  }

  lengthValidation = () => {
    if (this.state.newPassword.length < 6) {
      // console.log('length', false)
      this.setState({ minLength: false })
    } else {
      // console.log('length', true)
      this.setState({ minLength: true }, () => this.checkAllValidation())
    }
  }

  checkAllValidation = () => {
    let addButton = document.querySelector('#addPass')
    let upperCase = this.state.upperCase
    let lowerCase = this.state.lowerCase
    let specialChar = this.state.specialChar
    let number = this.state.number
    let minLength = this.state.minLength
    let url = this.state.newUrl
    let email = this.state.newEmail 

    if (upperCase && lowerCase && specialChar &&
    number && minLength && url && email) {
      this.setState({ 
        isItValid: true 
      }, () => {
          addButton.classList.remove('disabled')
      })
    } else {
      this.setState({ isItValid: false}, () => {addButton.classList.add('disabled')})
    }
  }

  resetState = () => {
    this.setState({
      ...this.state,
      newUrl: '',
      newEmail: '',
      newPassword: ''
    })
    document.getElementById('newUrl').value = ''
    document.getElementById('newEmail').value = ''
    document.getElementById('newPassword').value = ''
  }

  submitDataPass = (e) => {
    e.preventDefault()
    let userId = this.props.user.userId
    let newPass = {
      url: this.state.newUrl,
      email: this.state.newEmail,
      password: this.state.newPassword
    }
    console.log('Add Data Pass ===>', newPass)
    this.props.AddPasswordAction(newPass, userId)
    this.resetState()
  }

  render() {
    let PassVal = ''
    if (!this.state.isItValid) {
      PassVal = (
        <PasswordValidation 
          className="col s12"
          upperCase={ this.state.upperCase } 
          lowerCase={ this.state.lowerCase }
          specialChar={ this.state.specialChar }
          number={ this.state.number }
          minLength={ this.state.minLength }
        />
      )
    }
                  
    return (
      <div className="container">
        <div className="card-panel">
          <div className="row">
            <form className="col s12" onSubmit={this.submitDataPass}>
              <h4 className="header2">Add New Password</h4>
              <div className="row">
                <div className="input-field col s12 m3">
                  <input id="newUrl" type="text" 
                  className="validate" value={this.state.newUrl}
                  onChange={this.handleChange} required/>
                  <label htmlFor="newUrl">Url</label>
                </div>
                <div className="input-field col s12 m3">
                  <input id="newEmail" type="text" 
                  className="validate" value={this.state.newEmail}
                  onChange={this.handleChange} required/>
                  <label htmlFor="newEmail">Email / Username</label>
                </div>
                <div className="input-field col s12 m3">
                  <input id="newPassword" type="password" 
                  className="validate" value={this.state.newPassword}
                  onChange={this.handleChange} required/>
                  <label htmlFor="newPassword">Password</label>
                </div>
                <div className="input-field col s12 m3">
                  <button className="btn teal waves-effect waves-light disabled" id="addPass">Add</button>
                </div>
              </div>
              {PassVal}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  passwords: state.passwords
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  AddPasswordAction
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AddPassword)