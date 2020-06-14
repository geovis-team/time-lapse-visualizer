import React, { Component } from 'react'
import { Button, Container, Accordion, Card } from 'react-bootstrap'

import styles from '../static/css/DefaultVisPage.module.css'
import { Visualisation } from './Visualisation'
import NavigationBar from './NavigationBar'
import Footer from './Footer'
import { data as mapdata } from './visualizer/data'

export default class DefaultVis extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeItem: 'home',
      data: mapdata,
      filters: []
    }
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  componentDidMount () {}
  render () {
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
                  <h3 className={styles.visHeading}>
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
                    filters: [
                      {
                        name: 'Region',
                        sub: ['a', 'b', 'c', 'd'],
                        status: false
                      },
                      {
                        name: 'Zones',
                        sub: ['a', 'b', 'c', 'd'],
                        status: false
                      },
                      {
                        name: 'Schools',
                        sub: ['a', 'b', 'c', 'd'],
                        status: false
                      },
                      {
                        name: 'North',
                        sub: ['a', 'b', 'c', 'd'],
                        status: false
                      }
                    ]
                  }}
                />
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant='link' eventKey='1'>
                  <h3 className={styles.visHeading}>
                    Trends in Businesses around the world
                  </h3>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey='1'>
                <Visualisation
                  vis={{
                    data: { types: [], locations: [] },
                    title:
                      'Number  of shops that closed and opened during the Pandemic',
                    filters: [
                      {
                        name: 'Business',
                        sub: ['a', 'b', 'c', 'd'],
                        status: false
                      },
                      {
                        name: 'Shops',
                        sub: ['a', 'b', 'c', 'd'],
                        status: false
                      },
                      {
                        name: 'Pharmacies',
                        sub: ['a', 'b', 'c', 'd'],
                        status: false
                      },
                      {
                        name: 'Opened',
                        sub: ['a', 'b', 'c', 'd'],
                        status: false
                      },
                      {
                        name: 'Closed',
                        sub: ['a', 'b', 'c', 'd'],
                        status: false
                      }
                    ]
                  }}
                />
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant='link' eventKey='2'>
                  <h3 className={styles.visHeading}>
                    Expensive Electronic Prices
                  </h3>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey='2'>
                <Visualisation
                  vis={{
                    data: { types: [], locations: [] },
                    title: 'Rise in Electronic prices',
                    filters: [
                      {
                        name: 'Region',
                        sub: ['a', 'b', 'c', 'd'],
                        status: false
                      },
                      {
                        name: 'Companies',
                        sub: ['a', 'b', 'c', 'd'],
                        status: false
                      },
                      {
                        name: 'Products',
                        sub: ['a', 'b', 'c', 'd'],
                        status: false
                      }
                    ]
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
