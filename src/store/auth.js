import { observable } from 'mobx'
import swal from 'sweetalert2'
import { auth } from './firebase'


class Auth {
  userId = ''
  email = ''
  @observable statusAuth = false

  errorNotif(err) {
    swal({
      position: 'center',
      type: 'error',
      title: 'Check your password',
      text: err.message
    })
  }

  successNotif(info) {
    swal({
      position: 'center',
      type: 'success',
      title: info,
      showConfirmButton: false,
      timer: 1000
    })
  }

  signUp(email, password) {
    auth.createUserWithEmailAndPassword(email, password)
    .then(res => {
      this.email = email
      this.userId = res.uid
      this.statusAuth = true
      this.successNotif('Enjoy!')
    })
    .catch(err => {
      this.errorNotif(err)
    })
  }

  signIn(email, password) {
    auth.signInWithEmailAndPassword(email, password)
    .then(res => {
      this.email = email
      this.userId = res.uid
      this.statusAuth = true
      this.successNotif('Welcome Back!')
    })
    .catch(err => {
      this.errorNotif(err)
    })
  }

  signOut() {
    this.email = ''
    this.userId = ''
    auth.signOut()
    .then(res => {
      this.successNotif('See You!')
      this.statusAuth = false
    })
    .catch(err => {
      this.errorNotif(err)
    })
  }
}

export default new Auth()
