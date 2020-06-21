import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react'
import React, { Component, useEffect } from 'react'
import styles from '../static/css/Visualisation.module.css'
import PropTypes from 'prop-types'
import MarkerClusterer from 'node-js-marker-clusterer'

const MarkerCluster = props => {
  const { map, google, markers } = props
  useEffect(() => {
    if (map && markers) {
      var infoWin = new google.maps.InfoWindow()

      const mapMarkers = markers.map(marker => {
        const entry = new google.maps.Marker({
          position: {
            lat: marker.props.markerParams.lat,
            lng: marker.props.markerParams.lng
          },
          map: map,
          name: marker.props.markerParams.type
        })
        google.maps.event.addListener(entry, 'click', function (evt) {
          var content = ''
          // TODO : Can change content formatting and styling if required
          for (var primary in marker.props.markerParams.obj) {
            content += '<h5>' + primary + '</h5>'
            content +=
              '<p>' +
              JSON.stringify(marker.props.markerParams.obj[primary]) +
              '</p>'
            content += '<br /><br />'
          }
          infoWin.setContent(content)
          infoWin.open(map, entry)
        })
        return entry
      })

      const clusterer = new MarkerClusterer(map, mapMarkers, {
        zoomOnClick: true,
        imagePath:
          'https://raw.githubusercontent.com/googlemaps/js-marker-clusterer/gh-pages/images/m'
      })
      google.maps.event.addListener(clusterer, 'clusterclick', function (
        cluster
      ) {
        infoWin.close()
        if (map.getZoom() < map.maxZoom) {
          map.setCenter(cluster.center_)

          map.setZoom(map.getZoom() + 2)
        } else {
          var content = '(' + cluster.getMarkers().length + ')'
          content += cluster.getMarkers().map(cl => cl.title)
          var info = new google.maps.MVCObject()
          info.set('position', cluster.center_)
          infoWin.setContent(content)
          infoWin.open(map, info)
        }
      })
      google.maps.event.addListener(map, 'zoom_changed', function () {
        infoWin.close()
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
      time: props.map.time,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
    this.onMapClick = this.onMapClick.bind(this)
  }

  static getDerivedStateFromProps (nextProps) {
    return {
      time: nextProps.map.time,
      data: nextProps.map.data
    }
  }
  placeMarkers = () => {
    const data = this.state.data.data
    const month = this.state.time
    const markers = data
      .filter(rows => rows.time.slice(0, 7) === month.slice(0, 7))
      .map((mydata, index) => {
        return (
          <Marker
            key={index}
            id={index}
            markerParams={{
              lat: parseFloat(mydata.latitude),
              lng: parseFloat(mydata.longitude),
              obj: mydata.filter
            }}
          />
        )
      })
    return markers
  }

  onMapClick = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  render () {
    return (
      <>
        <div>
          <Map
            google={this.props.google}
            zoom={3}
            maxZoom={18}
            minZoom={1}
            style={mymap}
            initialCenter={{ lat: 25, lng: 80 }}
            onClick={this.onMapClick}
          >
            <MarkerCluster
              markers={this.placeMarkers()}
              mouseover={this.onMouseOver}
              mouseout={this.onMouseOut}
            />
            {/* {this.placeMarkers()} */}
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
