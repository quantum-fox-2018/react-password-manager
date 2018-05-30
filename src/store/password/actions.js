import { GET_PASSWORD, GET_PENDING, GET_ERROR, CREATE_PASSWORD, UPDATE_PASSWORD, DELETE_PASSWORD } from './action.Types'
import db from '../../firebase'
import firebase from 'firebase'

export const createPassword = (payload) => {
  let newPayload = {...payload, createdAt: firebase.database.ServerValue.TIMESTAMP}
  return dispatch => {
    db.ref('passwordlist').push(newPayload)
  }
}

export const getPassword = () => {
  return dispatch => {
    dispatch(pending())
    db.ref('passwordlist').on('value', (snapshot) => {
      dispatch(successGet(convertToArray(snapshot)))
    })
  }
}

const convertToArray = (snapshot) => {
  let arrPass = [];
  snapshot.forEach((dataSnapshot) => {
    let item = dataSnapshot.val();
    item.key = dataSnapshot.key;
    arrPass.push(item);
  })
  return arrPass;
}

export const deletePassword = (payload) => {
  return dispatch => {
    let convert = payload.toString()
    let result = convert.split(',')
    result.forEach((dataResult) => {
      db.ref('passwordlist').child(`${dataResult}`).remove()
    })
  }
}

export const updatePassword = (payload) => {
   let newPayload = {...payload, updatedAt: firebase.database.ServerValue.TIMESTAMP}
  return dispatch => {
    db.ref(`passwordlist/${payload.key}`).update(newPayload)
  }
}

function pending() {
  return { type: GET_PENDING }
}

function error(error) {
  return { type: GET_ERROR ,error}
}

function successGet(payload) {
  return { type: GET_PASSWORD, payload }
}
