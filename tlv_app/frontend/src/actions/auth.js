import axios from 'axios'
import { getTokenUrl, userCreateUrl } from '../urls'

export const authStart = () => {
  return {
    type: 'AUTH_START'
  }
}

export const authSuccess = (accessToken, refreshToken) => {
  return {
    type: 'AUTH_SUCCESS',
    accessToken: accessToken,
    refreshToken: refreshToken
  }
}

export const authFail = error => {
  return {
    type: 'AUTH_FAIL',
    error: error
  }
}

export const authLogin = (data, successCallBack) => {
  return dispatch => {
    dispatch(authStart())
    axios
      .post(getTokenUrl(), {
        username: data['username'],
        password: data['password']
      })
      .then(res => {
        const accessToken = res.data.access
        const refreshToken = res.data.refresh
        localStorage.setItem('refreshToken', refreshToken)
        localStorage.setItem('accessToken', accessToken)
        dispatch(authSuccess(accessToken, refreshToken))
        successCallBack()
      })
      .catch(err => {
        dispatch(authFail(err))
      })
  }
}

export const authSignup = (data, successCallBack) => {
  return dispatch => {
    dispatch(authStart())
    axios
      .post(userCreateUrl(), data)
      .then(res => {
        const accessToken = res.data.access
        const refreshToken = res.data.refresh
        localStorage.setItem('refreshToken', refreshToken)
        localStorage.setItem('accessToken', accessToken)
        dispatch(authSuccess(accessToken, refreshToken))
        successCallBack()
      })
      .catch(err => {
        dispatch(authFail(err))
      })
  }
}
