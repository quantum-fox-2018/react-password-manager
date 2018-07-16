import {
  REGISTER,
  SIGN_IN,
  SIGN_OUT
} from './user.action.type'
import { User } from '../firebase'
import swal from 'sweetalert'

export const Register = (payload) => {
  return dispatch => {
    User.createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        console.log(user)
        dispatch(userRegister({userId: user.uid, email: user.email, password: user.password}))
        swal('Good Job!', 'U succesfully Registered', 'success')
        localStorage.setItem('uToken', `${user.uid},${user.email}`)
      })
      .catch(err => {
        swal('oops!', err.message, 'err')
        console.log('Error ===>', err)
      })
  }
}

export const SignIn = (payload) => {
  return dispatch => {
    User.signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        dispatch(userSignIn({userId: user.uid, email: user.email}))
        swal('Good Job!', 'U succesfully Login', 'success')
        localStorage.setItem('uToken', `${user.uid},${user.email}`)
      })
      .catch(err => {
        swal('oops!', err.message, 'error')
        console.log('Error ===>', err)
      })
  }
}

export const SignOut = () => {
  return dispatch => {
    swal({
      title: 'Logout?',
      text: 'Are you sure ?',
      icon: 'warning',
      buttons: [true, 'Yes let me out']
    }).then(result => {
      if (result) {
        User.signOut()
          .then(() => {
            dispatch(userSignOut())
            localStorage.removeItem('uToken')
          })
          .catch(err => {
            swal('oops', err.message, 'error')
            console.log(err)
          })
      }
    })
  }
}

export const TokenCheck = (payload) => {
  return dispatch => {
    let convertToken = payload.split(',')
    let userData = {
      email: convertToken[1],
      userId: convertToken[0]
    }
    dispatch(userSignIn(userData))
  }
}


// actions
const userRegister = (payload) => {
  return {
    type: REGISTER,
    ...payload
  }
}

const userSignIn = (payload) => {
  return {
    type: SIGN_IN,
    ...payload
  }
}

const userSignOut = () => {
  return {
    type: SIGN_OUT
  }
}
