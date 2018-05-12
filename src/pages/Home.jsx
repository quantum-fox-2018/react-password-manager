import React, { Component } from 'react';

import LoadData from '../components/LoadData'
import Headers from '../components/Headers'

import '../css/Home.css'

class Home extends Component {
  render() {
    return (
      <div>
        <Headers />
        <LoadData />
      </div>
    )
  }
}

export default Home;