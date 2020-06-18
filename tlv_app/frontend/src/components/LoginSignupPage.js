import React, { Component } from 'react'
// import { Menu, Segment, Button, Dropdown} from 'semantic-ui-react'
import { Container, Col, Row, Tabs, Tab } from 'react-bootstrap'

import styles from '../static/css/LoginSignupPage.module.css'
import LoginForm from './Login'
import SignupForm from './Signup'
import NavigationBar from './NavigationBar'
import Footer from './Footer'

export default class LoginSignup extends Component {
  constructor (props) {
    super(props)
    this.state = { activeItem: 'home' }
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render () {
    return (
      <div className={styles.body}>
        <NavigationBar />
        <Container fluid className={styles.container}>
          <Container>
            <Row>
              <Col md> </Col>
              <Col sm className={styles.column} style={{ padding: 70 }}>
                <Tabs defaultActiveKey='Signup' id='uncontrolled-tab-example'>
                  <Tab eventKey='Login' title='Login'>
                    <LoginForm />
                  </Tab>
                  <Tab eventKey='Signup' title='Signup'>
                    <SignupForm />
                  </Tab>
                </Tabs>
              </Col>
              <Col md> </Col>
            </Row>
          </Container>
        </Container>
        <Footer />
      </div>
    )
  }
}
