import {
  REGISTER,
  SIGN_IN,
  SIGN_OUT
} from './user.action.type'

const initial_state = {
  email: '',
  userId: '',
  loginStatus: false
}

const reducers = (state = initial_state, action) => {
  switch (action.type) {
    case REGISTER:
      return {
        email: action.email,
        userId: action.userId,
        loginStatus: true
      }
    case SIGN_IN:
      return {
        email: action.email,
        userId: action.userId,
        loginStatus: true
      }
    case SIGN_OUT:
      return {
        email: '',
        userId: '',
        loginStatus: false
      }
    default:
      return state
  }
}

export default reducers