import { 
  createStore, 
  applyMiddleware, 
  combineReducers 
} from 'redux'
import thunk from 'redux-thunk'
import userReducer from './user/user.reducer'
import passwordReducer from './password/password.reducer'

const reducers = combineReducers({
  user: userReducer,
  passwords: passwordReducer
})

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ 
  && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
)

export default store