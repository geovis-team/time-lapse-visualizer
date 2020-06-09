import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import React, { Component } from 'react';
import styles from '../static/css/Visualisation.module.css'


class MapView extends Component{
    constructor(props){
        super(props);
        this.state={
            data:props.map.data,
            time:props.map.time,
        }
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        this.setState({
            time:nextProps.map.time
        })
    }
    placeMarkers=()=>{

        const data=this.state.data.locations;
        const month = this.state.time
        console.log("placing for month", month);
        // console.log("data is ", data);
        return data.filter(rows => rows.month==month).map((mydata, index) => {
            return <Marker key={index} id={index} position={{
             lat: mydata.lat,
             lng: mydata.lng
           }}
            />
          })
    }
    render(){
        return(
            <>
            <div>
            <Map google={this.props.google} zoom={4} style={mymap} initialCenter={{ lat: 25, lng: 80}}>
                {this.placeMarkers()}
            </Map>
            </div>
            </>
        )
    }
}
const mymap = {
    width:"100% ",
    position:"absolute"
  };
  
export default GoogleApiWrapper({
    apiKey: 'AIzaSyDkTM6DPzDGTw_xoSBlQSbm3ruL9iGesqs',
  })(MapView);