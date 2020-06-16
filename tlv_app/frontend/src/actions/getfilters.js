import axios from 'axios'

export const getFilters = (model, successCallback) => {
  return dispatch => {
    dispatch({
      type: 'SET_MAP_FILTERS_LOADING',
      payload: true
    })
  }
  const arr = []
  console.log('You are in model: ', model)
  axios
    .get('http://127.0.0.1:8000/api/visualization/get_filters/', {
      params: {
        model: model
      }
    })
    .then(res => {
      var flag = 0
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
      dispatch({
        type: 'INITIALISE_MAP_FILTERS',
        payload: {
          loading: false,
          data: arr,
          error: false
        }
      })
    })
    .catch(err => {
      dispatch({
        type: 'INITIALISE_MAP_FILTERS',
        payload: {
          loading: false,
          data: [],
          error: true
        }
      })
      console.log(err)
    })
}
