import React, { Component } from 'react';
import {Button,Col, Row, Tabs, Tab, Form} from 'react-bootstrap'

import styles from '../static/css/LoginSignupPage.module.css'

class SignupForm extends Component {
    render(){
    return(
        <Form>
            <Form.Group controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
    
            <Form.Group controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formGridAddress1">
                <Form.Label>Some Field</Form.Label>
                <Form.Control placeholder="x/y/z" />
            </Form.Group>
            <Form.Group controlId="formGridState">
            <Form.Label>Type of Usage</Form.Label>
            <Form.Control as="select" defaultValue="Choose...">
                <option>Business</option>
                <option>Student</option>
                <option>Software Developer</option>
            </Form.Control>
            </Form.Group>
        
        <Form.Group id="formGridCheckbox">
            <Form.Check type="checkbox" label="Some checkbox if needed" />
        </Form.Group>
        
        <Button variant="dark" type="submit">
            Submit
        </Button>
        </Form>
        )
    }
}

class LoginForm extends Component{
    render(){
        return(
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="dark" type="submit">
                    Submit
                </Button>
            </Form>
        )
    }
}

export { SignupForm, LoginForm} ;