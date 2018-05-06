import { GET_USER_DATA_SUCCESS, GET_USER_DATA_PENDING, GET_USER_DATA_ERROR } from './action.types'

const intialState = {
  loading: false,
  data: [],
  error: false
}

const usersReducer = (state={...intialState}, action) => {
  switch (action.type) {
    case GET_USER_DATA_PENDING:
      return {
        ...state,
        loading: true
      }
    case GET_USER_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      }
    case GET_USER_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      }
    default:
      return state
  }
}

export default usersReducer