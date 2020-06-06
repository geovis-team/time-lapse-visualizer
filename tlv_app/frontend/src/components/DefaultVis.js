import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
// import { Menu, Segment, Dropdown} from 'semantic-ui-react'
import {Navbar, Nav, Button, Container,Col, Row, Accordion, Card, Form} from 'react-bootstrap'
import {SocialMediaIconsReact} from 'social-media-icons-react';
import { SocialIcon } from 'react-social-icons';

import styles from '../static/css/DefaultVisPage.module.css'
import {Visualisation} from './Visualisation'

export default class DefaultVis extends Component{
    
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
            <Container fluid className={styles.container} style={{padding:"4% 7%"}}>
                {/* <Container> */}
                <div className={styles.intro}>
                    <h1 style={{marginBottom:"2%"}}>Visualisations for a variety of different datasets</h1>
                    <h6>Select one of the visualisations from the options to expand and view the plots</h6>
                    <h6>The filters that can be applied for each visualisation are available as checkboxes.</h6>
                </div>
                <Accordion defaultActiveKey="0">
                    
                        <Card>
                            <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <h3 className={styles.visHeading}>Rise in COVID-19 cases in India</h3>
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Visualisation vis={{title:"Visualising the COVID-19 cases using a choropleth graph", filters:["Region","Zones","Schools","North"]}}/>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                <h3 className={styles.visHeading}>Trends in Businesses around the world</h3>
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                                <Visualisation vis={{title:"Number  of shops that closed and opened during the Pandemic", filters:["Business","Shops","Pharmacies","Opened","Closed"]}}/>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="2">
                                <h3 className={styles.visHeading}>Expensive Electronic Prices</h3>
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="2">
                                <Visualisation vis={{title:"Rise in Electronic prices", filters:["Region","Companies","Products"]}}/>
                            </Accordion.Collapse>
                        </Card>
                </Accordion>
                {/* </Container> */}
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


