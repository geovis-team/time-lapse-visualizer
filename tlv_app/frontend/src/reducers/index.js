import { combineReducers } from 'redux'
import GetMapFilters from './reducer-map-metadata'
import GetMapData from './reducer-map-data'

const allReducers = combineReducers({
  getFilters: GetMapFilters,
  getMapData: GetMapData
})

export default allReducers
