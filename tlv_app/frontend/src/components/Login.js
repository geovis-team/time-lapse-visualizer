import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form } from 'semantic-ui-react'
import { authLogin } from '../actions/auth'
import { withRouter } from 'react-router'

class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  successCallBack = () => {
    this.props.history.push('/defaultvis')
  }

  handleSubmit = () => {
    const data = {
      username: this.state.username,
      password: this.state.password
    }

    this.props.AuthLogin(data, this.successCallBack)
  }

  render () {
    const { username, password } = this.state
    let disabled = true
    if (username && password) {
      disabled = false
    }
    return (
      <Form>
        <Form.Group>
          <Form.Field required={true}>
            <Form.Input
              fluid
              label='Username'
              placeholder='username'
              value={username}
              onChange={e => this.setState({ username: e.target.value })}
            />
          </Form.Field>
          <Form.Field required={true}>
            <Form.Input
              fluid
              label='Password'
              placeholder='password'
              value={password}
              type={'password'}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </Form.Field>
        </Form.Group>

        <Button
          variant='dark'
          type='submit'
          disabled={disabled}
          onClick={this.handleSubmit}
        >
          Submit
        </Button>
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
    AuthLogin: (data, successCallBack) => {
      return dispatch(authLogin(data, successCallBack))
    }
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginForm)
)
