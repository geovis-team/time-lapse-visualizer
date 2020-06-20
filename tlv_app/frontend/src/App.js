import React, { Component } from 'react'
import './App.css'
import 'semantic-ui-css/semantic.min.css'
import 'react-semantic-toasts/styles/react-semantic-alert.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { SemanticToastContainer } from 'react-semantic-toasts'
import Login from './components/LoginSignupPage'
import Landing from './components/Landing'
import DefaultVis from './components/DefaultVis'
import ViewVis from './components/ViewVis'
import AddVis from './components/AddVis'
import { authCheckState } from './actions/auth'
import 'bootstrap/dist/css/bootstrap.min.css'
import { connect } from 'react-redux'

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup()
  }
  render () {
    return (
      <div>
        <SemanticToastContainer position='top-right' />
        <Router>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route path='/log-sign-in' component={Login} />
            <Route path='/defaultvis' component={DefaultVis} />
            <Route path='/viewvis' component={ViewVis} />
            <Route path='/addvis' component={AddVis} />
          </Switch>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAutheticated: localStorage.getItem('refreshToken') !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
