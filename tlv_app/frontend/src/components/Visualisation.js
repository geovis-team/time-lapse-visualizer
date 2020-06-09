import React, { Component } from 'react';
// import { Menu, Segment, Button, Dropdown} from 'semantic-ui-react'
import {Button, Container,Col, Row, Card, Form} from 'react-bootstrap'

import styles from '../static/css/DefaultVisPage.module.css'
import mapviewstyles from '../static/css/Visualisation.module.css'
import MapView from './MapView'

class Visualisation extends Component {
    constructor(props){
        super(props);
        this.state={
            title:props.vis.title,
            filters:props.vis.filters,
            data:props.vis.data,
            value:1,
            months :{1: "January", 2: "February", 3: "March", 4:"April", 5:"May", 6:"June", 7:"July", 8:"August", 9:"September",10:"October", 11:"November", 12:"December"}

        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
      }

    render(){
        // console.log("from visualisation",this.state.data);
    return(
        <Card.Body>
            <Card.Title>{this.state.title}</Card.Title>
            <Container className={styles.visContainer} fluid>
                <Row style={mapstyles}>
                    <Col md={9} xs={12} lg={10}>
                        <MapView map={{data:this.state.data, time : this.state.value}}/>
                    </Col>
                    <Col md={3} xs={6} lg={2} style={checkstyles}>
                        {this.state.filters.map(filter=>(
                            <Form.Check type="checkbox" label={filter} />
                        ))}
                        <Button variant="dark">Clear all filters</Button>
                    </Col>
                </Row>
                <Row>
                    <div className={mapviewstyles.slidecontainer}>
                    <input type="range" min="1" max="12" value={this.state.value} className={mapviewstyles.slider} id={mapviewstyles.myRange} onChange={this.handleChange} />
                    <p id="output">{this.state.months[this.state.value]}</p>
                    </div>
                </Row>
            </Container>
        </Card.Body>
        )
    }
}

const mapstyles = {
    height:"500px",
}
const checkstyles={
    paddingLeft:"2%",
}

export { Visualisation } ;