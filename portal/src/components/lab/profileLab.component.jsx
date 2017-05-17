import React, { Component } from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { Col, Row, clearfix, Button, FormControl } from 'react-bootstrap';

import Header from '../header.components.jsx';
import HeaderRightLab from './HeaderRightLab.components.jsx';

class profileLab extends Component {
    constructor(props){
        super(props);
        document.title = "Home | Labs Anywhere";
    }
    render(){
        return (
            <div>
                <Header/>
                <HeaderRightLab/>
            <div className="hbox hbox-auto-xs hbox-auto-sm">
                <div className="col">
                    <div className="wrapper bg-white b-b">
                        <ul className="nav nav-pills nav-sm">
                            <li className="active"><a href>About</a></li>
                            <li><a href>Address</a></li>
                            <li><a href>Message</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default profileLab