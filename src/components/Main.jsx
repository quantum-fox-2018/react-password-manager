import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Nav from './Nav'
import AddPassword from './Main/AddPassword'
import PasswordList from './Main/PasswordList'
import { SignOut } from '../store/user/user.action'
import { loadPassword } from '../store/password/password.action'
import '../style/Main.css'

class Main extends Component {
  componentDidMount() {
    let userId = this.props.user.userId
    this.props.loadPassword(userId)
  }

  render() {
    return (
      <div>
        <Nav />
        <div className="header">
          <button className="btn" onClick={this.props.SignOut}>Logout</button>
        </div>
        <AddPassword />
        <PasswordList />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  SignOut,
  loadPassword
}, dispatch)

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Main)