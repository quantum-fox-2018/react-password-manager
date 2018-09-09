import React, { Component } from 'react';
import {addPassword} from '../store/password/password.action'
import {getUser} from '../store/users/users.action'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

class AddPassword extends Component {
  constructor () {
    super ()
    this.state = {
      url: '',
      username:'',
      password: ''
    }
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  addPasswordButton = () => {
    let {history} = this.props
    let user = localStorage.getItem('username')
    let newPass = {
      url : this.state.url,
      username: this.state.username,
      password: this.state.password
    }
    this.props.addPassword(newPass, user)
    history.push('/home')
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
        <h3>Add new url</h3>
        <form>
          <div className="form-group">
            <label>URL</label>
            <input type="text" className="form-control" name="url" placeholder="Enter url.."
            value={this.state.url}
            onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input type="text" className="form-control" name="username" placeholder="Enter username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" name="password" placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <button type="button" className={"btn btn-primary "+ (this.allValid() ? "active" : "disabled")} onClick={this.addPasswordButton}>Submit</button>
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

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addPassword,
  getUser
}, dispatch)

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps, mapDispatchToProps) (AddPassword);