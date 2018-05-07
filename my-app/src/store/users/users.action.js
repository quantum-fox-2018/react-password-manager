import {
  SIGNUP,
  GET_USER_SUCCESS,
  GET_USER_PENDING
} from './users.actionType'
import {db} from '../../firebase'
import firebase from 'firebase'

export const signupUser = (payload) => {
  let newUser = {
    ...payload,
    createdAt: firebase.database.ServerValue.TIMESTAMP,
    updatedAt: firebase.database.ServerValue.TIMESTAMP
  }
  return dispatch => {
    db.ref('/pass-user').push(newUser)
    .then(() => {
      dispatch(userSignUp())
    })
  }
}

export const getUser = (payload) => {
  // console.log('masuk login==', payload)s
  return dispatch => {
    dispatch(getUserDataPending())
    db.ref('/pass-user').on('value', snapshot => {
      let arrUser = []
      let userData = snapshot.val()
      for(let value in userData) {
        let data = userData[value]
        arrUser.push({...data, id: value})
      }
      dispatch(getUserDataSucces(arrUser))
    })
  }
}

const userSignUp = (data) => {
  return {
    type: SIGNUP,
    payload: data
  }
}

const getUserDataSucces = (data) => {
  return {
    type: GET_USER_SUCCESS,
    payload: data
  }
}
const getUserDataPending = () => {
  return {
    type: GET_USER_PENDING
  }
}
