import { combineReducers } from 'redux'
import GetMapFilters from './reducer-map-metadata'
import GetMapData from './reducer-map-data'
import authReducer from './auth'

const allReducers = combineReducers({
  getFilters: GetMapFilters,
  getMapData: GetMapData,
  auth: authReducer
})

export default allReducers
