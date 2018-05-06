import { GET_PASSWORD, GET_PENDING, GET_ERROR, CREATE_PASSWORD, UPDATE_PASSWORD, DELETE_PASSWORD } from './action.Types'
import db from '../../firebase'

export const createPassword = (payload) => {
  return dispatch => {
    db.ref('passwordlist').push(payload)
      .then(() => {
        dispatch(successCreate())
      })
      .catch((err) => {
        dispatch(error(err))
      })
  }
}

export const getPassword = () => {
  return dispatch => {
    dispatch(pending())
    db.ref('passwordlist').on('value', (snapshot) => {
      console.log(snapshot);

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
      .then(() => {
        dispatch(successDelete())
      })
      .catch((err) => {
        dispatch(error(err))
      })
  }
}

export const updatePassword = (payload) => {
  return dispatch => {
    db.ref(`passwordlist/${payload.key}`).update({
      url: payload.url,
      username: payload.username,
      password: payload.password,
    })
    .then(()=>{
      dispatch(successUpdate())
    })
    .catch((err) => {
      dispatch(error(err))
    })
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

function successCreate() {
  return { type: CREATE_PASSWORD }
}

function successDelete() {
  return { type: DELETE_PASSWORD }
}

function successUpdate() {
  return { type: UPDATE_PASSWORD }
}