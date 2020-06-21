import React, { Component } from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { logout } from '../actions/auth'
import { withRouter } from 'react-router'

import styles from '../static/css/LandingPage.module.css'

class NavigationBar extends Component {
  render () {
    const { isAutheticated } = this.props

    return (
      <Navbar variant='dark' bg='dark' expand='lg' style={{ padding: 15 }}>
        <Navbar.Brand href='/'>GeoVis</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link id={styles.navItem} href='#about'>
              About
            </Nav.Link>
            <Nav.Link id={styles.navItem} href='#link'>
              Contact
            </Nav.Link>
            <Nav.Link id={styles.navItem} href='/defaultvis'>
              Visualisations
            </Nav.Link>
          </Nav>
          <Nav className='ml-auto'>
            <Nav.Link id={styles.navItem} href='#api'>
              API
            </Nav.Link>
            <Nav.Link id={styles.navItem} href='#help'>
              Help
            </Nav.Link>
            {isAutheticated === true ? (
              <Button
                variant='light'
                style={{ marginLeft: 10 }}
                onClick={() => {
                  this.props.Logout(this.logoutSuccessCallBack)
                }}
                href='/'
              >
                Log out
              </Button>
            ) : (
              <Button
                variant='light'
                style={{ marginLeft: 10 }}
                id={styles.navItem}
                href='/log-sign-in'
              >
                SignUp / Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAutheticated: localStorage.getItem('refreshToken') !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    Logout: () => {
      dispatch(logout())
    }
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NavigationBar)
)
