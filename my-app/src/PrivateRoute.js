import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, Switch, Redirect} from 'react-router-dom'

// const userLogin = localStorage.getItem('token')
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem('token') ? <Component {...props} /> : <Redirect to='/' />
  )} />
)

export default PrivateRoute