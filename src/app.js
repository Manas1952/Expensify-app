import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'  //We need to pass store to every component through props, which would be tedious, so it is going to pass 'store' to all of our components
import AppRouter, { history } from './routers/AppRouter'
import configureStore from './store/configureStore'
import { startSetExpenses } from './actions/expenses'
import { login, logout } from './actions/auth'
import getVisibleEpense from './selectors/expenses'
import 'normalize.css/normalize.css'
import './styles/styles.scss'
import 'react-dates/lib/css/_datepicker.css'
import { firebase } from './firebase/firebase'
import LoadingPage from './components/LoadingPage'

const store = configureStore()

const jsx = (
  <Provider store={store} >
    <AppRouter />
  </Provider>
)
let hasRendered = false
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'))
    hasRendered = true
  }
}

ReactDOM.render(<LoadingPage />, document.getElementById('app'))

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid))
    store.dispatch(startSetExpenses()).then(() => {
      renderApp()
      if (history.location.pathname === '/') {
        history.push('/dashboard')
      }
    })
  }
  else {
    store.dispatch(logout())
    renderApp()
    history.push('/')
  }
})