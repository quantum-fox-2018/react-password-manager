import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { db } from '../firebase'
import jwt from 'jsonwebtoken'
import swal from 'sweetalert2'
import bcrypt from 'bcryptjs'

class Listpassword extends Component {
  constructor() {
    super()
    this.state = {
      type: 'password'
    }
  }
  showPass = () => {
    if(this.state.type === 'password'){
      const token = localStorage.getItem('token')
      const decoded = jwt.verify(token, 'SECRET')
      swal.mixin({
        input: 'password',
        confirmButtonText: 'Confirm',
        showCancelButton: true,
        progressSteps: ['1']
      }).queue([
        {
          title: 'Input Password',
          text: ''
        }
      ]).then((result) => {
        if(result.value){
          const check = bcrypt.compareSync(result.value[0], decoded.password)
          console.log(check)
          if (check) {
            swal(
              'Alright',
              '',
              'success'
            ).then(() => {
              this.setState({
                type: 'text'
              })
            })
          } else {
            swal(
              'Error!',
              'Wrong password!',
              'error'
            )
          }
        }
      })
    } else {
      this.setState({
        type: 'password'
      })
    }
  }
  delete = (key) => {
    if(window.confirm('Are you sure want to delete?')){
      db.ref('password-manager/manager/'+key).remove()
    }
  }
  render() {
    return (
      <tr key={this.props.i}>
        <td>{this.props.i+1}</td>
        <td>{this.props.data.website}</td>
        <td><input id="showPass" type={this.state.type} value={this.props.data.password} disabled/></td>
        <td>{this.props.data.createdAt}</td>
        <td>{this.props.data.updatedAt}</td>
        <td>
          <span role="img" aria-label="" onClick={this.showPass}>👁 </span>
          <Link to={`/home/${this.props.data.key}`}><span role="img" aria-label="">📝 </span></Link>
          <span onClick={() => this.delete(this.props.data.key)} role="img" aria-label="">🗑 </span>
        </td>
      </tr>
    );
  }
}

export default Listpassword;