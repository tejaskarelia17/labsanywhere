import React, { Component } from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { Col, Row, clearfix, Button, FormControl } from 'react-bootstrap';

import Header from '../header.components.jsx';
import HeaderRightAdmin from "../admin/HeaderRightAdmin.components.jsx";


class addLab extends Component {
    constructor(props){
        super(props);
        document.title = "Add Lab | Labs Anywhere";
        this.state={
            items:[],
            Name:'',
            NameError:false,
            Phone:'',
            PhoneError:false,
            Building:'',
            BuildingError:false,
            Street:'',
            StreetError:false,
            City:'',
            CityError:false,
            State:'',
            StateError:false,
            Zip:'',
            ZipError:false,
            CertName:'',
            CertNameError:false,
            CertIssuedBy:'',
            CertIssuedByError:false,
            CertIssuedDate:'',
            CertIssuedDateError:false
        };
    }
    changeName(e) {
        this.setState({
            Name: e.target.value
        });
    }
    changePhone(e) {
        this.setState({
            Phone: e.target.value
        });
    }
    changeBuilding(e) {
        this.setState({
            Building: e.target.value
        });
    }
    changeStreet(e) {
        this.setState({
            Street: e.target.value
        });
    }
    changeCity(e) {
        this.setState({
            City: e.target.value
        });
    }
    changeState(e) {
        this.setState({
            State: e.target.value
        });
    }
    changeZip(e) {
        this.setState({
            Zip: e.target.value
        });
    }
    changeCertName(e) {
        this.setState({
            CertName: e.target.value
        });
    }
    changeCertIssuedBy(e) {
        this.setState({
            CertIssuedBy: e.target.value
        });
    }
    changeCertIssuedDate(e) {
        this.setState({
            CertIssuedDate: e.target.value
        });
    }
    addLabs(e) {
        if (!this.state.Name) {
            this.setState({ NameError: true});
            e.preventDefault();
            return false;
        };
        if (!this.state.Phone) {
            this.setState({ NameError: false, PhoneError: true});
            e.preventDefault();
            return false;
        };
        if (!this.state.Building) {
            this.setState({ NameError: false, PhoneError: false, BuildingError: true});
            e.preventDefault();
            return false;
        };
        if (!this.state.Street) {
            this.setState({ NameError: false, PhoneError: false, BuildingError: false, StreetError: true});
            e.preventDefault();
            return false;
        };
        if (!this.state.City) {
            this.setState({ NameError: false, PhoneError: false, BuildingError: false, StreetError: false, CityError: true});
            e.preventDefault();
            return false;
        };
        if (!this.state.State) {
            this.setState({ NameError: false, PhoneError: false, BuildingError: false, StreetError: false, CityError: false, StateError: true});
            e.preventDefault();
            return false;
        };
        if (!this.state.Zip) {
            this.setState({ NameError: false, PhoneError: false, BuildingError: false, StreetError: false, CityError: false, StateError: false, ZipError: true});
            e.preventDefault();
            return false;
        };
        if (!this.state.CertName) {
            this.setState({ NameError: false, PhoneError: false, BuildingError: false, StreetError: false, CityError: false, StateError: false, ZipError: false, CertNameError: true});
            e.preventDefault();
            return false;
        };
        if (!this.state.CertIssuedBy) {
            this.setState({ NameError: false, PhoneError: false, BuildingError: false, StreetError: false, CityError: false, StateError: false, ZipError: false, CertNameError: false, CertIssuedByError: true});
            e.preventDefault();
            return false;
        };
        if (!this.state.CertIssuedDate) {
            this.setState({ NameError: false, PhoneError: false, BuildingError: false, StreetError: false, CityError: false, StateError: false, ZipError: false, CertNameError: false, CertIssuedByError: false, CertIssuedDateError: true});
            e.preventDefault();
            return false;
        };

        const labObj = {};
        (this.state.Name) ? labObj.name = this.state.Name : null;
        const certificate = [];
        let certificateObj = {};
        (this.state.CertName) ? certificateObj.name = this.state.CertName : null;
        (this.state.CertIssuedBy) ? certificateObj.issuedBy = this.state.CertIssuedBy : null;
        (this.state.CertIssuedDate) ? certificateObj.issuedOn = this.state.CertIssuedDate : null;
        certificate.push(certificateObj);
        labObj.certificates = certificate;
        const address = {};
        let addressObj = {};
        (this.state.Building) ? addressObj.building = this.state.Building : null;
        (this.state.Street) ? addressObj.street = this.state.Street : null;
        (this.state.City) ? addressObj.city = this.state.City : null;
        (this.state.State) ? addressObj.state = this.state.State : null;
        (this.state.Zip) ? addressObj.zip = this.state.Zip : null;
        labObj.address = addressObj;
        $.ajax({
            url: "/api/v1/labs",
            type: "POST",
            data: labObj,
            dataType: 'json',
            cache: false,
            success: function(data)
            {

            },
            error: function (request, status, error) {

                console.log(error);
            }
        });
        return true;

    }
    showError() {
        if (this.state.NameError) {
            return (
                <div>
                    No NameError
                </div>
            );
        }
        if (this.state.PhoneError) {
            return (
                <div>
                    No PhoneError
                </div>
            );
        }
        if (this.state.BuildingError) {
            return (
                <div>
                    No BuildingError
                </div>
            );
        }
        if (this.state.StreetError) {
            return (
                <div>
                    No Street
                </div>
            );
        }
        if (this.state.CityError) {
            return (
                <div>
                    No CityError
                </div>
            );
        }
        if (this.state.StateError) {
            return (
                <div>
                    No StateError
                </div>
            );
        }
        if (this.state.ZipError) {
            return (
                <div>
                    No ZipError
                </div>
            );
        }
        if (this.state.CertNameError) {
            return (
                <div>
                    No CertNameError
                </div>
            );
        }
        if (this.state.CertIssuedDateError) {
            return (
                <div>
                    No CertIssuedDate
                </div>
            );
        }
        if (this.state.CertIssuedByError) {
            return (
                <div>
                    No CertIssuedBy
                </div>
            );
        }

    }
    componentDidMount(){
        fetch('api/v1/labs')
            .then(result=>result.json())
            .then(items=>{
                this.setState({items})
            });

    }
    printLab(){
        const labArray = [];
        this.state.items.map(item=> {
            labArray.push(<tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.certificates[0].name}</td>
                <td>{item.certificates[0].issuedBy}</td>
                <td><button>Modify</button></td>
            </tr>)
        })
        return labArray;
    }
    render(){
        return (
            <div>
                <Header/>
                <HeaderRightAdmin/>
                <br/>
                {this.showError()}
                <div className="container list-group-item">
                    <h1>Add Lab</h1>
                    <form onSubmit={this.addLabs.bind(this)} className="list-group list-group-sm">
                        <Row>
                        <Col md={6} sm={6} xs={12} className="list-group-item">
                            <label hidden>Laboratory Name</label>
                            <FormControl type="text" onChange={this.changeName.bind(this)}
                                         value={this.state.Name} placeholder={'Laboratory Name'} className="no-border"  />
                        </Col>
                        <Col md={6} sm={6} xs={12} className="list-group-item">
                            <label hidden>Contact</label>
                            <FormControl type="text" onChange={this.changePhone.bind(this)}
                                         value={this.state.Phone} placeholder={'Contact'} className="no-border"  />
                        </Col>
                        </Row>
                        <Row>
                            <Col md={6} sm={6} xs={12} className="list-group-item">
                                <label hidden>Building</label>
                                <FormControl type="text" onChange={this.changeBuilding.bind(this)}
                                             value={this.state.Building} placeholder={'Building'} className="no-border"  />
                            </Col>
                            <Col md={6} sm={6} xs={12} className="list-group-item">
                                <label hidden>Street</label>
                                <FormControl type="text" onChange={this.changeStreet.bind(this)}
                                             value={this.state.Street} placeholder={'Street'} className="no-border"  />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4} sm={4} xs={12} className="list-group-item">
                                <label hidden>City</label>
                                <FormControl type="text" onChange={this.changeCity.bind(this)}
                                             value={this.state.City} placeholder={'City'} className="no-border"  />
                            </Col>
                            <Col md={4} sm={4} xs={12} className="list-group-item">
                                <label hidden>State</label>
                                <FormControl type="text" onChange={this.changeState.bind(this)}
                                             value={this.state.State} placeholder={'State'} className="no-border"  />
                            </Col>
                            <Col md={4} sm={4} xs={12} className="list-group-item">
                                <label hidden>Zip Code</label>
                                <FormControl type="text" onChange={this.changeZip.bind(this)}
                                             value={this.state.Zip} placeholder={'Zip Code'} className="no-border"  />
                            </Col>
                        </Row>
                        <div id="content">
                            <div className="app-content-body ">
                                <div className="wrapper-md">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            Certificate Details
                                        </div>
                                        <Col xs={12} sm={12} md={12}>
                                            <Col md={12} sm={12} xs={12} className="list-group-item">
                                                <label hidden>Name</label>
                                                <FormControl type="text" onChange={this.changeCertName.bind(this)}
                                                             value={this.state.CertName} placeholder={'Name'} className="no-border"  />
                                            </Col>
                                        </Col>
                                        <Col xs={12} sm={12} md={12}>
                                            <Col md={6} sm={6} xs={12} className="list-group-item">
                                                <label hidden>Issued By</label>
                                                <FormControl type="text"onChange={this.changeCertIssuedBy.bind(this)}
                                                             value={this.state.CertIssuedBy} placeholder={'Issued By'} className="no-border"  />
                                            </Col>
                                            <Col md={2} sm={2} xs={12} className="list-group-item">
                                                <label>Issued On</label>
                                            </Col>
                                            <Col md={4} sm={4} xs={12} className="list-group-item">
                                                <label hidden>Issued On</label>
                                                <FormControl type="date" onChange={this.changeCertIssuedDate.bind(this)}
                                                             value={this.state.CertIssuedDate} placeholder={'Issued On'} className="no-border"  />
                                            </Col>
                                        </Col>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Col md={6} sm={6} xs={12}>
                            <Button vertical block bsStyle="primary" type="submit">Add</Button>
                        </Col>
                        <Col md={6} sm={6} xs={12}>
                            <Button vertical block bsStyle="primary" type="reset">Reset</Button>
                        </Col>
                    </form>
                </div>
                <div id="content" role="main">
                    <div className="app-content-body ">
                        <div className="wrapper-md">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    List of Labs
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-striped m-b-none">
                                        <thead>
                                        <tr>
                                            <th style={{width: '25%'}}>Name</th>
                                            <th style={{width: '25%'}}>Certificate Name</th>
                                            <th style={{width: '25%'}}>Certificate Issued By</th>
                                            <th style={{width: '25%'}}>Modify</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.printLab()}
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

export default addLab