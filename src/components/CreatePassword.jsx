import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createPassword } from '../store/password/actions'

class CreatePassword extends Component {
  constructor() {
    super()
    this.state = {
      url: '',
      username: '',
      password: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({ [name]: value })
  }

  savePassword = () => {
    let newPass = {
      url: this.state.url,
      username: this.state.username,
      password: this.state.password
    }
    this.props.createPassword(newPass)
    document.getElementById('close').click()
    this.setState({url:'',username:'',password:''})
  }

  render() {
    return (
      <div>
        
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">New password</h5>
                <button type="button" id="close" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label className="col-form-label">URL:</label>
                    <input type="text" name='url' value={this.state.url} onChange={this.handleInputChange} className="form-control" id="recipient-name" />
                  </div>
                  <div className="form-group">
                    <label className="col-form-label">Username:</label>
                    <input type="text" name='username' value={this.state.username} onChange={this.handleInputChange} className="form-control" id="recipient-name" />
                  </div>
                  <div className="form-group">
                    <label className="col-form-label">Password:</label>
                    <input type="text" name='password' value={this.state.password} onChange={this.handleInputChange} className="form-control" id="recipient-name" />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={this.savePassword}>Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  createPassword
}, dispatch)

export default connect(null, mapDispatchToProps)(CreatePassword)