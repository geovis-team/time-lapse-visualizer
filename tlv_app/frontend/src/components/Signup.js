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
      success: false
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
    if (typeof data['username'][0] !== 'undefined') {
      msg = data['username'][0]
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

  handleSubmit = () => {
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
                value={password}
                type={'password'}
                onChange={e => this.setState({ password: e.target.value })}
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
