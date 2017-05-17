import React, { Component } from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { Col, Row, clearfix, Button, FormControl } from 'react-bootstrap';

class HeaderRightPatient extends Component {
    constructor(props){
        super(props);
        document.title = "Home | Labs Anywhere";
    }
    render(){
        return (
            <Row>
                <div className="app">
                    <ul className="nav navbar-nav navbar-right">
                        <li className="dropdown">
                            <a href="#" data-toggle="dropdown" className="dropdown-toggle">
                                <i className="icon-bell fa-fw" />
                                <span className="visible-xs-inline">Notifications</span>
                                <span className="badge badge-sm up bg-danger pull-right-xs">2</span>
                            </a>
                            {/* dropdown */}
                            <div className="dropdown-menu w-xl animated fadeInUp">
                                <div className="panel bg-white">
                                    <div className="panel-heading b-light bg-light">
                                        <strong>You have <span>2</span> notifications</strong>
                                    </div>
                                    <div className="list-group">
                                        <a href className="media list-group-item">
                        <span className="pull-left thumb-sm">
                          <img src="img/a0.jpg" alt="..." className="img-circle" />
                        </span>
                                            <span className="media-body block m-b-none">
                          Use awesome animate.css<br />
                          <small className="text-muted">10 minutes ago</small>
                        </span>
                                        </a>
                                        <a href className="media list-group-item">
                        <span className="media-body block m-b-none">
                          1.0 initial released<br />
                          <small className="text-muted">1 hour ago</small>
                        </span>
                                        </a>
                                    </div>
                                    <div className="panel-footer text-sm">
                                        <a href className="pull-right"><i className="fa fa-cog" /></a>
                                        <a href="#notes" data-toggle="class:show animated fadeInRight">See all the notifications</a>
                                    </div>
                                </div>
                            </div>
                            {/* / dropdown */}
                        </li>
                        <li className="dropdown margin-right-25">
                            <a href="#" data-toggle="dropdown" className="dropdown-toggle clear">
                                <span className="hidden-sm hidden-md">Tejas</span>
                                <b className="caret" />
                            </a>
                            {/* dropdown */}
                            <ul className="dropdown-menu animated fadeInRight w">
                                <li>
                                    <a href="/patient/viewReports">
                                        <span>View Patient Reports</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/patient/message">
                                        <span>Message</span>
                                    </a>
                                </li>
                                <li className="divider" />
                                <li>
                                    <a href="/logout">Logout</a>
                                </li>
                            </ul>
                            {/* / dropdown */}
                        </li>
                    </ul>
                    {/* / navbar right */}
                </div>

            </Row>

        );
    }
}

export default HeaderRightPatient