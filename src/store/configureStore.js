import { createStore, combineReducers } from "redux"
import expensesReducer from '../reducers/expenses'
import filtersReducer from '../reducers//filters'

export default () => {
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()  // so that we can use redux tool in browser
  )
  return store
}
