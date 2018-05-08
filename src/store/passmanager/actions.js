import { GET_PASSMANAGER_DATA_PENDING, GET_PASSMANAGER_DATA_SUCCESS } from './action.types'
import { db }from '../../firebase'

export const getPassmanager = () => {
  return dispatch => {
    dispatch(getPassmanagerPending())
    db.ref('password-manager/manager').on('value', (snapshot) => {
      let passmanagerArray = []
      snapshot.forEach(data => {
        let obj = {
          ...data.val(),
          key: data.key
        }
        passmanagerArray.push(obj)
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