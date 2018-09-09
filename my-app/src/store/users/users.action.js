import {
  GET_USER_SUCCESS,
  GET_USER_PENDING
} from './users.actionType'
import {db} from '../../firebase'

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
