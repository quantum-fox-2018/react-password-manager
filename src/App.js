import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import login from './components/login.jsx'
import register from './components/register.jsx'
import home from './components/home.jsx'

class App extends Component {
  logout = () => {
    if(window.confirm('Are you sure want to logout?')){
      localStorage.removeItem('token')
      window.location.reload()
    }
  }
  render() {
    return (
      <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Password Manager</h1>
          <button className="App-title-right" onClick={this.logout}>Logout</button>
        </header>
        <Switch>
          <Route exact path="/" component={ login } />
          <Route path="/register" component={ register } />
          <Route path="/home" component={ home } />
        </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
