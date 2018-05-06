import { GET_PASSMANAGER_DATA_PENDING, GET_PASSMANAGER_DATA_SUCCESS, GET_PASSMANAGER_DATA_ERROR } from './action.types'
import { db }from '../../firebase'

export const getPassmanager = () => {
  return dispatch => {
    dispatch(getPassmanagerPending())
    db.ref('password-manager/manager').on('value', (snapshot) => {
      let passmanagerArray = []
      snapshot.forEach(data => {
        passmanagerArray.push(data.val())
      })
      dispatch(getPassmanagerSuccess(passmanagerArray))
    })
  }
}

const getPassmanagerPending = () => ({
  type: GET_PASSMANAGER_DATA_PENDING
})

const getPassmanagerSuccess = (data) => ({
  type: GET_PASSMANAGER_DATA_SUCCESS,
  payload: data
})

const getPassmanagerError = (error) => ({
  type: GET_PASSMANAGER_DATA_ERROR
})