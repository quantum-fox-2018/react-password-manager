import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Link} from 'react-router-dom'
import swal from 'sweetalert2'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import {removePassword} from '../store/password/password.action'

class ListPassword extends Component {
  constructor () {
    super()
    this.state = {
      passwordType: 'password'
    }
  }

  deletePassword (id) {
    let username = localStorage.getItem('username')
    this.props.removePassword(username, id)
  }

  showPassword = () => {
    let decoded = jwt.verify(localStorage.getItem('token'), 'kitten')
    console.log(decoded)
    if(this.state.passwordType === 'password') {
      swal.mixin({
        input: 'password',
        confirmButtonText: 'Input &rarr;',
        showCancelButton: true,
        progressSteps: ['1']
      }).queue([
        {
          title: 'Enter Password',
        }
      ]).then((result) => {
        if (result.value) {
          let checkPass = bcrypt.compareSync(result.value[0],decoded.password)
          if(checkPass) {
            swal(
              'Match!',
              'You entered right password!',
              'success'
            )
            this.setState({
              passwordType: 'text'
            })
          } else {
            swal(
              'Opps!',
              'You entered wrong password!',
              'error'
            )
          }
        }
      })
    } else {
      this.setState({
        passwordType: 'password'
      })
    }
  }
  render() {
    return (
      <tr key={this.props.data.id}>
        <td>{this.props.i+1}</td>
        <td>{this.props.data.url}</td>
        <td>{this.props.data.username}</td>
        <td>
          <input type={this.state.passwordType} value={this.props.data.password} disabled 
          style={{border: 'none', backgroundColor:'white', textAlign:'center'}}/>
        </td>
        <td>{this.props.data.createdAt}</td>
        <td>{this.props.data.updatedAt}</td>
        <td>
        <button type="button" className="btn btn-warning" onClick={this.showPassword}><i className="far fa-eye"></i></button>
        <Link to={{
          pathname:`/editpassword/${this.props.data.id}`
        }}>
          <button type="button" className="btn btn-success"><i className="fas fa-pencil-alt"></i></button>
        </Link>
        <button type="button" className="btn btn-danger" onClick={() => this.deletePassword(this.props.data.id)}><i className="fas fa-trash-alt"></i></button>
        </td>
      </tr>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  removePassword
}, dispatch)

export default connect(null, mapDispatchToProps) (ListPassword);