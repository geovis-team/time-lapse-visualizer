import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Col, Row } from 'react-bootstrap'

import styles from '../static/css/LandingPage.module.css'
import NavigationBar from './NavigationBar'
import Footer from './Footer'

export default class Landing extends Component {
  constructor (props) {
    super(props)
    this.state = { activeItem: 'home' }
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render () {
    return (
      <div className={styles.body}>
        <NavigationBar />
        <Container fluid='true' className={styles.container}>
          <Row fluid='true'>
            <Col md className={styles.column} style={{ textAlign: 'center' }}>
              <img
                style={{
                  width: '60%',
                  height: 'auto'
                }}
                src={require('../static/assets/landing2.gif')}
                alt='Landing Placeholder'
              />
            </Col>

            <Col md className={styles.column}>
              <h1>
                <strong>
                  <i>Time Lapse Visualiser</i>
                </strong>
              </h1>
              <br />
              <h3>
                <strong>
                  <i>
                    GeoVis is a tool for all your visualisation requirements!
                  </i>
                </strong>
              </h3>
              <br />
              <h4 className={styles.colText} style={contentdiv}>
                This application allows you to view default visualisations for
                certain trending datasets as well as create your own
                personalised projects for customized geographic datasets.
              </h4>
              <br />
              <br />
              <br />
              <p>
                <h4 style={contentDivRight} className={styles.colText}>
                  The provision of a timeslider enables you to see the change in
                  the data and observe patterns for analysis. A set of
                  checkboxes can be used to view a smaller subset of the entire
                  data set as well. Map markers contain pop-ups that elaborate
                  further details.
                </h4>
              </p>
            </Col>
          </Row>
          <Row fluid='true'>
            <Col sm className={styles.midcolumn}>
              <h1>
                <strong>Ready to get started?</strong>
              </h1>
              <h4>Sign Up or view standard visualisations</h4>
            </Col>

            <Col sm className={styles.midcolumn}>
              <Link to='/log-sign-in' className={styles.linkitem}>
                <Button id={styles.buttons} variant='dark'>
                  SignUp
                </Button>{' '}
              </Link>
              <Link to='/defaultvis' className={styles.linkitem}>
                <Button id={styles.buttons} variant='dark'>
                  Examples
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    )
  }
}

const contentdiv = {
  width: '80%',
  lineHeight: 1.5
}
const contentDivRight = {
  textAlign: 'right',
  width: '80%',
  lineHeight: 1.5
}
