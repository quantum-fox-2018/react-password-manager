import React, { Component } from 'react'
import { connect } from 'react-redux'
import PasswordContent from './PasswordContent'
import SearchPassword from './SearchPassword'

export class PasswordList extends Component {
  render() {
    return (
      <div className="container">
        <div className="card-panel">
          <SearchPassword />
          <table className="striped">
            <thead>
              <tr>
                <th>URL</th>
                <th>Username / Email</th>
                <th>Password</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <PasswordContent />
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  passwords: state.passwords
})

export default connect(mapStateToProps, null)(PasswordList)