import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Main from './Main/Main'
import NewPost from './NewPost'
import ShowPost from './ShowPost'

import '../styles/App.css'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/posts/new" component={NewPost} />
            <Route path="/posts/:id" component={ShowPost} />
            <Route path="/" component={Main} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
