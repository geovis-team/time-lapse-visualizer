import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
// import { Menu, Segment, Button, Dropdown} from 'semantic-ui-react'
import {Navbar, Nav, NavDropdown, Button, Container,Col, Row} from 'react-bootstrap'
import {SocialMediaIconsReact} from 'social-media-icons-react';
import { SocialIcon } from 'react-social-icons';

import styles from '../static/css/LandingPage.module.css'


class Footer extends Component{
    render(){
        return(
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
        )
    }
}

export default Footer;