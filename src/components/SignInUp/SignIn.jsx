import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { SignIn as signInAction } from '../../store/user/user.action'

export class SignIn extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  userSignIn = (e) => {
    e.preventDefault()
    // console.log(this.state)
    this.props.signInAction({...this.state})
  }

  render() {
    return (
      <div className="col s12">
        <form className="col s12" onSubmit={this.userSignIn}>
          <div className="form-container">
            <div className="row">
              <div className="input-field col s12">
                <input id="email" type="email" name="email"
                className="validate" value={this.state.email}
                onChange={this.handleChange} required/>
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="password" type="password" name="password" 
                className="validate" value={this.state.password}
                onChange={this.handleChange} required/>
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <br />
            <button className="btn waves-effect waves-light teal">
              Sign In
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  signInAction
}, dispatch)

export default connect(null, mapDispatchToProps)(SignIn)