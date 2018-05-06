import React, { Component } from 'react'
import { connect } from 'react-redux'
import TbodyPassword from './TbodyPassword'

class PasswordContent extends Component {
  render() {
    const { data, loading, error, searchValue, searchData } = this.props.passwords
    if (!error.status && loading) {
      return (
      <tr><td colSpan="6">
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      </td></tr>
      )
    } else if (searchValue.length !== 0) {
      let passwordSearch = searchData.map((password) =>
        <TbodyPassword data={password} key={password.id} />
      )
      return passwordSearch
    } else if (!loading && data && !error.status) {
      let passwordCollection = data.map((password) =>
        <TbodyPassword data={password} key={password.id} />
      ) 
      return (passwordCollection)
    } else {
      return (
        <tr>
          <td colSpan="6">
          {'Something went wrong : ' + error.message }
          </td>
        </tr>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  passwords: state.passwords
})

export default connect(mapStateToProps, null)(PasswordContent)