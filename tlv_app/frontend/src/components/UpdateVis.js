import React, { Component } from 'react'
import { Button, Container, Form, Card, Row, Col, Alert } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { toast } from 'react-semantic-toasts'

import styles from '../static/css/DefaultVisPage.module.css'
import NavigationBar from './NavigationBar'
import Footer from './Footer'
import { data as mapdata } from './visualizer/data'
import axiosInstance from '../actions/utility'

class UpdateVis extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.location.state.id,
      heading: '',
      description: '',
      filters: {}
    }
  }

  componentDidMount () {
    axiosInstance
      .get('http://127.0.0.1:8000/api/config/' + this.state.id)
      .then(response => {
        this.setState({
          heading: response.data.heading,
          description: response.data.description,
          filters: response.data.filters
        })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  handleSubmit = () => {
    const data = {
      heading: this.state.heading,
      description: this.state.description,
      filters: this.state.filters
    }
    axiosInstance
      .patch('http://127.0.0.1:8000/api/config/' + this.state.id + '/', data)
      .then(response => {
        console.log(response.data)
        this.props.history.push('/defaultvis')
      })
      .catch(function (error) {
        toast({
          type: 'error',
          title: 'Error',
          description: error.response.data.description,
          icon: 'frown',
          time: 4000
        })
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
            <h1>Update your project details</h1>
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
                      <Form.Label>Project Heading</Form.Label>
                      <Form.Control
                        style={{ padding: 30 }}
                        type='name'
                        placeholder={this.state.heading}
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
                        placeholder={this.state.description}
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
                        placeholder={JSON.stringify(this.state.filters)}
                        maxLength={1000}
                        onChange={e =>
                          this.setState({ filters: JSON.parse(e.target.value) })
                        }
                      />
                    </Form.Group>

                    <Button variant='dark' onClick={this.handleSubmit}>
                      Submit
                    </Button>
                  </Form>
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

export default withRouter(connect(mapStateToProps)(UpdateVis))
