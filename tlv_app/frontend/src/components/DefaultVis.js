import React, { Component } from 'react'
import { Button, Container, Accordion, Card } from 'react-bootstrap'
import axios from 'axios'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getFilters } from '../actions/getfilters'

import styles from '../static/css/DefaultVisPage.module.css'
import { Visualisation } from './Visualisation'
import NavigationBar from './NavigationBar'
import Footer from './Footer'
import { data as mapdata } from './visualizer/data'

class DefaultVis extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: mapdata,
      filters: [
        [{ name: 'Filter', sub: [1, 2, 3], status: false }],
        [{ name: 'Filter', sub: [1, 2, 3], status: false }],
        [{ name: 'Filter', sub: [1, 2, 3], status: false }]
      ],
      loaded: false
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick = e => {
    console.log(e.target)
    console.log(e.target.getAttribute('name'))
    // TODO : Should call the API here onclick for new filters
  }

  componentDidMount () {
    // TODO : Should load the default filters initally.
    {
      console.log('check ----- ', this.props.getFilters('Covid'))
      // TODO : always logging undefined here.
    }
  }
  render () {
    // if (this.state.loaded === false) {
    //   return <></>
    // } else
    // TODO : removed the onload for now, can add later
    return (
      <div className={styles.body}>
        <NavigationBar />
        <Container
          fluid
          className={styles.container}
          style={{ padding: '4% 7%' }}
        >
          <div className={styles.intro}>
            <h1 style={{ marginBottom: '2%' }}>
              Visualisations for a variety of different datasets
            </h1>
            <h6>
              Select one of the visualisations from the options to expand and
              view the plots
            </h6>
            <h6>
              The filters that can be applied for each visualisation are
              available as checkboxes.
            </h6>
          </div>
          <Accordion defaultActiveKey='0'>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant='link' eventKey='0'>
                  <h3
                    className={styles.visHeading}
                    name='Covid'
                    onClick={this.handleClick}
                  >
                    Rise in COVID-19 cases in India
                  </h3>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey='0'>
                <Visualisation
                  vis={{
                    data: this.state.data,
                    title:
                      'Visualising the COVID-19 cases using a choropleth graph',
                    filters: this.state.filters[0]
                  }}
                />
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant='link' eventKey='1'>
                  <h3
                    className={styles.visHeading}
                    name='Disasters'
                    onClick={this.handleClick}
                  >
                    Natural Calamities and Climate change
                  </h3>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey='1'>
                <Visualisation
                  vis={{
                    data: { types: [], locations: [] },
                    title: 'Calamities and Natural disasters',
                    filters: this.state.filters[1]
                  }}
                />
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant='link' eventKey='2'>
                  <h3
                    className={styles.visHeading}
                    name='Shops'
                    onClick={this.handleClick}
                  >
                    Trends in Businesses around the world
                  </h3>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey='2'>
                <Visualisation
                  vis={{
                    data: { types: [], locations: [] },
                    title:
                      'Number  of shops that closed and opened during the Pandemic',
                    filters: this.state.filters[2]
                  }}
                />
              </Accordion.Collapse>
            </Card>
          </Accordion>
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
// TODO : bind the function here
function matchDispatchToProps (dispatch) {
  return bindActionCreators({ getFilters: getFilters }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(DefaultVis)
