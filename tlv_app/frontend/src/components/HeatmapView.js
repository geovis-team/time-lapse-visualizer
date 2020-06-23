import { Map, HeatMap, GoogleApiWrapper } from 'google-maps-react'
import React, { Component} from 'react'

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

// const positions = [
//   { lat: 28.613900, lng: 77.209000, weight: 1 },
//   // { lat: 25.782745, lng: 80.444586, weight: 100 },
//   // { lat: 25.782842, lng: -80.443688 },
//   // { lat: 25.782919, lng: -80.442815 },
//   // { lat: 25.782992, lng: -80.442112 },
//   // { lat: 25.7831, lng: -80.441461 },
//   // { lat: 25.783206, lng: -80.440829 },
//   // { lat: 25.783273, lng: -80.440324 },
//   // { lat: 25.783316, lng: -80.440023 },
//   // { lat: 25.783357, lng: -80.439794 },
//   // { lat: 25.783371, lng: -80.439687 },
//   // { lat: 25.783368, lng: -80.439666 },
//   // { lat: 25.783383, lng: -80.439594 },
//   // { lat: 25.783508, lng: -80.439525 },
//   // { lat: 25.783842, lng: -80.439591 },
//   // { lat: 25.784147, lng: -80.439668 }
// ];

class HeatmapView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: props.map.data,
      time: props.map.time,
      // positions: []
    }
    // this.onMapClick = this.onMapClick.bind(this)
  }
  static getDerivedStateFromProps (nextProps) {
    return {
      time: nextProps.map.time,
      data: nextProps.map.data
    }
  }

  getSpots = () => {
    console.log("Helooooo")
    const data = this.state.data.data
    const month = this.state.time
    // const positions = []
    const temp = []
    console.log(JSON.stringify(data))
    console.log(month)
    data.filter(rows => rows.time.slice(0,7) === month)
      .map(mydata => {
        temp.push({lat: parseFloat(mydata.latitude), lng: parseFloat(mydata.longitude), weight: 400})
      })
    console.log(temp.length, temp)
    // this.setState({
    //   positions: temp
    // })
    // return this.state.positions
    return temp;
  }

  // activateHeatMap = () => {
  //   return (
  //     <Map
  //     google={this.props.google}
  //     zoom={3}
  //     mapType={'satellite'}
  //     maxZoom={18}
  //     minZoom={1}
  //     style={mymap}
  //     initialCenter={{ lat: 25, lng: 80 }}
  //     // onClick={this.onMapClick}
  //   >
  //     <HeatMap
  //       gradient={gradient}
  //       positions={this.getSpots()}
  //       opacity={1}
  //       radius={30}
  //     />
  //     </Map>
  //   )
  // }

  render () {
    console.log("Rendering", this.getSpots())
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
          // onClick={this.onMapClick}
        >
          <HeatMap
            gradient={gradient}
            positions={this.getSpots()}
            opacity={1}
            radius={30}
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
  apiKey: 'AIzaSyDkTM6DPzDGTw_xoSBlQSbm3ruL9iGesqs',
  libraries: ["visualization"]
})(HeatmapView)
