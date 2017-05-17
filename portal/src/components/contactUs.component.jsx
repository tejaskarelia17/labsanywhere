import React, { Component } from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { Col, Row, clearfix, Button, FormControl } from 'react-bootstrap';

import Header from './header.components.jsx';


class contactUs extends Component {
    constructor(props){
        super(props);
        document.title = "Contact Us | Labs Anywhere";
    }
    render(){
        return (
            <div>
                <Header/>
                <h1>Contact Us</h1>
            </div>
        );
    }
}

export default contactUs