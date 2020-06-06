import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
// import { Menu, Segment, Button, Dropdown} from 'semantic-ui-react'
import {Navbar, Nav, NavDropdown, Button, Container,Col, Row, Tabs, Tab, Form} from 'react-bootstrap'
import {SocialMediaIconsReact} from 'social-media-icons-react';
import { SocialIcon } from 'react-social-icons';

import styles from '../static/css/LoginSignupPage.module.css'
import {SignupForm, LoginForm} from './LoginSignupForms'

export default class LoginSignup extends Component{
    
    constructor(props){
        super(props);
        this.state = { activeItem: 'home' }
    }
    handleItemClick = (e,{ name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state
        return (
            <div className={styles.body}>
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
            <Container fluid className={styles.container}>
                <Container>
                <Row>  
                    <Col md> </Col>
                    <Col sm className={styles.column} style={{padding:70}}>
                        <Tabs defaultActiveKey="Signup" id="uncontrolled-tab-example">
                            <Tab eventKey="Login" title="Login">
                                <LoginForm />
                            </Tab>
                            <Tab eventKey="Signup" title="Signup">
                                <SignupForm />
                            </Tab>
                        </Tabs>
                    </Col>
                    <Col md> </Col>
                </Row>
                </Container>
            </Container>
            <Container fluid className={`${styles.container} ${styles.footer}`}>
                <Container>
                <Row>
                    <Col md> </Col>
                    <Col md> </Col>
                    <Col md> <h4>Name</h4><h6>2019-2020</h6></Col>
                    <Col md> <SocialIcon url="https://in.linkedin.com/" /> </Col>
                    <Col md> <SocialIcon url="http://twitter.com/" /></Col>
                    <Col md> <SocialIcon url="http://facebook.com/" /></Col>
                    <Col md> <SocialIcon url="https://github.com/" /></Col>
                    <Col md> <SocialIcon url="https://mail.google.com/" /></Col>
                    <Col md> </Col>
                    <Col md> </Col>
                </Row>
                </Container>
            </Container>
            </div>
        )
    }
    
}


