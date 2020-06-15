export default function (state = null, action) {
  switch (action.type) {
    case 'GET_MAP_FILTERS':
      return action.payload
      break
  }
  return state
}
