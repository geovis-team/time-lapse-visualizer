import axios from 'axios'
import { refreshTokenUrl } from '../urls'

// This axiosInstance further acts as a utility axiosInstance
// for all the authorised requests to be sent. It sets the appropriate
// authorisation headers and the below interceptors handle
//  the access token and refresh token appropriately
const axiosInstance = axios.create({
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem('accessToken')
      ? 'JWT ' + localStorage.getItem('accessToken')
      : null,
    'Content-Type': 'application/json',
    accept: 'application/json'
  }
})
// These interceptors intercept the response of the intial request
// and take suitable actions
axiosInstance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    //this code checks if the error code is 401 i.e., unauthorised
    //and the request was sent to refresh the token which indicates that both the
    //tokens are expired and thus user is redirected to the login page.
    const originalRequest = error.config
    if (
      error.response.status === 401 &&
      originalRequest.url === refreshTokenUrl()
    ) {
      window.location.href = '/log-sign-in/'
      return Promise.reject(error)
    }

    //if the error code is still 401 and indicates access token is invalid
    if (
      error.response.data.code === 'token_not_valid' &&
      error.response.status === 401 &&
      error.response.statusText === 'Unauthorized'
    ) {
      const refreshToken = localStorage.getItem('refreshToken')
      //expiry of refresh token is calculated
      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]))

        const now = Math.ceil(Date.now() / 1000)
        console.log(tokenParts.exp)
        //if refresh token is not expired then a request to refresh
        //both the tokens is sent and on recieving the new tokens
        //previous request that needed to be authorized is sent
        if (tokenParts.exp > now) {
          return axiosInstance
            .post(refreshTokenUrl(), { refresh: refreshToken })
            .then(response => {
              localStorage.setItem('accessToken', response.data.access)
              localStorage.setItem('refreshToken', response.data.refresh)

              axiosInstance.defaults.headers['Authorization'] =
                'JWT ' + response.data.access
              originalRequest.headers['Authorization'] =
                'JWT ' + response.data.access

              return axiosInstance(originalRequest)
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          console.log('Refresh token is expired', tokenParts.exp, now)
          window.location.href = '/log-sign-in/'
        }
      } else {
        console.log('Refresh token not available.')
        window.location.href = '/log-sign-in/'
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
