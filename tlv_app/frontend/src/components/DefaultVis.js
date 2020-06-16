import React, { Component } from 'react'
import { Button, Container, Card, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import styles from '../static/css/DefaultVisPage.module.css'
import NavigationBar from './NavigationBar'
import Footer from './Footer'
import { data as mapdata } from './visualizer/data'

class DefaultVis extends Component {
  constructor (props) {
    super(props)
    this.state = {
      allvis: [
        {
          id: 1,
          name: 'Covid',
          heading: 'Rise in COVID-19 cases in India',
          title: 'Visualising the COVID-19 cases using a cluster graph'
        },
        {
          id: 2,
          name: 'Disasters',
          heading: 'Natural Calamities and Climate change',
          title:
            'Areas affected due to natural disasters and effects of pollution and climate change'
        },
        {
          id: 3,
          name: 'Shops',
          heading: 'Trends in Businesses around the world',
          title: 'Number  of shops that closed and opened during the Pandemic'
        }
      ],
      data: mapdata,
      filters: []
    }
  }

  render () {
    console.log(this.state.loaded, this.state.filtersloaded)

    return (
      <div className={styles.body}>
        <NavigationBar />
        <Container
          fluid
          className={styles.container}
          style={{ padding: '0% 7% 7% 7%' }}
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
          <Row>
            {this.state.allvis.map((visObj, index) => (
              <Col
                xs={8}
                md={6}
                lg={4}
                key={visObj.id}
                style={{ padding: '2%' }}
              >
                <Card style={{ height: '100%' }}>
                  <Card.Header>
                    <h3
                      className={styles.visHeading}
                      name={visObj.name}
                      open={false}
                    >
                      {visObj.name}
                    </h3>
                  </Card.Header>
                  <Card.Img
                    variant='top'
                    src={require('../static/assets/map-placeholder.png')}
                  />
                  <Card.Body>
                    <Card.Title>{visObj.heading}</Card.Title>
                    <Card.Text>{visObj.title}</Card.Text>
                    <Button variant='dark'>
                      <Link
                        to={{
                          pathname: '/viewvis',
                          state: visObj
                        }}
                        className={styles.linkitem}
                      >
                        View Now
                      </Link>
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
        <Footer />
      </div>
    )
  }
}

export default DefaultVis
