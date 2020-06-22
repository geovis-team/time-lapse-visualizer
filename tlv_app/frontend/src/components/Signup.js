import React, { Component } from 'react'
import { Button, Form, Message } from 'semantic-ui-react'
import { authSignup } from '../actions/auth'

class SignupForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPass: '',
      email: '',
      disableDOS: false,
      success: false,
      passwordColor: 'white'
    }
  }

  successCallBack = () => {
    this.setState({
      username: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPass: '',
      email: '',
      disableDOS: false,
      success: true,
      message: 'You have been signed up successfully, please log in'
    })
  }

  errCallBack = data => {
    var msg
    if ('username' in data)
      if (typeof data['username'][0] !== 'undefined') {
        msg = data['username'][0]
      }
    if ('email' in data)
      if (typeof data['email'][0] !== 'undefined') {
        msg = data['email'][0]
      }

    this.setState({
      disableDOS: false,
      username: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPass: '',
      email: '',
      message: msg,
      success: false
    })
  }

  emailValidation = () => {
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(this.state.email)
  }

  passwordStrength = pwd => {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
    const mediumRegex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/
    if (strongRegex.test(this.state.password)) {
      return '#3cba54'
    } else if (mediumRegex.test(this.state.password)) {
      return '#f4c20d'
    } else {
      return '#db3236'
    }
  }

  handleSubmit = () => {
    if (this.emailValidation()) {
      const data = {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        first_name: this.state.firstName,
        last_name: this.state.lastName
      }
      this.setState({
        disableDOS: true
      })
      authSignup(data, this.successCallBack, this.errCallBack)
    }
  }

  render () {
    const {
      email,
      username,
      password,
      confirmPass,
      firstName,
      lastName,
      disableDOS,
      success
    } = this.state
    let disabled = true
    if (username && password && password === confirmPass) {
      disabled = false
    }
    return (
      <div>
        {typeof this.state.message !== 'undefined' ? (
          <div>
            <Message positive={success} negative={!success}>
              {this.state.message}
            </Message>
          </div>
        ) : (
          <div></div>
        )}
        <Form>
          <Form.Group>
            <Form.Field>
              <label>Email</label>
              <Form.Input
                type='email'
                value={email}
                onChange={e => this.setState({ email: e.target.value })}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field required={true}>
              <label>Username</label>
              <Form.Input
                value={username}
                onChange={e => this.setState({ username: e.target.value })}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field>
              <label>First Name</label>
              <Form.Input
                value={firstName}
                onChange={e => this.setState({ firstName: e.target.value })}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field>
              <label>Last Name</label>
              <Form.Input
                value={lastName}
                onChange={e => this.setState({ lastName: e.target.value })}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field required={true}>
              <label>Password</label>
              <Form.Input
                style={{
                  backgroundColor: this.state.passwordColor,
                  padding: '2px',
                  borderRadius: '2px'
                }}
                value={password}
                type={'password'}
                onChange={e =>
                  this.setState({
                    password: e.target.value,
                    passwordColor: this.passwordStrength()
                  })
                }
              />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field required={true}>
              <label>Confirm Password</label>
              <Form.Input
                value={confirmPass}
                type={'password'}
                onChange={e =>
                  this.setState({
                    confirmPass: e.target.value
                  })
                }
              />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Button
              color='black'
              type='submit'
              disabled={disabled | disableDOS}
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          </Form.Group>
        </Form>
      </div>
    )
  }
}

export default SignupForm
