import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { db } from '../firebase'
import { getPassmanager } from '../store/passmanager/actions'
import jwt from 'jsonwebtoken'

class home extends Component {
  constructor () {
    super()
    this.state = {
      website: '',
      password: ''
    }
  }
  componentDidMount() {
    this.props.getPassmanager()
  }
  submitPassword() {
    const token = localStorage.getItem('token')
    const decoded = jwt.verify(token, 'SECRET')
    console.log(this.state)
    db.ref('password-manager/manager/').push({
      username: decoded.username,
      website: this.state.website,
      password: this.state.password
    })
  }
  handleChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.name] : e.target.value
    })
  }
  render() {
    return (
      <div>
        <h1>Home</h1>
        <form>
          <label>Website </label>
          <input type="text" name="website" placeholder="website..."
          value={this.state.website}
          onChange={this.handleChange}
          />
          <label>Password </label>
          <input type="password" name="password" placeholder="password..."
          value={this.state.password}
          onChange={this.handleChange}
          />
          <button type="button" onClick={this.submitPassword}>Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  passmanager: state.passmanager
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPassmanager
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(home);