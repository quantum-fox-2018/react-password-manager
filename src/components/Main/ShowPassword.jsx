import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { User } from '../../store/firebase'
import swal from 'sweetalert'

class ShowPassword extends Component {
  constructor() {
    super()
    this.state = {
      userPassword: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      userPassword: e.target.value
    })
  }

  verificationWithPass = (e) => {
    e.preventDefault()
    let passwordId = this.props.data.id
    let UserId = this.props.userData.userId
    let email = this.props.userData.email
    let password = this.state.userPassword
    
    User.signInWithEmailAndPassword(email, password)
      .then(dataUser => {
        if (dataUser.uid === UserId) {
          let hiddenPass = document.querySelector(`#passId${passwordId}`)
          let showedPass = this.props.data.password
          swal('Good Job!', 'Authentication Succes', 'success')
            .then(result => {
              ReactDOM.render(showedPass, hiddenPass)
              this.closeModal(passwordId)
              this.resetState()
            })
        }
      })
      .catch(err => {
        console.log(err)
        swal('oops..!', err.message, 'error')
      })
  }
  
  closeModal = (passwordId) => {
    document.querySelector(`#show${passwordId}`).style.display = 'none'
    document.querySelector(`#show${passwordId}`).classList.remove('in')
    document.querySelector('.modal-backdrop').remove()
    document.querySelector('body').classList.remove('modal-open')
  }

  resetState = () => {
    this.setState({
      userPassword: ''
    })
    document.getElementsByName('userPassword').value = ''
  }

  render() {
    const { id } = this.props.data
    const { email } = this.props.userData
    return (
      <div id={"show"+id} className="modal fade" role="dialog">
        <div className="modal-dialog row">
          <form className="col s12" onSubmit={this.verificationWithPass}>
            <h4 className="header2">Insert Your Password</h4>
            <div className="row">
              <div className="input-field col s12">
                <input type="text" value={email} disabled/>
              </div>
              <div className="input-field col s12">
                <label>Password :</label>
                <input type="password" name="userPassword" 
                value={this.state.userPassword}
                onChange={this.handleChange} required/>
              </div>
              <div className="input-field col s12">
                <button type="submit" className="btn teal">Sign In</button>
								<button className="btn teal" onClick={() => this.closeModal(id)}>Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default ShowPassword