import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import { TokenCheck } from './store/user/user.action'
import SignInUp from './components/SignInUP'
import Main from './components/Main'
import './App.css'

class App extends Component {
  componentDidMount() {
    let token = localStorage.getItem('uToken')
    if (token) {
      this.props.TokenCheck(token)
    }
  }
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' render={ (props) => (this.props.user.loginStatus) ? (<Redirect to='/main' />) : (<SignInUp />) } />
          <Route path='/main' render={ (props) => (this.props.user.loginStatus) ? (<Main />) : (<Redirect to='/' />) } />
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  TokenCheck
}, dispatch)

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(App)
