import React, { Component } from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { Col, Row, clearfix, Button, FormControl } from 'react-bootstrap';

import Header from '../header.components.jsx';
import HeaderRightPatient from './HeaderRightPatient.components.jsx';
import Message from '../message.component.jsx';

class messagesPatient extends Component {
    constructor(props){
        super(props);
        document.title = "Home | Labs Anywhere";
    }
    render(){
        return (
            <div>
                <Header></Header>
                <HeaderRightPatient></HeaderRightPatient>
                <Message></Message>
            </div>
        );
    }
}

export default messagesPatient