import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
// import { Menu, Segment, Dropdown} from 'semantic-ui-react'
import {Navbar, Nav, Button, Container,Col, Row, Accordion, Card, Form} from 'react-bootstrap'
import {SocialMediaIconsReact} from 'social-media-icons-react';
import { SocialIcon } from 'react-social-icons';

import styles from '../static/css/DefaultVisPage.module.css'
import {Visualisation} from './Visualisation'
import NavigationBar from './NavigationBar';
import Footer from './Footer';

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
            <NavigationBar />
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
            <Footer />
            </div>
        )
    }
    
}


