import axios from 'axios'
import { refreshTokenUrl } from '../urls'

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
axiosInstance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    const originalRequest = error.config
    if (
      error.response.status === 401 &&
      originalRequest.url === refreshTokenUrl()
    ) {
      window.location.href = '/log-sign-in/'
      return Promise.reject(error)
    }

    if (
      error.response.data.code === 'token_not_valid' &&
      error.response.status === 401 &&
      error.response.statusText === 'Unauthorized'
    ) {
      const refreshToken = localStorage.getItem('refreshToken')

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]))

        const now = Math.ceil(Date.now() / 1000)
        console.log(tokenParts.exp)

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
