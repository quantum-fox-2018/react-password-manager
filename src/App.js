import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import { observer } from 'mobx-react';

import auth from '../src/store/auth'
import Auth from './pages/Auth'
import Home from './pages/Home'
import AddData from './pages/AddData'
import Footer from './components/Footer'

import './App.css';

@observer class App extends Component {
  render() {
    return(
      <div className="App">
        {auth.statusAuth}
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" render={ (props) => (auth.statusAuth) ? (<Redirect to='/home' />) : (<Auth />)  } />
              <Route path="/register" render={ (props) => (auth.statusAuth) ? (<Redirect to='/home' />) : (<Auth />)  } />
              <Route exact path="/home" render={ (props) => (auth.statusAuth) ? (<Home />) : (<Redirect to='/' />)  } />
              <Route path="/home/add" render={ (props) => (auth.statusAuth) ? (<AddData />) : (<Redirect to='/' />)  } />
            </Switch>
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
