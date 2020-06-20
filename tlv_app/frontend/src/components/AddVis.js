import React, { Component } from 'react'
import { Button, Container, Form, Card, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import styles from '../static/css/DefaultVisPage.module.css'
import NavigationBar from './NavigationBar'
import Footer from './Footer'
import { data as mapdata } from './visualizer/data'

class AddVis extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {}

  render () {
    const { isAutheticated } = this.props
    return (
      <div className={styles.body}>
        <NavigationBar />
        <Container
          fluid
          className={styles.container}
          style={{ padding: '0% 7% 0 7%' }}
        >
          <div className={styles.intro}>
            <h1>Enter your new project details</h1>
            <h6>An example is attached for your benefit as well</h6>
            <h6>Please ensure the config file format follows the example</h6>
          </div>
          <Container fluid className={styles.container}>
            <Container>
              <Row>
                <Col
                  sm
                  className={styles.column}
                  style={{ padding: 50, marginRight: '10%' }}
                >
                  <Form>
                    <Form.Group>
                      <Form.Label>Project Name</Form.Label>
                      <Form.Control
                        style={{ padding: 30 }}
                        type='name'
                        placeholder='Enter Name (No Spaces)'
                        maxLength={30}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Project Heading</Form.Label>
                      <Form.Control
                        style={{ padding: 30 }}
                        type='name'
                        placeholder='Enter Heading'
                        maxLength={100}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Project Description</Form.Label>
                      <Form.Control
                        style={{ padding: 30 }}
                        type='name'
                        placeholder='Enter a short description'
                        maxLength={500}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Filters JSON</Form.Label>
                      <Form.Control
                        style={{ padding: 30 }}
                        as='textarea'
                        rows='5'
                        placeholder='Enter Filters as JSON'
                        maxLength={1000}
                      />
                    </Form.Group>
                    <Form.File
                      style={{ padding: 30 }}
                      id='custom-file'
                      label='Select a Local Config File'
                      custom
                    />
                    <Button variant='dark' type='submit'>
                      Submit
                    </Button>
                  </Form>
                </Col>
                <Col md style={{ padding: 50 }}>
                  {' '}
                  <img
                    src={require('../static/assets/placeholder.jpg')}
                    alt='Eg Config'
                  />
                </Col>
              </Row>
            </Container>
          </Container>
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

export default withRouter(connect(mapStateToProps)(AddVis))
