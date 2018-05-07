import {
  GET_PASSWORD_SUCCESS,
  GET_PASSWORD_LOADING,
  GET_PASSWORD_ERROR,
  ADD_PASSWORD,
  DELETE_PASSWORD,
  EDIT_PASSWORD
} from './password.actionType'
import firebase from 'firebase'
import {db} from '../../firebase'

export const getPassword = (username) => {
  return dispatch => {
    dispatch(getPasswordLoading())
    db.ref(`/password-manager/${username}`).on('value', (snapshot) => {
      console.log('snapshoot==', snapshot.val())
      let arrPassword =[]
      let listPassword = snapshot.val()
      // listPassword.forEach(value => {
        // })
        for(let value in listPassword) {
          console.log('inivaluenya===', value,listPassword[value])
          let data = listPassword[value]
          arrPassword.push({...data, id:value})
      }
      dispatch(getPasswordSuccess(arrPassword))
    }, err => {
      dispatch(getPasswordError())
    })
  }
}

export const addPassword = (payload, username) => {
  console.log('ini add===',payload)
  let newPass = {
    ...payload,
    createdAt: firebase.database.ServerValue.TIMESTAMP,
    updatedAt: firebase.database.ServerValue.TIMESTAMP
  }
  return dispatch => {
    db.ref(`/password-manager/${username}`).push(newPass)
    .then(() => {
      dispatch(addNewPassword())
    })
  }
}

export const removePassword = (username,key) => {
  return dispatch => {
    db.ref(`/password-manager/${username}/${key}`).remove()
    .then(()=>{
      dispatch(removePasswordS())
    })
  }
}

export const editPassword = (payload, username) => {
  console.log('editt===', payload)
  return dispatch => {
    db.ref(`/password-manager/${username}`).child(payload.id).set({
      url: payload.url,
      username: payload.username,
      password: payload.password,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      updatedAt: firebase.database.ServerValue.TIMESTAMP
    }).then(()=>{
      dispatch(editPasswordS())
    })
  }

}

const getPasswordLoading = () => ({
  type: GET_PASSWORD_LOADING
})

const getPasswordSuccess = (data) => ({
  type: GET_PASSWORD_SUCCESS,
  payload: data
})

const getPasswordError = () => ({
  type: GET_PASSWORD_ERROR
})

const addNewPassword = () => ({
  type: ADD_PASSWORD
})

const removePasswordS = () => ({
  type: DELETE_PASSWORD
})

const editPasswordS = () => ({
  type: EDIT_PASSWORD
})