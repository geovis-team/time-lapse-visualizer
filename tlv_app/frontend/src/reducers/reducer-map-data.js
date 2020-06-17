const initialState = {
  loading: false,
  error: false,
  data: {}
}

const GetMapData = (state = initialState, action) => {
  switch (action.type) {
    case 'MAP_DATA_LOADING':
      return { ...state, ...action.payload }
    case 'MAP_DATA_LOADED':
      return { ...state, loading: action.payload }
    default:
      return state
  }
}

export default GetMapData
