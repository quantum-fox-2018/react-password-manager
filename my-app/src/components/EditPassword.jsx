import React, { Component } from 'react';
import {editPassword, getPassword} from '../store/password/password.action'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

class EditPassword extends Component {
  constructor () {
    super ()
    this.state = {
      editId: '',
      editUrl: '',
      editUsername:'',
      editPassword: ''
    }
  }

  componentDidMount () {
    this.props.getPassword()
    let listPassword = this.props.myPassword.data
    listPassword.map(value => {
      if(value.id === this.props.match.params.passId) {
        this.setState({
          editId: value.id,
          editUrl: value.url,
          editUsername: value.username,
          editPassword: value.password
        })
      }
    })
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  editPasswordButton = () => {
    let newPass = {
      id: this.state.editId,
      url : this.state.editUrl,
      username: this.state.editUsername,
      password: this.state.editPassword
    }
    let user = localStorage.getItem('username')
    this.props.editPassword(newPass, user)
    this.props.history.push('/home')
  }
  lowerCase () {
    return (this.state.editPassword.match(/^(?=.*[a-z])/))
  }
  
  upperCase () {
    return (this.state.editPassword.match(/^(?=.*[A-Z])/)) 
  }
  
  oneNum () {
    return (this.state.editPassword.match(/^(?=.*[0-9])/))
  }
  
  minLength () {
    return (this.state.editPassword.length > 6) ? true : false
  }

  specialChar () {
    return (this.state.editPassword.match(/^(?=.*[_\W])/))
  }

  allValid() {
    return (this.minLength() && this.upperCase() && this.lowerCase() && this.oneNum() && this.specialChar())
  }
  render() {
    return (
      <div className="container"> 
        <h3>Edit data password for {this.props.myPassword.data.id}</h3>
          <form>
            <div className="form-group">
              <label>URL</label>
              <input type="text" className="form-control" name="editUrl"
              value={this.state.editUrl}
              onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label>Username</label>
              <input type="text" className="form-control" name="editUsername"
                value={this.state.editUsername}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" name="editPassword"
                value={this.state.editPassword}
                onChange={this.handleChange}
              />
            </div>
            <button type="button" className={"btn btn-primary "+ (this.allValid() ? "active" : "disabled")} onClick={this.editPasswordButton}>Submit</button>
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

const mapStateToProps = (state) => ({
  myPassword: state.passManager
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPassword,
  editPassword,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps) (EditPassword);