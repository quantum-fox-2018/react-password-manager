import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import Addpassword from './components/AddPassword'
import Editpassword from './components/EditPassword'
import LoginUser from './components/Login'
import SignUpUser from './components/Signup'
import PrivateRoute from './PrivateRoute'

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Password Manager</h1>
        </header>
        <Switch>
          <Route exact path ="/" component={LoginUser}/>
          <Route path="/signup" component={SignUpUser}/>
          <PrivateRoute path="/home" component={Home}/>
          <PrivateRoute path="/addpassword" component={Addpassword}/>
          <PrivateRoute path="/editpassword/:passId" component={Editpassword}/>
          <PrivateRoute path="*" 
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
// const userLogin = localStorage.getItem('token')
// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={(props) => (
//     userLogin ? <Component {...props} /> : <Redirect to='/' />
//   )} />
// )

export default App;
