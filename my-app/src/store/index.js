import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import passwordReducers from './password/password.reducers'
import userReducers from './users/user.reducers'
import logger from 'redux-logger'


const reducers = combineReducers({
  passManager : passwordReducers,
  user: userReducers
})

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk, logger)
)

export default store