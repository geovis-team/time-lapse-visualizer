import React, { Component } from 'react'
import { Button, Container, Card, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import axios from 'axios'

import styles from '../static/css/DefaultVisPage.module.css'
import NavigationBar from './NavigationBar'
import Footer from './Footer'
import { data as mapdata } from './visualizer/data'
import axiosInstance from '../actions/utility'

class DefaultVis extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: false,
      allVisualisations: [],
      defaultVisualisations: [
        {
          id: 1,
          name: 'Covid',
          heading: 'Rise in COVID-19 cases in India',
          description: 'Visualising the COVID-19 cases using a cluster graph'
        },
        {
          id: 2,
          name: 'Disasters',
          heading: 'Natural Calamities and Climate change',
          description:
            'Areas affected due to natural disasters and effects of pollution and climate change'
        },
        {
          id: 3,
          name: 'Shops',
          heading: 'Trends in Businesses around the world',
          description:
            'Number  of shops that closed and opened during the Pandemic'
        }
      ],
      data: mapdata,
      filters: []
    }
  }

  componentDidMount () {
    this.setState({ loaded: false })
    const isAutheticated = this.props.isAutheticated
    if (isAutheticated) {
      axiosInstance
        .get('http://127.0.0.1:8000/api/config/')
        .then(response => {
          this.setState({
            loaded: true,
            allVisualisations: response.data
          })
        })
        .catch(function (error) {
          console.log(error)
        })
    } else
      this.setState({
        loaded: true
      })
  }

  render () {
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
            {this.state.allVisualisations.length > 0 &&
            this.state.loaded === true ? (
              <h5>
                Select one of the visualisations from the options to expand and
                view the plots
                <br />
                The filters that can be applied for each visualisation are
                available as checkboxes.
              </h5>
            ) : (
              <div>
                <h5>
                  Welcome to GeoVis! Here are some default visualisations. Time
                  to create your first personalised project!
                  <br />
                  Click the add project button and begin!
                </h5>
              </div>
            )}
            {this.props.isAutheticated === true && (
              <Link
                to={{
                  pathname: '/addvis'
                }}
                className={styles.linkitem}
              >
                <Button variant='dark' id={styles.buttons}>
                  Add New Project
                </Button>
              </Link>
            )}
          </div>
          {this.state.loaded && (
            <>
              <h2>List of all Default Visualisation</h2>
              <Row>
                {this.state.defaultVisualisations.map((visObj, index) => (
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
                          {visObj.name.substring(visObj.name.indexOf('_') + 1)}
                        </h3>
                      </Card.Header>
                      <Card.Img
                        variant='top'
                        src={require('../static/assets/map-placeholder.png')}
                      />
                      <Card.Body>
                        <Card.Title>{visObj.heading}</Card.Title>
                        <Card.Text>{visObj.description}</Card.Text>
                        <Link
                          to={{
                            pathname: '/viewvis/' + visObj.name,
                            state: visObj
                          }}
                          className={styles.linkitem}
                          style={{ marginRight: '10%' }}
                        >
                          <Button variant='dark'>View Now</Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
              {this.props.isAutheticated === true ? (
                this.state.allVisualisations.length > 0 ? (
                  <h2>List of your Projects :</h2>
                ) : (
                  <h2>Start creating projects to view them here :</h2>
                )
              ) : (
                <></>
              )}
              <Row>
                {this.state.allVisualisations.map((visObj, index) => (
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
                          {visObj.name.substring(visObj.name.indexOf('_') + 1)}
                        </h3>
                      </Card.Header>
                      <Card.Img
                        variant='top'
                        src={require('../static/assets/map-placeholder.png')}
                      />
                      <Card.Body>
                        <Card.Title>{visObj.heading}</Card.Title>
                        <Card.Text>{visObj.description}</Card.Text>
                        <Link
                          to={{
                            pathname: '/viewvis/' + visObj.id,
                            state: visObj
                          }}
                          className={styles.linkitem}
                          style={{ marginRight: '10%' }}
                        >
                          <Button variant='dark'>View Now</Button>
                        </Link>
                        <Link
                          to={{
                            pathname: '/updatevis',
                            state: visObj
                          }}
                          className={styles.linkitem}
                          style={{ Left: '10%' }}
                        >
                          <Button variant='dark'>Edit Project</Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          )}
        </Container>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAutheticated: localStorage.getItem('refreshToken') !== null
  }
}

export default withRouter(connect(mapStateToProps)(DefaultVis))
