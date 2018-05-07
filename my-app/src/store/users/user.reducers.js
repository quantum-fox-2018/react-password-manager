import {
  SIGNUP,
  GET_USER_SUCCESS,
  GET_USER_PENDING
} from './users.actionType'

const initialState = {
  data:[],
  loading: false
}

const reducers = (state={...initialState}, action) => {
  switch (action.type) {
    case SIGNUP:
    return ({
      ...state,
      data: action.payload
    })
    case GET_USER_SUCCESS:
    return ({
      ...state,
      data: action.payload,
      loading: false
    })
    case GET_USER_PENDING:
    return ({
      ...state,
      loading: true
    })
    default:
    return state
  }
}

export default reducers