import {
  LOAD_PASSWORD_SUCCESS,
  LOAD_PASSWORD_PENDING,
  LOAD_PASSWORD_ERROR,
  ADD_PASSWORD,
  EDIT_PASSWORD,
  DELETE_PASSWORD,
  SEARCH_PASSWORD
} from './password.action.type'

const initialState = {
  data: [],
  loading: false,
  error: {
    status: false,
    message: ''
  },
  searchValue: '',
  searchData: []
}

const reducers = ((state = {...initialState}, action) => {
  switch (action.type) {
    case LOAD_PASSWORD_PENDING:
      return ({
        ...state,
        loading: true
      })
    case LOAD_PASSWORD_SUCCESS:
      return ({
        ...state,
        data: action.payload,
        loading: false
      })
    case LOAD_PASSWORD_ERROR:
      const errorObj = {
        status: true,
        message: action.payload.message
      }
      return ({
       ...state,
       error: {
         ...errorObj
       } 
      })
    case ADD_PASSWORD:
      return ({
        ...state,
        data: [...state.data]
      })
    case EDIT_PASSWORD:
      return ({
        ...state,
        data: [...state.data]
      })
    case DELETE_PASSWORD:
      return ({
        ...state,
        data: [...state.data]
      })
    case SEARCH_PASSWORD:
      const searchData = state.data.filter((pwd) => pwd.url.toLowerCase().includes(action.payload.toLowerCase()))
      return ({
        ...state,
        searchValue: action.payload,
        searchData
      })
    default:
      return state
  }
})

export default reducers