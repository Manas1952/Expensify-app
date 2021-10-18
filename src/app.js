import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'  //We need to pass store to every component through props, which would be tedious, so it is going to pass 'store' to all of our components
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore'
import { addExpense } from './actions/expenses'
import { setTextFilter } from './actions/filters'
import getVisibleEpense from './selectors/expenses'
import 'normalize.css/normalize.css'
import './styles/style.scss'
import 'react-dates/lib/css/_datepicker.css'

const store = configureStore()

const jsx = (
  <Provider store={store} >
    <AppRouter />
  </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'))

