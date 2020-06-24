import axiosInstance from './utility'
import axios from 'axios'

export const getMapData = (model, filters, isDefault, successCallback) => {
  var useAxios
  if (isDefault) {
    useAxios = axios.create()
  } else {
    useAxios = axiosInstance
  }
  return dispatch => {
    dispatch({
      type: 'MAP_DATA_LOADING',
      payload: true
    })

    var qs = require('qs')
    var assert = require('assert')
    useAxios
      .get('http://127.0.0.1:8000/api/visualization/filter_data/', {
        params: {
          model: model,
          filters: filters,
          isDefault: isDefault
        },

        paramsSerializer: params => {
          return qs.stringify(params, { indices: false })
        }
      })
      .then(res => {
        dispatch({
          type: 'MAP_DATA_LOADED',
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
          type: 'MAP_DATA_LOADED',
          payload: {
            loading: false,
            data: {},
            error: true
          }
        })
        console.log(err)
      })
  }
}
