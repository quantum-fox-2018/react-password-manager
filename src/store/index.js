import { createStore, combineReducers, applyMiddleware } from 'redux'
import reducers from './password/reducers'
import thunk from 'redux-thunk'

const combReducers = combineReducers({
  data: reducers
})
const store = createStore(
  combReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
  
)

export default store
