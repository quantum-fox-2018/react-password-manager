import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'
import { observer } from 'mobx-react';

import auth from '../src/store/auth'
import Auth from './pages/Auth'
import Home from './pages/Home'

import logo from './logo.svg';
import './App.css';

@observer class App extends Component {
  render() {
    return(
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {auth.statusAuth}
        <Router>
          <div className="App">
            <Route exact path="/" render={ (props) => (auth.statusAuth) ? (<Redirect to='/home' />) : (<Auth />)  } />
            <Route path="/home" render={ (props) => (auth.statusAuth) ? (<Home />) : (<Redirect to='/' />)  } />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
