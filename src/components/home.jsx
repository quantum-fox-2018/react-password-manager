import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router, Switch} from "react-router-dom";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { db } from '../firebase'
import { getPassmanager } from '../store/passmanager/actions'
import input from './input'
import edit from './edit'
import jwt from 'jsonwebtoken'
import Listpassword from './Listpassword';

class home extends Component {
  constructor() {
    super()
    this.state = {
      search: '',
      dataSearch: []
    }
  }
  componentDidMount() {
    this.props.getPassmanager()
  }
  handleChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.name] : e.target.value,
    })
  }
  dontEnter = () => {
    alert('LOGIN FIRST!')
    this.props.history.push("/")
  }
  search = () => {
    let search = this.props.passmanager.data.filter(data => {
      return data.website.indexOf(this.state.search) !== -1
    })
    this.state.dataSearch = search
    console.log('state',this.state.dataSearch)
  }
  render() {
    if(localStorage.getItem('token')){
      const token= localStorage.getItem('token')
      const decoded= jwt.verify(token, 'SECRET')
      let dataArray = []
      this.props.passmanager.data.map(data => {
        if(decoded.username === data.username){
          dataArray.push(data)
        }
      })
      let password = []
      if(this.state.dataSearch.length <= 0){
        password = dataArray.map((data, i) => 
          (<Listpassword data={data} i={i}/>)
        )
      } else {
        password = this.state.dataSearch.map((data, i) => 
          (<Listpassword data={data} i={i}/>)
        )
      }
      if(!this.props.loading) {
        return (
          <Router>
          <div className="container">
            <input type="text" name="search" placeholder="search..."
            value={this.state.search}
            onChange={this.handleChange}
            style={{width: '15%'}}
            />
            <button type="button" className="btn" style={{width: '10%', backgroundColor: 'grey'}} onClick={this.search}> Search </button>
            <h2>Password Manager</h2>
            <div>
              <table>
                <tbody>
                  <tr>
                    <th>#</th>
                    <th>Website</th>
                    <th>Password</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                  {password}
                </tbody>
              </table>
              <br/>
              <hr/>
              <br/>
              <Link type="button" className="btn" to={"/home/input"}>Input new data</Link>
              <Switch>
              <Route path={"/home/input"} component={ input }></Route>
              <Route path={"/home/:key"} component={ edit }></Route>
              </Switch>
            </div>
          </div>
          </Router>
        )
      } else {
        return (
          <h1>Loading . . .</h1>
        )
      }
    } else {
      return (
        <h1>LOGIN FIRST</h1>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  passmanager: state.passmanager
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPassmanager
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(home);