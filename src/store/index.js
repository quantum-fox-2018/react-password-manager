import { createStore, applyMiddleware, combineReducers } from "redux"
import logger from 'redux-logger'
import usersReducers from './users/reducers'
import thunk from 'redux-thunk'
import passmanagerReducer from "./passmanager/reducers";

const reducers = combineReducers({
  users: usersReducers,
  passmanager: passmanagerReducer
})

let store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk, logger))

export default store