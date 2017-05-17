import React, { Component } from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { Col, Row, clearfix, Button, FormControl } from 'react-bootstrap';

import Header from '../header.components.jsx';
import HeaderRightAdmin from './HeaderRightAdmin.components.jsx';

class dashboardAdmin extends Component {
    constructor(props){
        super(props);
        document.title = "Home | Labs Anywhere";
    }
    render(){
        return (
            <div>
                <Header></Header>
                <HeaderRightAdmin></HeaderRightAdmin>
            </div>
        );
    }
}

export default dashboardAdmin