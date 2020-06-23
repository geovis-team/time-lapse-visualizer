import { combineReducers } from 'redux'
import GetMapFilters from './reducer-map-metadata'
import GetMapData from './reducer-map-data'
import GetConfig from './reducer-map-config'
import authReducer from './auth'

const allReducers = combineReducers({
  getFilters: GetMapFilters,
  getMapData: GetMapData,
  getConfig: GetConfig,
  auth: authReducer
})

export default allReducers
