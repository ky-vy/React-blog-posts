import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import promise from 'redux-promise'
import thunk from 'redux-thunk'

import reducers from './reducers'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

const createStoreWithMiddleware = applyMiddleware(promise, thunk)(createStore)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
