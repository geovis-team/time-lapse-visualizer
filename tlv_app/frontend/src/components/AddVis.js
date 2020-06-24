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
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Dropdown } from 'semantic-ui-react'

import styles from '../static/css/DefaultVisPage.module.css'
import NavigationBar from './NavigationBar'
import Footer from './Footer'
import axiosInstance from '../actions/utility'

class AddVis extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      heading: '',
      description: '',
      filters: {},
      file: null,
      type: 0,
      types: [
        { text: 'Default', value: 0 },
        { text: 'Option1', value: 1 },
        { text: 'Option2', value: 2 },
        { text: 'Option3', value: 3 }
      ],
      dataFormats: [
        ['Default', require('../static/assets/type1.jpeg'), 3],
        ['Option1', require('../static/assets/type1.jpeg'), 4],
        ['Option2', require('../static/assets/type2.jpeg'), 5],
        ['Option3', require('../static/assets/type3.jpeg'), 6]
      ]
    }
  }

  componentDidMount () {}

  handleSubmit = () => {
    const uploadData = new FormData()
    uploadData.append('name', this.state.name)
    uploadData.append('heading', this.state.heading)
    uploadData.append('description', this.state.description)
    uploadData.append('type', this.state.type)
    uploadData.append('filters', JSON.stringify(JSON.parse(this.state.filters)))
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
      .catch(function (error) {})
  }

  render () {
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
                    <Form.File
                      id='formcheck-api-regular'
                      style={{ margin: '10% 0' }}
                    >
                      <Form.File.Label>
                        Select the Datasource File
                      </Form.File.Label>
                      <Form.File.Input
                        onChange={e =>
                          this.setState({ file: e.target.files[0] })
                        }
                      />
                    </Form.File>
                    <h6>Select Data structure type</h6>
                    <Dropdown
                      style={{ marginRight: '2%' }}
                      placeholder='Type'
                      search
                      selection
                      options={this.state.types}
                      onChange={(e, data) =>
                        this.setState({ type: data.value })
                      }
                    />
                    <Button
                      type='submit'
                      variant='dark'
                      onClick={this.handleSubmit}
                    >
                      Submit
                    </Button>
                  </Form>
                </Col>
                <Col
                  md
                  style={{ width: '100%', padding: 10, textAlign: 'center' }}
                >
                  <Accordion defaultActiveKey='0' style={{ width: '100%' }}>
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
                    {this.state.dataFormats.map(obj => (
                      <Card>
                        <Card.Header>
                          <Accordion.Toggle
                            as={Button}
                            variant='link'
                            eventKey={obj[2]}
                          >
                            {obj[0]}
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={obj[2]}>
                          <Card.Body>
                            {' '}
                            <img
                              src={obj[1]}
                              alt='Eg Config'
                              style={{ width: '100%' }}
                            />
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    ))}
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
