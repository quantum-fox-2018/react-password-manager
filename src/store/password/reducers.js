import { GET_PASSWORD, GET_PENDING, GET_ERROR, CREATE_PASSWORD, UPDATE_PASSWORD, DELETE_PASSWORD } from './action.Types'

const initialState = {
  data: [],
  loading: false,
  error: {
    status: false,
    msg: ''
}
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
    case DELETE_PASSWORD:
      return {
        ...state,
        loading: false,
        error: false
      }
    case UPDATE_PASSWORD:
      return {
        ...state,
        loading: false,
        error: false
      }
    case GET_PENDING:
      return {
        ...state,
        loading: true,
        error: false
      }
     case GET_ERROR:
     case GET_ERROR:
     let errorObj = {
         status: true,
         msg: 'something is not right...'
     }
     return {
         ...state,
         error: {
             ...errorObj
         },
         loading: false,
     }
    default:
      return state
  }
}

export default reducers