import React, { Component } from 'react';
import {Link} from 'react-router-dom';
// import { Menu, Segment, Button, Dropdown} from 'semantic-ui-react'
import {Button, Container,Col, Row} from 'react-bootstrap'

import styles from '../static/css/LandingPage.module.css'
import NavigationBar from './NavigationBar'
import Footer from './Footer'


export default class Landing extends Component{
    
    constructor(props){
        super(props);
        this.state = { activeItem: 'home' }
    }
    handleItemClick = (e,{ name }) => this.setState({ activeItem: name })

    render() {
        return (
            <div className={styles.body}>
            <NavigationBar />
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
                        <h1>Ready to get started?</h1>
                        <h5>Sign Up or view standard visualisations</h5>
                    </Col>
                    
                    <Col sm className={styles.midcolumn}>
                    <Button id={styles.buttons} variant="dark"><Link to="/log-sign-in" className={styles.linkitem}>SignUp</Link></Button>{' '}
                    <Button id={styles.buttons} variant="outline-dark"><Link to="/defaultvis" className={styles.linkitem}>View Examples</Link></Button>
                    </Col>
                </Row>
            </Container>
            <Footer />
            </div>
        )
    }
    
}


