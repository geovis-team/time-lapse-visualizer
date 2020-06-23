const initialState = {
  loading: false,
  error: false,
  data: {}
}

const GetConfig = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CONFIG_LOADING':
      return { ...state, ...action.payload }
    case 'SET_CONFIG_LOADED':
      return { ...state, loading: action.payload }
    default:
      return state
  }
}

export default GetConfig
