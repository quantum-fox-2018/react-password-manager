import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import login from './components/login.jsx'
import home from './components/home.jsx'

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Switch>
          <Route exact path="/" component={ login } />
          <Route path="/home" component={ home } />
        </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
