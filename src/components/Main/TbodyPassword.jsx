import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import swal from 'sweetalert'
import { DeletePassword } from '../../store/password/password.action'
import EditPassword from './EditPassword'
import ShowPass from './ShowPassword'
import '../../style/MaterialIcon.css'

export class TbodyPassword extends Component {
  dateFormat (times) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let date = new Date(times).getDate()
    let month = new Date(times).getMonth()
    let year = new Date(times).getFullYear()
    return (date < 10)? `0${date} ${months[month]} ${year}`: `${date} ${months[month]} ${year}`
  }

  hidePassword (password) {
    let star = '*'
    return star.repeat(password.length)
  }
  
  showPassword (password, passId) {
    let star = '*'
    let hiddenPass = document.querySelector(`#passId${passId}`)
    // cek kalo masih bintang datanya
    if (hiddenPass.innerHTML.indexOf(star) !== -1) {
      // nanti masukin password dulu
      // panggil modal
      document.querySelector(`#show${passId}`).style.display = 'block'
      document.querySelector(`#show${passId}`).classList.add('in')
      let newDiv = document.createElement('div')
      newDiv.classList.add('modal-backdrop')
      newDiv.classList.add('fade')
      newDiv.classList.add('in')
      document.querySelector('body').appendChild(newDiv)
        
      document.querySelector('body').classList.add('modal-open')
      // ReactDOM.render(password, hiddenPass)
    } else {
      ReactDOM.render(this.hidePassword(password), hiddenPass)
    }
  }

  delPassword () {
    swal({
      title: 'Are you sure?',
      text: `Do you really gonna delete "${this.props.data.url}"`,
      icon: 'warning',
      buttons: [true, 'Yes Delete it']
    }).then(result => {
      if (result) {
        // mending masukin password juga kalo mau ngapus
        this.props.DeletePassword(this.props.data, this.props.user.userId)
      }
    })
  }

  render() {
    let {
      id,
      url,
      email,
      password,
      createdAt,
      updatedAt
    } = this.props.data

    return (
      <tr key={"tbody-"+id}>
        <td>{url}</td>
        <td>{email}</td>
        <td id={'passId'+id}>{this.hidePassword(password)}</td>
        <td>{this.dateFormat(createdAt)}</td>
        <td>{this.dateFormat(updatedAt)}</td>
        <td className="actions">
          <a className="tooltipped" onClick={() => this.showPassword(password, id)}>
            <i className="small material-icons">remove_red_eye</i>
          </a>
          <div className="dropdown">
            <a data-toggle="dropdown">
              <i className="small material-icons">more_vert</i>
            </a>

            {/* more content: edit & delete */}
            <ul className="dropdown-menu">
              <li><a data-toggle="modal" data-target={"#edit"+id} >Edit</a></li>
              <li onClick={() => this.delPassword()}><a>Delete</a></li>
            </ul>
            <EditPassword data={this.props.data} key={"edit-pwd"+id}/>
            <ShowPass 
              data={this.props.data} 
              userData={this.props.user} 
              key={"show-pwd"+id}
            />
          </div>
        </td>
      </tr>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  passwords: state.passwords
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  DeletePassword
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TbodyPassword)