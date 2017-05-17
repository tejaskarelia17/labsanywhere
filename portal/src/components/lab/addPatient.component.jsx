import React, { Component } from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { Col, Row, clearfix, Button, FormControl } from 'react-bootstrap';
import Autocomplete from 'react-predictive-input';

import Header from '../header.components.jsx';
import HeaderRightLab from './HeaderRightLab.components.jsx';

class addPatient extends Component {
    constructor(props){
        super(props);
        document.title = "Add Patient | Labs Anywhere";
        this.state={
            items:[],
            Name:'',
            NameError:false,
            SSN:'',
            Phone:'',
            PhoneError:false,
        };
    }
    onChangeName(e) {
        this.setState({
            Name: e.target.value
        });
    }
    onChangeSSN(e) {
        this.setState({
            SSN: e.target.value
        });
    }
    onChangePhone(e) {
        this.setState({
            Phone: e.target.value
        });
    }
    addPatient(e) {
        if (!this.state.Name) {
            this.setState({ NameError: true});
            e.preventDefault();
            return false;
        };
        if (!this.state.Phone) {
            this.setState({ NameError:false, PhoneError: true});
            e.preventDefault();
            return false;
        };
        const patientObj = {};
        (this.state.Name) ? patientObj.name = this.state.Name : null;
        (this.state.SSN) ? patientObj.ssn = this.state.SSN : null;
        (this.state.Phone) ? patientObj.number = this.state.Phone : null;

        $.ajax({
            url: "/api/v1/patients",
            type: "POST",
            data: patientObj,
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
                    No Name Provided!
                </div>
            );
        }
        if (this.state.PhoneError) {
            return (
                <div>
                    No Phone Provided!
                </div>
            );
        }
    }
    componentDidMount(){
        fetch('api/v1/patients')
            .then(result=>result.json())
            .then(items=>{
                this.setState({items})
            });

    }
    printPatient(){
        const patientArray = [];
        this.state.items.map(item=> {

            patientArray.push(<tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.ssn}</td>
                <td>{item.number}</td>
                <td><a href={"/lab/modifyPatient/"+item._id}>Modify</a></td>
            </tr>)
        })
        return patientArray;
    }
    render(){
        return (
            <div>
                <Header/>
                <HeaderRightLab/>
                {this.showError()}
                <div className="panel panel-default">
                    <div className="panel-heading font-bold">Add Patient</div>
                    <div className="panel-body">
                        <form onSubmit={this.addPatient.bind(this)}  className="bs-example form-horizontal">
                            <div className="form-group">
                                <label className="col-lg-2 control-label">Name</label>
                                <div className="col-lg-10">
                                    <input type="text" className="form-control" ref="Name"
                                           onChange={this.onChangeName.bind(this)}
                                           value={this.state.Name}
                                           placeholder="Enter Name"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label">SSN Number</label>
                                <div className="col-lg-10">
                                    <input
                                        className="form-control"
                                        id="tests"
                                        ref="SSN" onChange={this.onChangeSSN.bind(this)} value={this.state.SSN}
                                        placeholder="SSN Number"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label">Phone Number</label>
                                <div className="col-lg-10">
                                    <input ref="Phone" type="number" onChange={this.onChangePhone.bind(this)} value={this.state.Phone} className="form-control" placeholder="Phone Number" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-lg-offset-2 col-lg-10">
                                    <button type="submit" className="btn btn-sm btn-info">Add Patient</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div id="content" role="main">
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
                                            <th style={{width: '33%'}}>Name</th>
                                            <th style={{width: '33%'}}>SSN</th>
                                            <th style={{width: '33%'}}>Contact</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {this.printPatient()}
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

export default addPatient