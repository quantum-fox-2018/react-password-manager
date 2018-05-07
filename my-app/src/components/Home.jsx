import React, { Component } from 'react';
import {getPassword, removePassword} from '../store/password/password.action'
import {getUser} from '../store/users/users.action'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Link} from 'react-router-dom'
import swal from 'sweetalert2'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import './main.css'

class Home extends Component {
  constructor () {
    super()
    this.state = {
      search: '',
      dataSearch: [],
      passwordType: 'password',
      activeUser: {}
    }
  }
  componentDidMount () {
    this.props.getPassword(localStorage.getItem('username'))
    this.props.getUser()
    console.log('data pass==',this.props.myPassword.data)
  }

  deletePassword (id) {
    let username = localStorage.getItem('username')
    this.props.removePassword(username, id)
  }

  handleSearch = (e) => {
    let listSearchData = this.props.myPassword.data.filter(value => {
      return value.url.toLowerCase().indexOf(e.target.value) !== -1
    })
    console.log(listSearchData)
    this.setState({
      dataSearch : listSearchData
    })
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

  logOutButton = () => {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out!'
    }).then((result) => {
      if (result.value) {
        swal(
          'Logged Out!',
          'You have been logged out.',
          'success'
        )
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        this.props.history.push('/')
      }
    })
  }

  render() {
    if(this.props.myPassword.loading) {
      return (
        <h1>loading data...</h1>
      )
    } else {
      if(!this.props.myPassword.error) {
        return (
          <div className="container">
            <div id="headHome">
              <Link to="/addpassword">
                <button type="button" className="btn btn-primary">Add New Password</button>
              </Link>
              <form className="form-inline">
                <input className="form-control mr-sm-2" type="search" name="search" placeholder="Search" aria-label="Search" 
                onChange={this.handleSearch}/>
                <button className="btn btn-outline-success" type="button">Search</button>
              </form>
              <button type="button" className="btn btn-danger" onClick={this.logOutButton}>Log Out</button>
            </div>
            <hr/>
            <table className="table">
              <thead>
                <tr>
                <th scope="col">#</th>
                  <th scope="col">URL</th>
                  <th scope="col">Username</th>
                  <th scope="col">Password</th>
                  <th scope="col">CreatedAt</th>
                  <th scope="col">UpdatedAt</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.dataSearch.length > 0 ?
                this.state.dataSearch.map((passList, i) => {
                  return (
                    <tr key={passList.id}>
                    <td>{i+1}</td>
                    <td>{passList.url}</td>
                    <td>{passList.username}</td>
                    <td>{passList.password}</td>
                    <td>{passList.createdAt}</td>
                    <td>{passList.updatedAt}</td>
                    <td>
                    <button type="button" className="btn btn-warning" onClick={this.showPassword}><i className="far fa-eye"></i></button>
                    <Link to={{
                      pathname:`/editpassword/${passList.id}`
                    }}>
                      <button type="button" className="btn btn-success"><i className="fas fa-pencil-alt"></i></button>
                    </Link>
                    <button type="button" className="btn btn-danger" onClick={() => this.deletePassword(passList.id)}><i className="fas fa-trash-alt"></i></button>
                    </td>
                  </tr>
                  )
                })
                :
                this.props.myPassword.data.map((passList, i) => {
                  return (
                    <tr key={passList.id}>
                    <td>{i+1}</td>
                    <td>{passList.url}</td>
                    <td>{passList.username}</td>
                    <td>
                      <input type={this.state.passwordType} value={passList.password} disabled 
                      style={{border: 'none', backgroundColor:'white', textAlign:'center'}}/>
                    </td>
                    <td>{passList.createdAt}</td>
                    <td>{passList.updatedAt}</td>
                    <td>
                    <button type="button" className="btn btn-warning" onClick={this.showPassword}><i className="far fa-eye"></i></button>
                    <Link to={{
                      pathname:`/editpassword/${passList.id}`
                    }}>
                      <button type="button" className="btn btn-success"><i className="fas fa-pencil-alt"></i></button>
                    </Link>
                    <button type="button" className="btn btn-danger" onClick={() => this.deletePassword(passList.id)}><i className="fas fa-trash-alt"></i></button>
                    </td>
                  </tr>
                  )
                })
                }
              </tbody>
            </table>
          </div>
        );
      } else {
        return (
          <h1>something wrong!!</h1>
        )
      }
    }
  }
}

const mapStateToProps = (state) => ({
  myPassword: state.passManager,
  users: state.user
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPassword,
  removePassword,
  getUser
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps) (Home);