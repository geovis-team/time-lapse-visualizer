import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/LoginSignupPage'
import Landing from './components/Landing'
import DefaultVis from './components/DefaultVis'
import ViewVis from './components/ViewVis'
import 'bootstrap/dist/css/bootstrap.min.css'

function App () {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route path='/log-sign-in' component={Login} />
          <Route path='/defaultvis' component={DefaultVis} />
          <Route path='/viewvis' component={ViewVis} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
