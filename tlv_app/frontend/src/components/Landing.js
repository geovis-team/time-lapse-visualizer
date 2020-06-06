import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
// import { Menu, Segment, Button, Dropdown} from 'semantic-ui-react'
import {Navbar, Nav, NavDropdown, Button, Container,Col, Row} from 'react-bootstrap'
import {SocialMediaIconsReact} from 'social-media-icons-react';
import { SocialIcon } from 'react-social-icons';

import styles from '../static/css/LandingPage.module.css'


export default class Landing extends Component{
    
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
                <Row fluid >
                    <Col sm className={styles.column} style={{textAlign: "center"}}>
                        <img src={require('../static/assets/placeholder.jpg')} />
                    </Col>
                    
                    <Col sm className={styles.column} >
                        <h1>Big Catchy Heading!</h1>
                        <h5 className={styles.colText}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br />
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br/>
                            Need to fill these paragraphs with somecontent we can do this later.
                        </h5>
                        <h6 className={styles.colText}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br />sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </h6>
                        <h5 className={styles.colText}>
                            What else can we write here? Do we even need to write here? <br/>
                            Maybe just keep writing anything here anyways.
                        </h5>

                    </Col>
                </Row>
                <Row fluid >
                    <Col sm className={styles.midcolumn}>
                        <h1><bold>Ready to get started?</bold></h1>
                        <h5>Sign Up or view standard visualisations</h5>
                    </Col>
                    
                    <Col sm className={styles.midcolumn}>
                    <Button id={styles.buttons} variant="dark"><Link to="/log-sign-in" className={styles.linkitem}>SignUp</Link></Button>{' '}
                    <Button id={styles.buttons} variant="outline-dark">View Examples</Button>
                    </Col>
                </Row>
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


