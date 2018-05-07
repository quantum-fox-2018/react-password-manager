import { observable } from 'mobx'
import swal from 'sweetalert2'


import { db, auth } from './firebase'
import authData from './auth'

class PassManager {
  @observable listData = []
  valUrl = false
  valLength = false
  valNumber = false
  valUpper = false
  valLower = false
  valSpecial = false
  allVal = false

  checkUrl(url) {
    let regex = /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi
    this.valUrl = regex.test(url)
    return this.valUrl
  }

  checkLength(password) {
    this.valLength = (password.length >= 6)
    return this.valLength
  }

  checkNumber(password) {
    this.valNumber = (/\d/g.test(password))
    return this.valNumber
  }

  checkUpper(password) {
    this.valUpper = (/[A-Z]/g.test(password))
    return this.valUpper
  }

  checkLower(password) {
    this.valLower = (/[a-z]/g.test(password))
    return this.valLower
  }

  checkSpecial(password) {
    this.valSpecial = (/\W/g.test(password))
    return this.valSpecial
  }

  checkAllValidation() {
    if(this.valUrl && this.valLength && this.valNumber && this.valUpper && this.valLower && this.valSpecial) {
      this.allVal = true
      return this.allVal
    }
  }

  hashPassword(str) {
    let length = str.length
    let bullet = String.fromCharCode(0x2022)
    return bullet.repeat(length)
  }

  showPassword(userId, idData) {
    swal.mixin({
      input: 'password',
      confirmButtonText: 'Confirm',
      showCancelButton: true,
    }).queue([
      {
        title: 'Password',
        text: 'enter your password'
      }
    ]).then((result) => {
      if (!result.value) {
        swal({
          type: 'question',
        })
      } else if (result.value[0]) {
        auth.signInWithEmailAndPassword(authData.email, result.value[0])
        .then(res => {
          let data = this.listData.map(data => {
            if(data.id === idData) {
              return {...data, showPassword: !data.showPassword}
            } else {
              return {...data}
            }
          })
          this.listData = data  
        })
        .catch(err => {
          swal({
            type: 'error',
            title: 'Error',
            text: err.message
          })
        })
      }
    })
  }

  loadData(userId) {
    db.ref(`/user/${userId}`).once('value', (snap) => {
      const pass = snap.val()
      let arr = []
      for (const key in pass) {
        if (pass.hasOwnProperty(key)) {
          const el = pass[key]
          const update = {...el, id: key, showPassword: false}
          arr.push(update)
        }
      }
      this.listData = arr
    })
  }

  createData(userId, url, username, password) {
    db.ref(`/user/${userId}`).push({
      url, username, password, createdAt: Date.now(), updatedAt: null
    })
    .then(res => {
      swal({
        position: 'center',
        type: 'success',
        title: 'Your password has been saved',
        showConfirmButton: false,
        timer: 1500
      })
      this.loadData(userId)
    })
    .catch(err => {
      alert(err)
    })
  }

  deleteData(userId, idData) {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        db.ref(`/user/${userId}`).child(idData).remove()
        this.loadData(userId)
        swal(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  editPassword(userId, idData) {
    swal.mixin({
      input: 'password',
      confirmButtonText: 'Confirm',
      showCancelButton: true,
      inputAttributes: {
        'minlength': 6,
        'autocapitalize': 'off',
        'autocorrect': 'off'
      }
    }).queue([
      {
        title: 'Edit Password',
        text: 'enter your new password'
      }
    ]).then((result) => {
      if (result.value) {
        let data = this.listData.map(data => {
          if(data.id === idData) {
            let newData = {...data, password: result.value[0], updatedAt: Date.now()}
            db.ref(`/user/${userId}`).child(idData).update(newData)
            return newData
          } else {
            return {...data}
          }
        })
        this.listData = data
        swal({
          position: 'center',
          type: 'success',
          title: 'Your password has been edited',
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        swal({
          type: 'question',
        })
      }
    })
  }
}

export default new PassManager()
