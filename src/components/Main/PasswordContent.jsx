import React, { Component } from 'react'
import { connect } from 'react-redux'
import TbodyPassword from './TbodyPassword'

class PasswordContent extends Component {
  render() {
    const { data, loading, error, searchValue, searchData } = this.props.passwords
    // console.log('dari component', this.props.passwords)
    if (!error.status && loading) {
      return (
      <tr><td colSpan="6">
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      </td></tr>
      )
    } else if (searchValue.length !== 0) {
      // console.log('Kesini ?')
      let passwordSearch = searchData.map((password) =>
        <TbodyPassword data={password} key={"search-pwd"+password.id} />
      )
      return passwordSearch
    } else if (!loading && data && !error.status) {
      // console.log('Kesini ? map')
      let passwordCollection = data.map((password) =>
        <TbodyPassword data={password} key={"pwd"+password.id} />
      ) 
      return (passwordCollection)
    } else {
      // console.log('Ke error ?')
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