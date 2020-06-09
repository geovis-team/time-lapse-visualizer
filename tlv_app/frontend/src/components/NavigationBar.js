import React, { Component } from 'react';
import {Link} from 'react-router-dom';
// import { Menu, Segment, Button, Dropdown} from 'semantic-ui-react'
import {Navbar, Nav,Button} from 'react-bootstrap'
import styles from '../static/css/LandingPage.module.css'


class NavigationBar extends Component{
    render(){
        return(
            <Navbar bg="light" expand="lg" className={styles.colorNav} style={{padding:15}}>
                <Navbar.Brand href="#home">NAME</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav  className="mr-auto">
                    <Nav.Link id={styles.navItem} href="#about">About</Nav.Link>
                    <Nav.Link id={styles.navItem} href="#link">Contact</Nav.Link>
                    <Nav.Link id={styles.navItem} href="/defaultvis">Visualisations</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                    <Nav.Link id={styles.navItem} href="#api">API</Nav.Link>
                    <Nav.Link id={styles.navItem} href="#help">Help</Nav.Link>
                    <Nav.Link id={styles.navItem} href="/log-sign-in">Login</Nav.Link>

                    <Button variant="dark" style={{marginLeft:10}}><Link to='/log-sign-in' className={styles.linkitem}> SignUp </Link></Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default NavigationBar;