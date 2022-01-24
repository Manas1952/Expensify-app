import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunk from 'redux-thunk'
import expensesReducer from '../reducers/expenses'
import filtersReducer from '../reducers//filters'
import authReducer from '../reducers/auth'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose  // previosly we were writing 'window.__REDUX_DEVTOOLS_EXTENSION__ && __REDUX_DEVTOOLS_EXTENSION__()' which was giving us feature on browser to view redux state changes, but now we replaced that with applyMiddleware, so composeEnhancer will maintain this; also if devtool exists, this will use __REDUX_DEVTOOLS_EXTENSION_COMPOSE__, otherwise use simple 'compose'

export default () => {
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer,
      auth: authReducer
    }),
    composeEnhancer(applyMiddleware(thunk)) // so that we can dispatch functions as well, not only objects
  )
  return store
}
