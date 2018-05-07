import {
  GET_PASSWORD_SUCCESS,
  GET_PASSWORD_LOADING,
  GET_PASSWORD_ERROR,
  ADD_PASSWORD,
  DELETE_PASSWORD,
  EDIT_PASSWORD
} from './password.actionType'

const initialState = {
  data: [],
  loading: false,
  error: false
}

const reducers = (state={...initialState}, action) => {
  switch (action.type) {
    case GET_PASSWORD_LOADING:
    return ({
      ...state,
      loading: true
    })
    case GET_PASSWORD_SUCCESS:
    return ({
      ...state,
      data: action.payload,
      loading: false
    })
    case GET_PASSWORD_ERROR:
    return ({
      ...state,
      error: true,
      loading: false
    })
    case ADD_PASSWORD:
    return ({
      ...state
    })
    case EDIT_PASSWORD:
    return ({
      ...state
    })
    case DELETE_PASSWORD:
    return ({
      ...state
    })
    default:
    return state
  }
}

export default reducers