import React, { Component } from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { Col, Row, clearfix, Button, FormControl } from 'react-bootstrap';

import Header from '../header.components.jsx';
import HeaderRightPatient from './HeaderRightPatient.components.jsx';

class viewReportsPatient extends Component {
    constructor(props){
        super(props);
        document.title = "View Reports | Labs Anywhere";
    }
    render(){
        return (
            <div>
                <Header></Header>
                <HeaderRightPatient></HeaderRightPatient>
                <div id="content" role="main">
                    <div className="app-content-body ">
                        <div className="wrapper-md">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    Reports
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-striped m-b-none">
                                        <thead>
                                        <tr>
                                            <th style={{width: '50%',textAlign:'center'}}>Test Name</th>
                                            <th style={{width: '50%',textAlign:'center'}}>View</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default viewReportsPatient