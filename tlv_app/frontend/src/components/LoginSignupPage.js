import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
// import { Menu, Segment, Button, Dropdown} from 'semantic-ui-react'
import {Navbar, Nav, NavDropdown, Button, Container,Col, Row, Tabs, Tab, Form} from 'react-bootstrap'
import {SocialMediaIconsReact} from 'social-media-icons-react';
import { SocialIcon } from 'react-social-icons';

import styles from '../static/css/LoginSignupPage.module.css'
import {SignupForm, LoginForm} from './LoginSignupForms'
import NavigationBar from './NavigationBar'
import Footer from './Footer'

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
            <NavigationBar />
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
            <Footer />
            </div>
        )
    }
    
}


