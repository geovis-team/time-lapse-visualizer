import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Login from './components/LoginSignupPage';
import Landing from './components/Landing';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <div>
    <Router>
      <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/log-sign-in" component={Login} />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
