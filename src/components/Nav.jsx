import React, { Component } from 'react'

class Nav extends Component {
  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper teal">
            <a href="/main" className="brand-logo center">Password Manager</a>
          </div>
        </nav>
      </div>
    )
  }
}

export default Nav