import { GET_PASSWORD, GET_PENDING, GET_ERROR, CREATE_PASSWORD, UPDATE_PASSWORD, DELETE_PASSWORD } from './action.Types'

const initialState = {
  data : [],
  loading: false,
  error: false
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PASSWORD:
      return {
        ...state,
        loading: false,
        error: false
      }
    case GET_PASSWORD:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false
      }
      DELETE_PASSWORD:
        return {
          ...state,
          loading: false,
          error: false
        }
      default:
      UPDATE_PASSWORD:
        return {
          ...state,
          loading: false,
          error: false
        }
        return state
  }
}

export default reducers