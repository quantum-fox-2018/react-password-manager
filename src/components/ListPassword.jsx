import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getPassword, createPassword, deletePassword, updatePassword } from '../store/password/actions'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import swal from 'sweetalert2'
import moment from 'moment'


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
      password: row.password
    })
  }


  render() {
    if (this.props.passwords.loading) {
      return (
        <div>
          {
            swal.showLoading()
          }
        </div>
      )

    }
    else if (this.props.passwords.error.status) {
      return (
        <div>
          {
            swal.hideLoading()
          }
          {
            swal.close()
          }
          <h2 style={{ color: 'red' }} >{this.props.passwords.error.msg}</h2>
        </div>
      )
    }
    else {


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

      function urlValidator(value, row) {
        const response = { isValid: true, notification: { type: 'success', msg: '', title: '' } };
        if (!value) {
          response.isValid = false;
          response.notification.type = 'error';
          response.notification.msg = 'URL must be inserted';
          response.notification.title = 'Required URL';
        }
        return response
      }

      function userValidator(value, row) {
        const response = { isValid: true, notification: { type: 'success', msg: '', title: '' } };
        if (!value) {
          response.isValid = false;
          response.notification.type = 'error';
          response.notification.msg = 'Username must be inserted';
          response.notification.title = 'Required Username';
        }
        return response
      }

      function passValidator(value, row) {
        const response = { isValid: true, notification: { type: 'success', msg: '', title: '' } };
        var patt = new RegExp("^.*(?=.{5,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])[a-zA-Z0-9@#$%^&+=]*$");
        if (!value) {
          response.isValid = false;
          response.notification.type = 'error';
          response.notification.msg = 'Password must be inserted';
          response.notification.title = 'Required Password';
        } else if (value.length < 5) {
          response.isValid = false;
          response.notification.type = 'error';
          response.notification.msg = 'Password must have 5+ characters';
          response.notification.title = 'Invalid Password';
        }
        else if (patt.test(value) === false) {
          response.isValid = false;
          response.notification.type = 'error';
          response.notification.msg = 'Password must have at least one uppercase letter, one lowercase letter, one number and one special character';
          response.notification.title = 'Invalid Password';
        }

        return response;
      }

      return (
        <center>
          {
            swal.hideLoading()
          }
          {
            swal.close()
          }
          <div style={{ width: '85%' }}>
            <p style={{ color: 'red' }}><b>Double Click Row For Edit</b></p>
            <BootstrapTable deleteRow={true} selectRow={selectRowProp}
              data={this.props.passwords.data} insertRow={true} options={options}
              striped={true} hover={true} cellEdit={cellEditProp}
              search version='4'>
              <TableHeaderColumn dataField='key' isKey hidden hiddenOnInsert autoValue>Key</TableHeaderColumn>
              <TableHeaderColumn dataField='url' editable={{ validator: urlValidator }} validateState>URL</TableHeaderColumn>
              <TableHeaderColumn dataField='username' editable={{ validator: userValidator }}>Username</TableHeaderColumn>
              <TableHeaderColumn dataField='password' editable={{ validator: passValidator }}>Password</TableHeaderColumn>
              <TableHeaderColumn dataField='createdAt' editable={false} dataFormat={(cDate) => moment(cDate).format("MMMM Do YYYY (hh:mm a)")}>Created At</TableHeaderColumn>
              <TableHeaderColumn dataField='updatedAt' editable={false} dataFormat={(cDate) => moment(cDate).format("MMMM Do YYYY (hh:mm a)")}>Updated At</TableHeaderColumn>
            </BootstrapTable>
          </div>
        </center>
      );
    }
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