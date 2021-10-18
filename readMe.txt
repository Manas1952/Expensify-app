                babel-core :
Compiler

                babel-preset-env :
It is a smart preset that allows you to use the latest JavaScript without needing to micromanage which syntax transforms (and optionally, browser polyfills) are needed by your target environment(s)

                babel-preset-react :
In case you want the feature to be supported on recent versions of browsers, babel will convert the code only if there is no support of features on those browsers. With Preset react, Babel will transpile the code when to react.

                webpack-dev-server :
Webpack dev server is a web server based on express . So that you don't have to spin up other servers like node to see your project locally, webpack dev server provides you a port number where you can see or test your project in the browser locally.
                
                webpack :
Webpack is a static module bundler for JavaScript applications. This enables you to take a fully dynamic application and package it into static files, which you can then upload and deploy to your server. We can also extend what webpack can do with Plugins and Loaders.

import configureStore from './store/configureStore'
const store = configureStore()

import expensesReducer from '../reducers/expenses'
import filtersReducer from '../reducers//filters'
const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer
    })
  )

