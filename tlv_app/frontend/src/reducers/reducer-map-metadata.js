const initialState = {
  loading: false,
  error: false,
  data: {}
}

const GetMapFilters = (state = initialState, action) => {
  switch (action.type) {
    case 'INITIALISE_MAP_FILTERS':
      return { ...state, ...action.payload }
    case 'SET_MAP_FILTERS_LOADING':
      return { ...state, loading: action.payload }
    default:
      return state
  }
}

export default GetMapFilters
