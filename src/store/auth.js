import { auth } from './firebase'
import { observable } from 'mobx'

class Auth {
  userId = ''
  password = ''
  @observable statusAuth = false

  signUp(email, password) {
    auth.createUserWithEmailAndPassword(email, password)
    .then(res => {
      this.password = password
      this.userId = res.uid
      this.statusAuth = true
      alert('success signup')
    })
    .catch(err => {
      alert('failed')
    })
  }

  signIn(email, password) {
    auth.signInWithEmailAndPassword(email, password)
    .then(res => {
      this.password = password
      this.userId = res.uid
      this.statusAuth = true
      alert('success login')
    })
    .catch(err => {
      alert('failed')
    })
  }

  signOut() {
    this.password = ''
    this.userId = ''
    auth.signOut()
    .then(res => {
      alert('signout!')
      this.statusAuth = false
    })
    .catch(err => {
      alert('error')
    })
  }
}

export default new Auth()
