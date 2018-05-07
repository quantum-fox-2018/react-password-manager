import React, { Component } from 'react';
import {getPassword, removePassword} from '../store/password/password.action'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Link} from 'react-router-dom'

class Home extends Component {
  componentDidMount () {
    this.props.getPassword(localStorage.getItem('username'))
    console.log('data pass==',this.props.myPassword.data)
  }

  deletePassword (id) {
    let username = localStorage.getItem('username')
    this.props.removePassword(username, id)
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
          <div>
          <Link to="/addpassword">
            <button type="button" className="btn btn-primary">Add New Password</button>
          </Link>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
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
                {this.props.myPassword.data.map((passList, i) => {
                  return (
                    <tr key={passList.id}>
                    <td>{i+1}</td>
                    <td>{passList.url}</td>
                    <td>{passList.username}</td>
                    <td>{passList.password}</td>
                    <td>{passList.createdAt}</td>
                    <td>{passList.updatedAt}</td>
                    <td>
                    <button type="button" className="btn btn-warning">Show Password</button>
                    <Link to={{
                      pathname:`/editpassword/${passList.id}`
                    }}>
                      <button type="button" className="btn btn-success">Edit</button>
                    </Link>
                    <button type="button" className="btn btn-danger" onClick={() => this.deletePassword(passList.id)}>Remove</button>
                    </td>
                  </tr>
                  )
                })}
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
  myPassword: state.passManager
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPassword,
  removePassword
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps) (Home);