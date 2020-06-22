import React, { Component } from 'react'
import {
  Button,
  Container,
  Form,
  Card,
  Row,
  Col,
  Accordion
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import styles from '../static/css/DefaultVisPage.module.css'
import NavigationBar from './NavigationBar'
import Footer from './Footer'
import { data as mapdata } from './visualizer/data'
import axiosInstance from '../actions/utility'

class AddVis extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      heading: '',
      description: '',
      filters: {},
      file: null
    }
  }

  componentDidMount () {}

  handleSubmit = () => {
    const uploadData = new FormData()
    uploadData.append('name', this.state.name)
    uploadData.append('heading', this.state.heading)
    uploadData.append('description', this.state.description)
    uploadData.append('filters', JSON.parse(this.state.filters))
    uploadData.append('file', this.state.file, this.state.file.name)
    axiosInstance
      .post('http://127.0.0.1:8000/api/config/', uploadData, {
        headers: { 'content-type': 'multipart/form-data' }
      })
      .then(response => {
        this.setState({
          loaded: true
        })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  render () {
    const { isAutheticated } = this.props
    return (
      <div className={styles.body}>
        <NavigationBar />
        <Container
          fluid
          className={styles.container}
          style={{ padding: '0% 7% 0 7%', height: '100%' }}
        >
          <div className={styles.intro}>
            <h1>Enter your new project details</h1>
            <h6>An example is attached for your benefit as well</h6>
            <h6>Please ensure the config file format follows the example</h6>
          </div>
          <Container
            fluid
            className={styles.container}
            style={{ height: '100%' }}
          >
            <Container style={{ height: '100%' }}>
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
                        onChange={e => this.setState({ name: e.target.value })}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Project Heading</Form.Label>
                      <Form.Control
                        style={{ padding: 30 }}
                        type='name'
                        placeholder='Enter Heading'
                        maxLength={100}
                        onChange={e =>
                          this.setState({ heading: e.target.value })
                        }
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Project Description</Form.Label>
                      <Form.Control
                        style={{ padding: 30 }}
                        type='name'
                        placeholder='Enter a short description'
                        maxLength={500}
                        onChange={e =>
                          this.setState({ description: e.target.value })
                        }
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
                        onChange={e =>
                          this.setState({ filters: e.target.value })
                        }
                      />
                    </Form.Group>
                    {/* <Form.File
                      style={{ padding: 30 }}
                      id='custom-file'
                      label='Select a Local Data File'
                      custom
                      onChange={e => this.setState({ file: e.target.value })}
                    /> */}
                    <Form.File id='formcheck-api-regular'>
                      <Form.File.Label>Regular file input</Form.File.Label>
                      <Form.File.Input
                        onChange={e =>
                          this.setState({ file: e.target.files[0] })
                        }
                      />
                    </Form.File>
                    <Button
                      variant='dark'
                      type='submit'
                      onClick={this.handleSubmit}
                    >
                      Submit
                    </Button>
                  </Form>
                </Col>
                <Col md style={{ padding: 50, textAlign: 'center' }}>
                  {/* <h5 style={{ padding: '5%' }}>
                    Here is an example JSON object for the filters to be sent
                  </h5>
                   */}
                  <Accordion defaultActiveKey='0'>
                    <Card>
                      <Card.Header>
                        <Accordion.Toggle
                          as={Button}
                          variant='link'
                          eventKey='0'
                        >
                          View Example of Filters JSON
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey='0'>
                        <Card.Body>
                          <img
                            src={require('../static/assets/jsonExample.png')}
                            alt='Eg Config'
                          />
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card>
                      <Card.Header>
                        <Accordion.Toggle
                          as={Button}
                          variant='link'
                          eventKey='1'
                        >
                          Example of Data JSON format
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey='1'>
                        <Card.Body>
                          {' '}
                          <img
                            src={require('../static/assets/dataExample.png')}
                            alt='Eg Config'
                          />
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
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
