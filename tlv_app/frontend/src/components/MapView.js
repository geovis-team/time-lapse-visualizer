import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import React, { Component, useEffect } from 'react'
import styles from '../static/css/Visualisation.module.css'
import PropTypes from 'prop-types'
import MarkerClusterer from 'node-js-marker-clusterer'

const MarkerCluster = props => {
  const { map, google, markers } = props
  useEffect(() => {
    if (map && markers) {
      const mapMarkers = markers.map(marker => {
        const entry = new google.maps.Marker({
          position: {
            lat: marker.props.position.lat,
            lng: marker.props.position.lng
          },
          map: map,
          name: marker.props.position.type
        })
        return entry
      })

      const clusterer = new MarkerClusterer(map, mapMarkers, {
        imagePath:
          'https://raw.githubusercontent.com/googlemaps/js-marker-clusterer/gh-pages/images/m'
      })
      return () => {
        clusterer.clearMarkers()
      }
    }
  }, [map, google, markers])
  return null
}

MarkerCluster.propTypes = {
  map: PropTypes.object,
  google: PropTypes.object,
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      position: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired
      }).isRequired,
      name: PropTypes.string.isRequired
    })
  )
}

class MapView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: props.map.data,
      time: props.map.time
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      time: nextProps.map.time
    })
  }
  placeMarkers = () => {
    const data = this.state.data.locations
    const month = this.state.time
    const markers = data
      .filter(rows => rows.month == month)
      .map((mydata, index) => {
        return (
          <Marker
            key={index}
            id={index}
            position={{
              lat: mydata.lat,
              lng: mydata.lng
            }}
          />
        )
      })
    return markers
  }
  render () {
    return (
      <>
        <div>
          <Map
            google={this.props.google}
            zoom={4}
            style={mymap}
            initialCenter={{ lat: 25, lng: 80 }}
          >
            <MarkerCluster
              markers={this.placeMarkers()}
              click={this.onMarkerClick}
              mouseover={this.onMouseOver}
              mouseout={this.onMouseOut}
            />
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
  apiKey: 'AIzaSyDkTM6DPzDGTw_xoSBlQSbm3ruL9iGesqs'
})(MapView)
