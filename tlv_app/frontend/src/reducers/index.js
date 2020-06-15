import { combineReducers } from 'redux'
import GetMapFilters from './reducer-map-metadata'

const allReducers = combineReducers({
  getfilters: GetMapFilters
})

export default allReducers
