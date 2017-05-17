import React, { Component } from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { Col, Row, clearfix, Button, FormControl } from 'react-bootstrap';

import Header from '../header.components.jsx';
import HeaderRightDoctor from './HeaderRightDoctor.components.jsx';

class viewReportsDoctor extends Component {
    constructor(props){
        super(props);
        document.title = "Display Report | Labs Anywhere";
        this.state = { items: [] };
    }
    print(){
        window.print();
    }
    componentDidMount(){
        // fetch('/api/v1/labs/591a35be22261e30a85de561/test-reports/591b251018fc950824039d66')
        //     .then(result=>result.json())
        //     .then(items=>{
        //         debugger;
        //         this.setState({items})
        //     });
        fetch('/api/v1/labs/591a35be22261e30a85de561/test-reports/591b251018fc950824039d66')
            .then(result=>result.json())
            .then(items=>this.setState({items}))

    }
    render(){
        return (
            <div>
                <div className="hidden-print">
                <Header className="hidden-print"></Header>
                <HeaderRightDoctor className="hidden-print"></HeaderRightDoctor>
                <div className="hidden-print" id="content" role="main">
                    <div className="app-content-body ">
                        <div className="wrapper-md">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    List of Patients
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-striped m-b-none">
                                        <thead>
                                        <tr>
                                            <th style={{width: '50%',textAlign:'center'}}>Patient Name</th>
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
                <div className="bg-light lter b-b wrapper-md hidden-print">
                    <a href className="btn btn-sm btn-info pull-right" onClick={this.print}>Print</a>
                    <h1 className="m-n font-thin h3">Invoice</h1>
                </div>
                <div className="wrapper-md">
                    <div>
                        <i className="fa fa-apple fa fa-3x" />
                        <div className="row">
                            <div className="col-xs-6">
                                <h4>Apple Inc.</h4>
                                <p><a href="http://www.apple.com">www.apple.com</a></p>
                                <p>1 Infinite Loop <br />
                                    95014 Cuperino, CA<br />
                                    United States
                                </p>
                                <p>
                                    Telephone:  800-692-7753<br />
                                    Fax:  800-692-7753
                                </p>
                            </div>
                            <div className="col-xs-6 text-right">
                                <p className="h4">#9048392</p>
                                <h5>29th Mar 2013</h5>
                            </div>
                        </div>
                        <div className="well m-t bg-light lt">
                            <div className="row">
                                <div className="col-xs-6">
                                    <strong>TO:</strong>
                                    <h4>John Smith</h4>
                                    <p>
                                        2nd Floor<br />
                                        St John Street, Aberdeenshire 2541<br />
                                        United Kingdom<br />
                                        Phone: 031-432-678<br />
                                        Email: youemail@gmail.com<br />
                                    </p>
                                </div>
                                <div className="col-xs-6">
                                    <strong>SHIP TO:</strong>
                                    <h4>John Smith</h4>
                                    <p>
                                        2nd Floor<br />
                                        St John Street, Aberdeenshire 2541<br />
                                        United Kingdom<br />
                                        Phone: 031-432-678<br />
                                        Email: youemail@gmail.com<br />
                                    </p>
                                </div>
                            </div>
                        </div>
                        <p className="m-t m-b">Order date: <strong>26th Mar 2013</strong><br />
                            Order status: <span className="label bg-success">Shipped</span><br />
                            Order ID: <strong>#9399034</strong>
                        </p>
                        <div className="line" />
                        <table className="table table-striped bg-white b-a">
                            <thead>
                            <tr>
                                <th style={{width: 60}}>QTY</th>
                                <th>DESCRIPTION</th>
                                <th style={{width: 140}}>UNIT PRICE</th>
                                <th style={{width: 90}}>TOTAL</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>iPhone 5 32GB White &amp; Silver (GSM) Unlocked</td>
                                <td>$749.00</td>
                                <td>$749.00</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>iPad mini with Wi-Fi 32GB - White &amp; Silver</td>
                                <td>$429.00</td>
                                <td>$858.00</td>
                            </tr>
                            <tr>
                                <td colSpan={3} className="text-right"><strong>Subtotal</strong></td>
                                <td>$1607.00</td>
                            </tr>
                            <tr>
                                <td colSpan={3} className="text-right no-border"><strong>Shipping</strong></td>
                                <td>$0.00</td>
                            </tr>
                            <tr>
                                <td colSpan={3} className="text-right no-border"><strong>VAT Included in Total</strong></td>
                                <td>$0.00</td>
                            </tr>
                            <tr>
                                <td colSpan={3} className="text-right no-border"><strong>Total</strong></td>
                                <td><strong>$1607.00</strong></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div id="content" role="main">
                    <div className="app-content-body ">
                        <div className="wrapper-md">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    List of Doctors
                                </div>
                                <div className="table-responsive">

                                        <ul>
                                            {this.state.items.map(item=><li key={item._id}>{item.testSummary}</li>)}
                                        </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default viewReportsDoctor