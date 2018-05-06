import React, { Component } from 'react';
import './App.css';
import CreatePassword from './components/CreatePassword.jsx'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import ListPassword from './components/ListPassword.jsx';
import NotFound from './components/NotFound.jsx'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Password Manager</h1>
        </header>
       <Switch>
         <Route exact path='/' component={ListPassword} />
         <Route path='*' component={NotFound} />
       </Switch>  
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
