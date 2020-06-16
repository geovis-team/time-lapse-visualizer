import React, { Component } from 'react'
import { Container, Card } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getFilters } from '../actions/getFilters'
import styles from '../static/css/DefaultVisPage.module.css'
import { Visualisation } from './Visualisation'
import NavigationBar from './NavigationBar'
import Footer from './Footer'
import { data as mapdata } from './visualizer/data'

class ViewVis extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: mapdata,
      filters: [],
      loaded: false,
      visObj: props.location.state
    }
  }

  componentDidMount () {
    this.props.getFilters(this.state.visObj.name, this.getFilterSuccessCallBack)
  }

  getFilterSuccessCallBack = data => {
    this.setState({
      filters: data,
      loaded: true
    })
  }
  render () {
    console.log('in renderrrrrrr')
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
                <h3 className={styles.visHeading}>
                  {this.state.visObj.heading}
                </h3>
              </Card.Header>
              <Visualisation
                vis={{
                  data: this.state.data,
                  title: this.state.visObj.title,
                  filters: this.state.filters
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
    getFilters: state.getFilters
  }
}
function matchDispatchToProps (dispatch) {
  return bindActionCreators({ getFilters: getFilters }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(ViewVis)
