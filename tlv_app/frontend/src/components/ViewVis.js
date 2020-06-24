import React, { Component } from 'react'
import { Container, Card } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { toast } from 'react-semantic-toasts'
import { getFilters } from '../actions/getFilters'
import { getConfig } from '../actions/getConfig'
import styles from '../static/css/DefaultVisPage.module.css'
import Visualisation from './Visualisation'
import NavigationBar from './NavigationBar'
import Footer from './Footer'
import AddData from './AddData'
import { data as mapdata } from './visualizer/data'

class ViewVis extends Component {
  constructor (props) {
    super(props)
    this.state = {
      filters: [],
      loaded: false,
      mindDate: '',
      times: [],
      maxDate: '',
      minval: 1,
      maxval: 0,
      value: '',
      visObj: props.location.state,
      isDefault: true
    }
  }

  formatDate (date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      year = d.getFullYear()

    if (month.length < 2) month = '0' + month

    return [year, month].join('-')
  }

  getConfigSuccessCallBack = data => {
    this.setState({
      isDefault: false
    })
    this.props.getFilters(
      this.state.visObj.name,
      false,
      this.getFilterSuccessCallBack
    )
  }

  componentDidMount () {
    var id = this.props.match.params.id
    var isDefault
    if (id == 'Covid' || id == 'Shops' || id == 'Disasters') {
      this.props.getFilters(
        this.state.visObj.name,
        true,
        this.getFilterSuccessCallBack
      )
      this.setState({ isDefault: true })
    } else {
      this.props.getConfig(
        this.props.match.params.id,
        this.getConfigSuccessCallBack
      )
    }
  }

  getFilterSuccessCallBack = data => {
    if (data.earliestTime == null && data.latestTime == null) {
      this.props.history.push('/defaultvis')
      toast({
        type: 'error',
        title: 'Error',
        description: 'This model has no data\nPlease try again',
        icon: 'frown',
        time: 4000
      })
    } else {
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
          (latestTime.yy - 1 - earliestTime.yy - 1 + 1) * 12
        startMonth = new Date(data.earliestTime)
      }
      for (var i = 0; i < months; i++) {
        sliderSteps.push(this.formatDate(startMonth))
        startMonth.setMonth(startMonth.getMonth() + 1)
      }
      this.setState({
        minDate: data.earliestTime,
        maxDate: data.latestTime,
        maxval: months,
        times: sliderSteps,
        value: sliderSteps[0],
        filters: data.arr,
        loaded: true
      })
    }
  }
  render () {
    if (!this.state.loaded) return <></>
    else
      return (
        <div className={styles.body}>
          <NavigationBar />
          <Container
            fluid
            className={styles.container}
            style={{ padding: '4% 7%' }}
          >
            <Card>
              <Card.Header>
                <div>
                  <h3 className={styles.visHeading}>
                    {this.state.visObj.heading}
                  </h3>
                </div>
                <AddData projectName={this.state.visObj.name} />
              </Card.Header>
              <Visualisation
                vis={{
                  name: this.state.visObj.name,
                  title: this.state.visObj.title,
                  filters: this.state.filters,
                  minDate: this.state.minDate,
                  maxDate: this.state.maxDate,
                  times: this.state.times,
                  maxval: this.state.maxval,
                  value: this.state.value,
                  isDefault: this.state.isDefault
                }}
              />
            </Card>
          </Container>
          <Footer />
        </div>
      )
  }
}

function mapStateToProps (state) {
  return {
    getFilters: state.getFilters,
    getConfig: state.getConfig,
    isAutheticated: localStorage.getItem('refreshToken') !== null
  }
}
function matchDispatchToProps (dispatch) {
  return bindActionCreators(
    { getFilters: getFilters, getConfig: getConfig },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(ViewVis)
