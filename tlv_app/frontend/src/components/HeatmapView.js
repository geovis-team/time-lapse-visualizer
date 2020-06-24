import { Map, HeatMap, GoogleApiWrapper } from 'google-maps-react'
import React, { Component} from 'react'

/** 
* To use this feature:
* -> Replace MapView with HeatmapView on Visualisation.js. 
*
* Issues:
* -> Heatmap component does not re-render on state change caused by change in props on moving the slider. 
*    Currently, only the Heatmap for the default slider position renders. Re-rendering only taking place
*    on changing filters.
*
* Possible reason:
* -> It is possible that unmounting of the component is not taking place as the underlying implementation 
*    is doing a shallow comparison on the previous and current props and only registering a change when a
*    new data object is sent in props (Filter changes trigger an API call which creates a new Data object)
*
* Feature incorporated:
* -> Intensity of a Heat spot is calculated by summing up the numerical quanitites associated with the 
*    filters and subfilters at that spot
* -> Alternatively, Google Maps API's Circle/Polygon features was also tested as an alternative to a Heatmap
*    for marking "intensity" (using varying radii of circle/ varying shapes of polygon)
*
* Possible integration with webapp:
* -> Use radio-buttons to let user select between the Default (Marker) and Heatmap visualization and do 
*    state-based rendering.
*
* Alternate libraries that were tested for this feature:
* -> react-google-maps: Very less documentation for Heatmaps to be usable
* -> google-map-react (different from google-maps-react): Less documentation and re-rendering issues
*/

const gradient = [
  "rgba(0, 255, 255, 0)",
  "rgba(0, 255, 255, 1)",
  "rgba(0, 191, 255, 1)",
  "rgba(0, 127, 255, 1)",
  "rgba(0, 63, 255, 1)",
  "rgba(0, 0, 255, 1)",
  "rgba(0, 0, 223, 1)",
  "rgba(0, 0, 191, 1)",
  "rgba(0, 0, 159, 1)",
  "rgba(0, 0, 127, 1)",
  "rgba(63, 0, 91, 1)",
  "rgba(127, 0, 63, 1)",
  "rgba(191, 0, 31, 1)",
  "rgba(255, 0, 0, 1)"
];

class HeatmapView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: props.map.data,
      time: props.map.time,
    }
  }

  static getDerivedStateFromProps (nextProps) {
    return {
      time: nextProps.map.time,
      data: nextProps.map.data
    }
  }

  getSpots = () => {
    const data = this.state.data.data
    const month = this.state.time
    console.log(JSON.stringify(data))
    console.log(month)
    const temp = data.filter(
      rows => rows.time.slice(0,7) === month
      ).map(obj => {
        console.log(obj)
        var cnt = 0
        for (var primary in obj['filter']){
          for (var secondary in obj['filter'][primary]){
            cnt += parseInt(obj['filter'][primary][secondary])
          }
        }
        return({lat: parseFloat(obj.latitude), lng: parseFloat(obj.longitude), weight: cnt*10})
      })
    console.log(temp.length, temp)
    return temp
  }

  activateHeatMap = () => {
    return (
      <HeatMap
        gradient={gradient}
        positions={this.getSpots()}
        opacity={1}
        radius={30}
      />
    )
  }

  render () {
    return (
      <>
        <div >
          <Map
            google={this.props.google}
            zoom={3}
            mapType={'satellite'}
            maxZoom={18}
            minZoom={1}
            style={mymap}
            initialCenter={{ lat: 25, lng: 80 }}
          >
            {this.activateHeatMap()}
          </Map>
        </div>
      </>
    )
  } 
}

const mymap = {
  width: '100% ',
  position: 'absolute'
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDkTM6DPzDGTw_xoSBlQSbm3ruL9iGesqs',
  libraries: ["visualization"]
})(HeatmapView)
