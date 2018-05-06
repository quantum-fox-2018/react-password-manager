import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import swal from 'sweetalert'
import { Register } from '../../store/user/user.action'

class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      SUemail: '',
      SUpassword: '',
      SUconPassword: ''
    }
  }
  
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  userRegister = (e) => {
    e.preventDefault()
    if (this.state.SUpassword === this.state.SUconPassword) {
      let newUser = {
        email: this.state.SUemail,
        password: this.state.SUpassword
      }
      console.log(newUser)
      this.props.Register(newUser)
    } else {
      swal('oops!', 'Password does not match!', 'error')
    }
  }

  render() {
    return (
      <div className="col s12">
        <form className="col s12" onSubmit={this.userRegister} >
          <div className="form-container">
            <div className="row">
              <div className="input-field col s12">
                <input id="SUemail" type="email" 
                className="validate" value={this.state.SUemail} 
                onChange={this.handleChange} required/>
                <label htmlFor="SUemail">Email</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="SUpassword" type="password" 
                className="validate" value={this.state.SUpassword} 
                onChange={this.handleChange} required/>
                <label htmlFor="SUpassword">Password</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="SUconPassword" type="password" 
                className="validate" value={this.state.SUconPassword} 
                onChange={this.handleChange} required/>
                <label htmlFor="conPassword">Confirm Password</label>
              </div>
            </div>
            <br />
            <button className="btn waves-effect waves-light teal">
              Register
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  Register
}, dispatch)

export default connect(null, mapDispatchToProps)(SignUp)