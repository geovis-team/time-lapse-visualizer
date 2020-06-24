import axiosInstance from './utility'

export const getConfig = (id, successCallback) => {
  return dispatch => {
    dispatch({
      type: 'SET_CONFIG_LOADING',
      payload: true
    })

    axiosInstance
      .get('http://127.0.0.1:8000/api/config/' + id)
      .then(res => {
        dispatch({
          type: 'INITIALISE_CONFIG',
          payload: {
            loading: false,
            data: res.data,
            error: false
          }
        })
        successCallback(res.data)
      })
      .catch(err => {
        dispatch({
          type: 'INITIALISE_CONFIG',
          payload: {
            loading: false,
            data: {},
            error: true
          }
        })
      })
  }
}
