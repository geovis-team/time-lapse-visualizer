import axios from 'axios'

export const getMapData = (model, filters, successCallback) => {
  return dispatch => {
    dispatch({
      type: 'MAP_DATA_LOADING',
      payload: true
    })

    console.log('You are in model: ', model)
    console.log('With filters: ', filters)
    var qs = require('qs')
    var assert = require('assert')
    axios
      .get('http://127.0.0.1:8000/api/visualization/filter_data/', {
        params: {
          model: model,
          filters: filters
        },

        paramsSerializer: params => {
          return qs.stringify(params, { indices: false })
        }
      })
      .then(res => {
        console.log('from action : ', res.data)
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
