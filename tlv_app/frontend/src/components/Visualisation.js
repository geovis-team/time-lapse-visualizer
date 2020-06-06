import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
// import { Menu, Segment, Button, Dropdown} from 'semantic-ui-react'
import {Navbar, Nav, Button, Container,Col, Row, Accordion, Card, Form} from 'react-bootstrap'
import {SocialMediaIconsReact} from 'social-media-icons-react';
import { SocialIcon } from 'react-social-icons';

import styles from '../static/css/DefaultVisPage.module.css'

class Slider extends Component{

}

class Visualisation extends Component {
    constructor(props){
        super(props);
        this.state={
            title:props.vis.title,
            filters:props.vis.filters
        }
    }
    render(){
    return(
        <Card.Body>
            <Card.Title>{this.state.title}</Card.Title>
            <Container className={styles.visContainer} fluid>
                <Row>
                    <Col md={9} xs={12} lg={10}>
                    <img className={styles.myvis} src={require('../static/assets/placeholder2.png')} alt="" />
                    </Col>
                    <Col md={3} xs={6} lg={2}>
                        {/* <Button variant="primary">Go somewhere</Button> */}
                        {this.state.filters.map(filter=>(
                            <Form.Check type="checkbox" label={filter} />
                        ))}
                    </Col>
                </Row>
            </Container>
        </Card.Body>
        )
    }
}

export { Visualisation } ;