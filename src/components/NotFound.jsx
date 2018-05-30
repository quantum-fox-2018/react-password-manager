import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NotFound extends Component {

  render() {
    return (
      <div>
        <center>
          <div style={{ width: '85%' }}>
            <h1>Page Not Found</h1>
            <br />
            <Link to={'/'}><button type="button" className="btn btn-success">Back</button></Link>
          </div>
        </center>
      </div>
    )
  }

}

export default NotFound

