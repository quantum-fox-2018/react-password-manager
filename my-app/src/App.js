import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import Addpassword from './components/AddPassword'
import Editpassword from './components/EditPassword'
import LoginUser from './components/Login'
import SignUpUser from './components/Signup'
import { Login } from './store/users/users.action';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Link to="/">
            <h1 className="App-title">Password Manager</h1>
          </Link>
        </header>
        <Switch>
          <Route exact path ="/" component={LoginUser}/>
          <Route path="/home" component={Home}/>
          <Route path="/addpassword" component={Addpassword}/>
          <Route path="/editpassword/:passId" component={Editpassword}/>
          <Route path="/signup" component={SignUpUser}/>
          <Route path="*" 
            render = {() => (
              <h1>Page does not exist!</h1>
            )}
          />
        </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
