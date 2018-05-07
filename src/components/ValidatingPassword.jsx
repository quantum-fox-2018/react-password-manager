import React, { Component } from 'react';

import user from '../store/user'

class ValidatingPassword extends Component {
  valUrl = (url) => {
    user.checkUrl(url)
    if(!user.valUrl && url.length > 0) {
      return (
        <p>url false</p>
      )
    }
  }

  valMinLength = (password) => {
    user.checkLength(password)
    if(!user.valLength && password.length > 0) {
      return (
        <p>minLength 6</p>
      )
    }
  }

  valHasNumber = (password) => {
    user.checkNumber(password)
    if(!user.valNumber && password.length > 0) {
      return (
        <p>hasNumber false</p>
      )
    }
  }
  valUppercase = (password) => {
    user.checkUpper(password)
    if(!user.valUpper && password.length > 0) {
      return (
        <p>upperCase false</p>
      )
    }
  }
  valLowercase = (password) => {
    user.checkLower(password)
    if(!user.valLower && password.length > 0) {
      return (
        <p>lowerCase false</p>
      )
    }
  }
  valSpecialCharacter = (password) => {
    user.checkSpecial(password)
    if(!user.valSpecial && password.length > 0) {
      return (
        <p>specialCharacter false</p>
      )
    }
  }

  render() {
    return (
      <div>
        <div>{this.valUrl(this.props.url)}</div>
        <div>{this.valUppercase(this.props.password)}</div>
        <div>{this.valLowercase(this.props.password)}</div>
        <div>{this.valHasNumber(this.props.password)}</div>
        <div>{this.valSpecialCharacter(this.props.password)}</div>
        <div>{this.valMinLength(this.props.password)}</div>
      </div>
    );
  }
}

export default ValidatingPassword;