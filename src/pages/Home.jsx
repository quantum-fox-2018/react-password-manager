import React, { Component } from 'react';

import CreateData from '../components/CreateData'
import LoadData from '../components/LoadData'
import NavBar from '../components/NavBar'

class Home extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <CreateData /> <br/>
        <LoadData />
      </div>
    )
  }
}

export default Home;