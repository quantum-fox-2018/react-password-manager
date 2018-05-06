import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CreatePassword from './components/CreatePassword.jsx'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import ListPassword from './components/ListPassword.jsx';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
       <Switch>
         <Route exact path='/' component={ListPassword} />
       </Switch>  
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
