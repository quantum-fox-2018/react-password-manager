import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getPassword, createPassword, deletePassword, updatePassword } from '../store/password/actions'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'


class ListPassword extends Component {
  fetchData() {
    this.props.getPassword()
  }

  componentDidMount() {
    this.fetchData()
  }

  createCustomClearButton = (onClick) => {
    return (
      <button className='btn btn-warning' onClick={onClick}>Clean</button>
    );
  }

  onAfterInsertRow = (row) => {
    let newPass = {
      url: row.url,
      username: row.username,
      password: row.password
    }
    this.props.createPassword(newPass)
  }

  onAfterDeleteRow = (rowKeys) => {
    this.props.deletePassword(rowKeys)
  }

  onAfterSaveCell = (row, cellName, cellValue) => {
    this.props.updatePassword({
      key: row.key,
      url: row.url,
      username: row.username,
      password: row.password,
    })
  }

  onBeforeSaveCell(row, cellName, cellValue) {
    // You can do any validation on here for editing value,
    // return false for reject the editing
    return true;
  }


  render() {
    const options = {
      clearSearch: true,
      clearSearchBtn: this.createCustomClearButton,
      afterInsertRow: this.onAfterInsertRow,
      afterDeleteRow: this.onAfterDeleteRow
    }
    const selectRowProp = {
      mode: 'checkbox'
    }
    const cellEditProp = {
      mode: 'dbclick',
      blurToSave: true,
      beforeSaveCell: this.onBeforeSaveCell, // a hook for before saving cell
      afterSaveCell: this.onAfterSaveCell  // a hook for after saving cell
    }

    return (
      <center>
        <div style={{ width: '85%' }}>
          <BootstrapTable deleteRow={true} selectRow={selectRowProp}
            data={this.props.passwords.data} insertRow={true} options={options}
            cellEdit={cellEditProp}
            search version='4'>
            <TableHeaderColumn dataField='key' isKey hidden>Key</TableHeaderColumn>
            <TableHeaderColumn dataField='url'>URL</TableHeaderColumn>
            <TableHeaderColumn dataField='username'>Username</TableHeaderColumn>
            <TableHeaderColumn dataField='password'>Password</TableHeaderColumn>
          </BootstrapTable>
        </div>
      </center>
    );
  }

}

const mapStateToProps = state => ({
  passwords: state.data
})

const mapsDispatchToProps = (dispatch) => bindActionCreators({
  getPassword,
  createPassword,
  deletePassword,
  updatePassword
}, dispatch)

export default connect(mapStateToProps, mapsDispatchToProps)(ListPassword)