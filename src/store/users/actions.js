import { GET_USER_DATA_PENDING, GET_USER_DATA_SUCCESS, GET_USER_DATA_ERROR } from './action.types'
import { db }from '../../firebase'

export const getUsers = () => {
  return dispatch => {
    dispatch(getUsersPending())
    db.ref('password-manager/users').on('value', (snapshot) => {
      let usersArray = []
      snapshot.forEach(data => {
        usersArray.push(data.val())
      })
      dispatch(getUsersSuccess(usersArray))
    })
  }
}

const getUsersPending = () => ({
  type: GET_USER_DATA_PENDING
})

const getUsersSuccess = (data) => ({
  type: GET_USER_DATA_SUCCESS,
  payload: data
})

const getUsersError = (error) => ({
  type: GET_USER_DATA_ERROR
})