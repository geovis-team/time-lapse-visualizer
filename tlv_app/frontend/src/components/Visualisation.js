import React, { Component } from 'react'
import {
  Button,
  Container,
  Col,
  Row,
  Card,
  Form,
  Spinner
} from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getMapData } from '../actions/getMapData'

import styles from '../static/css/DefaultVisPage.module.css'
import mapviewstyles from '../static/css/Visualisation.module.css'
import MapView from './MapView'

class Visualisation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: props.vis.title,
      model: props.vis.name,
      filters: props.vis.filters,
      subfilters: {},
      data: [],
      toSend: [],
      mindDate: '',
      times: [],
      maxDate: '',
      minval: 1,
      maxval: 0,
      value: '',
      curr: 1,
      loaded: false,
      checkcount: 1
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
    this.preProcess = this.preProcess.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  formatDate (date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      year = d.getFullYear()

    if (month.length < 2) month = '0' + month

    return [year, month].join('-')
  }

  preProcess (preSuccessCallBack) {
    var temp = {}
    this.state.filters.map(fil => {
      fil.sub.map((s, index) => {
        temp[s] = true
      })
    })

    preSuccessCallBack(temp)
  }

  preSuccessCallBack = temp => {
    this.setState({
      subfilters: temp
    })
  }

  componentDidMount () {
    this.props.getMapData(
      this.state.model,
      this.state.filters[0].name,
      this.getDataSuccessCallBack
    )
  }

  getDataSuccessCallBack = data => {
    var earliestTime = {
      dd: parseInt(data.earliestTime.slice(8, 10)),
      mm: parseInt(data.earliestTime.slice(5, 7)),
      yy: parseInt(data.earliestTime.slice(0, 4))
    }
    var latestTime = {
      dd: parseInt(data.latestTime.slice(8, 10)),
      mm: parseInt(data.latestTime.slice(5, 7)),
      yy: parseInt(data.latestTime.slice(0, 4))
    }
    var months
    var sliderSteps = []
    var startMonth = ''
    if (earliestTime.yy === latestTime.yy) {
      months = 12
      startMonth = new Date(data.earliestTime.slice(0, 4) + '-01' + '-01')
    } else {
      months =
        12 -
        earliestTime.mm +
        1 +
        latestTime.mm +
        (latestTime.yy - 1 - earliestTime.yy - 1 + 1)
      startMonth = new Date(data.earliestTime)
    }
    for (var i = 0; i < months; i++) {
      sliderSteps.push(this.formatDate(startMonth))
      startMonth.setMonth(startMonth.getMonth() + 1)
    }
    this.setState({
      data: data,
      toSend: data,
      minDate: data.earliestTime,
      maxDate: data.latestTime,
      maxval: months,
      times: sliderSteps,
      value: sliderSteps[0],
      loaded: true
    })
    this.preProcess(this.preSuccessCallBack)
  }

  handleChange (event) {
    var x = this.state.times[event.target.value - 1]
    this.setState({ value: x })
    this.setState({ curr: event.target.value })
  }

  handleClick () {
    var temp = this.state.filters
    for (var primary in temp) {
      temp[primary].status = false
    }
    temp[0].status = true
  }

  handleCheck (num, event, button) {
    const temp = this.state.filters
    const send = []
    var c
    if (!button) {
      if (event.target.checked) {
        c = this.state.checkcount + 1
        temp[num].status = true
      } else {
        c = this.state.checkcount - 1
        // Ensuring first filter is always checked
        if (c === 0) temp[0].status = true
        temp[num].status = false
      }
      temp.map(fil => {
        if (fil.status) send.push(fil.name)
      })
    } else {
      for (var primary in temp) {
        temp[primary].status = false
      }
      temp[0].status = true
    }
    this.setState({ loaded: false })
    this.props.getMapData(this.state.model, send, this.getDataSuccessCallBack)
    this.setState({
      filters: temp,
      curr: 1
    })
  }
  handleCheckSub = (sub, event) => {
    const tempsub = JSON.parse(JSON.stringify(this.state.subfilters))
    if (event.target.checked) {
      tempsub[sub] = true
    } else {
      tempsub[sub] = false
    }

    var tempdata = JSON.parse(JSON.stringify(this.state.data))
    // //TODO : double check complexity
    this.state.data.data.map((obj, index) => {
      console.log(obj.filter)
      var o = {}
      for (var primary in obj.filter) {
        var fil = {}
        for (var secondary in obj.filter[primary]) {
          if (tempsub[secondary]) {
            fil[secondary] = obj.filter[primary][secondary]
          }
        }
        o[primary] = fil
      }
      tempdata.data[index].filter = o
    })

    this.setState({
      toSend: tempdata,
      subfilters: tempsub
    })
  }
  render () {
    return (
      <Card.Body>
        <Card.Title>{this.state.title}</Card.Title>
        <Container className={styles.visContainer} fluid>
          <Row style={mapstyles}>
            <Col md={9} xs={12} lg={10}>
              {this.state.loaded && (
                <MapView
                  map={{
                    data: this.state.toSend,
                    time: this.state.value
                  }}
                />
              )}
              {!this.state.loaded && (
                <div className={mapviewstyles.maploader}>
                  <div className={mapviewstyles.maploadersub}>
                    <Spinner style={{ marginTop: '20%' }} animation='grow' />
                  </div>
                </div>
              )}
            </Col>
            <Col md={3} xs={6} lg={2} style={checkstyles}>
              {this.state.filters.map((filter, index) => (
                <>
                  <Form.Check
                    key={index}
                    type='checkbox'
                    checked={filter.status}
                    name={filter.name}
                    label={filter.name}
                    onChange={e => this.handleCheck(index, e, false)}
                  />
                  {filter.status === true &&
                    filter.sub.map((sub, index) => (
                      <Form.Check
                        key={index}
                        style={subfilters}
                        type='checkbox'
                        checked={this.state.subfilters[sub]}
                        name={sub}
                        label={sub}
                        onChange={e => this.handleCheckSub(sub, e)}
                      />
                    ))}
                </>
              ))}
              <Button
                variant='dark'
                onClick={e => this.handleCheck(0, e, true)}
              >
                Clear all filters
              </Button>
            </Col>
          </Row>
          <Row>
            <div className={mapviewstyles.slidecontainer}>
              <input
                type='range'
                min='1'
                max={this.state.maxval}
                value={this.state.curr}
                className={mapviewstyles.slider}
                id={mapviewstyles.myRange}
                onChange={this.handleChange}
              />
              <p id='output'>
                <h4>{this.state.times[this.state.curr - 1]}</h4>
              </p>
            </div>
          </Row>
        </Container>
      </Card.Body>
    )
  }
}

const mapstyles = {
  height: '500px',
  marginBottom: '3%'
}
const checkstyles = {
  paddingLeft: '2%'
}
const subfilters = {
  paddingLeft: '20%'
}

function mapStateToProps (state) {
  console.log(state)
  return {
    getMapData: state.getMapData
  }
}
function matchDispatchToProps (dispatch) {
  return bindActionCreators({ getMapData: getMapData }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Visualisation)
