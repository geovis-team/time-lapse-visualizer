import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form } from 'semantic-ui-react'
import { authSignup } from '../actions/auth'
import { withRouter } from 'react-router'

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
      disableDOS: false
    }
  }
  successCallBack = () => {
    this.props.history.push('/defaultvis')
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
    this.props.AuthSignUp(data, this.successCallBack)
  }

  render () {
    const {
      email,
      username,
      password,
      confirmPass,
      firstName,
      lastName,
      disableDOS
    } = this.state
    let disabled = true
    if (username && password && password === confirmPass) {
      disabled = false
    }
    return (
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
    )
  }
}

const mapStateToProps = state => {
  return {
    authReducer: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    AuthSignUp: (data, successCallBack) => {
      return dispatch(authSignup(data, successCallBack))
    }
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SignupForm)
)
