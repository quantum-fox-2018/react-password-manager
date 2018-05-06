import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { SearchPassword as searchPass } from '../../store/password/password.action'

class SearchPassword extends Component {
  constructor() {
    super()
    this.state = {
      searchTerms: ''
    }
  }

  handleChange = (e) => {
    this.props.searchPass(e.target.value)
    this.setState({
      searchTerms: e.target.value
    })
  }

  render() {
    return (
      <div>
        <input type="text" id="searchPass" 
        placeholder="Seach Password By Url"
        value={this.state.searchTerms} onChange={this.handleChange}/>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  searchPass
}, dispatch)

export default connect(null, mapDispatchToProps)(SearchPassword)