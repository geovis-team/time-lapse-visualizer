import axios from 'axios'
import axiosInstance from './utility'

export const getFilters = (model, isDefault, successCallback) => {
  var useAxios
  if (isDefault) {
    useAxios = axios.create()
  } else {
    useAxios = axiosInstance
  }
  return dispatch => {
    dispatch({
      type: 'SET_MAP_FILTERS_LOADING',
      payload: true
    })

    const arr = []
    useAxios
      .get('http://127.0.0.1:8000/api/visualization/get_filters/', {
        params: {
          model: model,
          isDefault: isDefault
        }
      })
      .then(res => {
        var flag = 0
        var sendObj = {}
        for (const el in res.data.secondaryFilters) {
          const obj = {
            name: el,
            sub: res.data.secondaryFilters[el]
          }
          // Omit if no default visualisation
          if (flag === 0) {
            flag = 1
            obj['status'] = true
          } else obj['status'] = false
          arr.push(obj)
        }
        sendObj['arr'] = arr
        sendObj['earliestTime'] = res.data.earliestTime
        sendObj['latestTime'] = res.data.latestTime

        dispatch({
          type: 'INITIALISE_MAP_FILTERS',
          payload: {
            loading: false,
            data: sendObj,
            error: false
          }
        })
        successCallback(sendObj)
      })
      .catch(err => {
        dispatch({
          type: 'INITIALISE_MAP_FILTERS',
          payload: {
            loading: false,
            data: {},
            error: true
          }
        })
      })
  }
}
