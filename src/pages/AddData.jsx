import React, { Component } from 'react';
import { Link } from "react-router-dom";
import auth from '../store/auth'
import user from '../store/user'

import ValidatingPassword from '../components/ValidatingPassword'

class AddData extends Component {
  constructor() {
    super()
    this.state = {
      url: '',
      username: '',
      password: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  resetState = () => {
    this.setState({
      url: '',
      username: '',
      password: ''
    })
  }

  submitData = () => {
    if(user.checkAllValidation()) {
      user.createData(auth.userId, this.state.url, this.state.username, this.state.password)
      this.resetState()
    } else {
      alert('check validation')
    }
  }

  render() {
    return (
      <div>
        <div>
            <div>
              <div className="wrapper">
                <div id="formContent">
                  <div>
                    <img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" />
                  </div>
                  <h1 style={{color:"grey"}}>Create New Password</h1>
                  <input type="text" name='url' placeholder="url" value={this.state.url} onChange={ this.handleChange } />
                  <input type="text" name='username' placeholder="username" value={this.state.username} onChange={ this.handleChange } />
                  <input type="password" name='password' placeholder="password" value={this.state.password} onChange={ this.handleChange } />
                  <ValidatingPassword password={this.state.password} url={this.state.url} />
                  <Link to={`/home`}><button>Back</button></Link>
                  <button type='submit' onClick={ this.submitData }>Create</button>
                  <br/>
                </div>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default AddData;