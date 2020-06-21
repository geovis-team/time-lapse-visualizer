import React, { Component } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { SocialIcon } from 'react-social-icons'

import styles from '../static/css/LandingPage.module.css'

class Footer extends Component {
  render () {
    return (
      <Container fluid className={`${styles.container} ${styles.footer}`}>
        <Container>
          <Row>
            <Col md> </Col>
            <Col md> </Col>
            <Col md>
              {' '}
              <h4 style={{ color: '#ffffff' }}>GeoVis</h4>
              <h6 style={{ color: '#ffffff' }}>2020-2021</h6>
            </Col>
            <Col md>
              {' '}
              <SocialIcon url='https://in.linkedin.com/' />{' '}
            </Col>
            <Col md>
              {' '}
              <SocialIcon url='http://twitter.com/' />
            </Col>
            <Col md>
              {' '}
              <SocialIcon url='http://facebook.com/' />
            </Col>
            <Col md>
              {' '}
              <SocialIcon url='https://github.com/' />
            </Col>
            <Col md>
              {' '}
              <SocialIcon url='https://mail.google.com/' />
            </Col>
            <Col md> </Col>
            <Col md> </Col>
          </Row>
        </Container>
      </Container>
    )
  }
}

export default Footer
