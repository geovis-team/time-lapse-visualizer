import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import allReducers from './reducers'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import logger from 'redux-logger'
import App from './App'
import * as serviceWorker from './serviceWorker'

// const logger = createLogger()
const store = createStore(allReducers, applyMiddleware(thunk, promise, logger))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
