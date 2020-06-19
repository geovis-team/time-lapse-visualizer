import axios from 'axios'
import { toast } from 'react-semantic-toasts'

import { getTokenUrl, userCreateUrl, revokeTokenUrl, getUserUrl } from '../urls'
import axiosInstance from './utility'

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

export const authLogin = (data, successCallBack, errCallBack) => {
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
        axiosInstance.defaults.headers['Authorization'] =
          'JWT ' + res.data.access
        localStorage.setItem('refreshToken', refreshToken)
        localStorage.setItem('accessToken', accessToken)
        dispatch(authSuccess(accessToken, refreshToken))
        successCallBack()
      })
      .catch(err => {
        dispatch(authFail(err))
        toast({
          type: 'error',
          title: 'Error',
          description: 'Please enter the currect username and password.',
          icon: 'frown',
          time: 4000
        })
        errCallBack()
      })
  }
}

export const authSignup = (data, successCallBack, errCallBack) => {
  axios
    .post(userCreateUrl(), data)
    .then(res => {
      successCallBack()
    })
    .catch(err => {
      errCallBack(err.response.data)
    })
}

export const logout = () => {
  return dispatch => {
    axios.post(revokeTokenUrl(), {
      refresh_token: localStorage.getItem('refreshToken')
    })
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    dispatch({ type: 'AUTH_LOGOUT' })
    toast({
      type: 'success',
      title: 'success',
      description: 'Logged Out',
      icon: 'check',
      time: 4000
    })
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('refreshToken')
    if (token === undefined) {
      dispatch(logout())
    }
  }
}

export const whoAmI = () => {
  return dispatch => {
    axiosInstance.get(getUserUrl()).then(res => {
      console.log(res.data)
      dispatch(res.data)
    })
  }
}
