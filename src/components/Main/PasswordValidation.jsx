import React, { Component } from 'react'

class PasswordValidation extends Component {
  uCase = (upperCase) => {
    return (upperCase) ?
      (<li className="collection-item teal">
        [*] Password must contain Upper Case
      </li>) :
      (<li className="collection-item">
        [ ] Password must contain Upper Case
      </li>)
  }

  lCase = (lowerCase) => {
    return (lowerCase) ?
      (<li className="collection-item teal">
        [*] Password must contain Lower Case
      </li>) :
      (<li className="collection-item">
        [ ] Password must contain Lower Case
      </li>)
  }

  sChar = (specialChar) => {
    return (specialChar) ?
      (<li className="collection-item teal">
        [*] Password must contain Special Character
      </li>) :
      (<li className="collection-item">
        [ ] Password must contain Special Character
      </li>)
  }

  num = (number) => {
    return (number) ?
      (<li className="collection-item teal">
        [*] Password must contain at least 1 number
      </li>) :
      (<li className="collection-item">
        [ ] Password must contain at least 1 number
      </li>)
  }

  len = (minLength) => {
    return (minLength) ?
      (<li className="collection-item teal">
        [*] Password minimal 6 digits
      </li>) :
      (<li className="collection-item">
        [ ] Password minimal 6 digits
      </li>)
  }

  render() {
    const { upperCase, lowerCase, specialChar, number, minLength } = this.props 

    return (
      <div className="validationList">
        <h5 className="header2">Password Must Contain :</h5>
        <ul className="collection">
          {this.uCase(upperCase)}
          {this.lCase(lowerCase)}
          {this.sChar(specialChar)}
          {this.num(number)}
          {this.len(minLength)}
        </ul>
      </div>
    )
  }
}

export default PasswordValidation