import {
  LOAD_PASSWORD_SUCCESS,
  LOAD_PASSWORD_PENDING,
  LOAD_PASSWORD_ERROR,
  ADD_PASSWORD,
  EDIT_PASSWORD,
  DELETE_PASSWORD,
  SEARCH_PASSWORD
} from './password.action.type'
import firebase from 'firebase'
import swal from 'sweetalert'
import { Database } from '../firebase.js'

export const loadPassword = (userId) => {
  return dispatch => {
    dispatch(loadPasswordPending())
    return Database.ref(`/password/${userId}`).on('value', snap => {
      const dataPassword = snap.val()
      // console.log('Password Data ===>', dataPassword)
      let passwordCollection = []
      for (const key in dataPassword) {
        // kalo null error
        if (dataPassword.hasOwnProperty(key)) {
          let pwd = dataPassword[key]
          // masukin key dari data password ke data baru sebagai id
          let newPwd = {...pwd, id: key}
          passwordCollection.push(newPwd)
        } 
      }
      // console.log('Data in array ===>', passwordCollection)
      dispatch(loadPasswordSucces(passwordCollection))
    }, err => {
      console.log('Load Error ===>', err)
      dispatch(loadPasswordError())
    })
  }
}

export const AddPassword = (payload, userId) => {
  // console.log('Before created At ===>', payload)
  payload = {
    ...payload,
    createdAt: firebase.database.ServerValue.TIMESTAMP,
    updatedAt: firebase.database.ServerValue.TIMESTAMP
  }
  // console.log('After created At ===>', payload)
  // console.log('User ID ===>', userId)
  return dispatch => {
    Database.ref(`/password/${userId}`).push(payload)
      .then(() => {
        dispatch(addPassword())
        swal('Nice!', 'New Password Data Added', 'success')
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const EditPassword = (payload, userId) => {
  let passwordId = payload.id
  payload = {
    ...payload,
    url: payload.url,
    email: payload.email,
    password: payload.password,
    updatedAt: firebase.database.ServerValue.TIMESTAMP
  }
  // console.log('Update Password', payload)
  return dispatch => {
    Database.ref(`/password/${userId}/${passwordId}`)
      .update(payload)
      .then(() => {
        dispatch(editPassword())
        swal('Nice!', 'Update Password Data Success', 'success')
        // menghilangkan modal setelah data berhasil di update
        document.querySelector(`#edit${passwordId}`).style.display = 'none'
        document.querySelector(`#edit${passwordId}`).classList.remove('in')
        document.querySelector('.modal-backdrop').remove()
        document.querySelector('body').classList.remove('modal-open')
      })
      .catch(err => {console.log(err)})
  }
}

export const DeletePassword = (payload, userId) => {
  let passwordId = payload.id
  return dispatch => {
    Database.ref(`/password/${userId}/${passwordId}`)
      .remove()
      .then(() => {
        dispatch(deletePassword())
        swal('Bye!', 'Password successfully deleted', 'success')
      })
      .catch(err => {console.log(err)})
  }
}

export const SearchPassword = (payload) => ({
  type: SEARCH_PASSWORD,
  payload
})
/* =====================================  */

const loadPasswordSucces = (payload) => ({
  type: LOAD_PASSWORD_SUCCESS,
  payload
})

const loadPasswordPending = () => ({
  type: LOAD_PASSWORD_PENDING
})

const loadPasswordError = () => ({
  type: LOAD_PASSWORD_ERROR
})

const addPassword = () => ({
  type: ADD_PASSWORD
})

const editPassword = () => ({
  type: EDIT_PASSWORD
})

const deletePassword = () => ({
  type: DELETE_PASSWORD
})