import React, { Component } from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { Col, Row, clearfix, Button, FormControl } from 'react-bootstrap';
import Autocomplete from 'react-predictive-input';

import Header from '../header.components.jsx';
import HeaderRightLab from './HeaderRightLab.components.jsx';

class modifyPatient extends Component {
    constructor(props) {
        super(props);
        document.title = "Add Reports | Labs Anywhere";
        this.state = {
            items: [],
            patients: [],
            tests: [],
            TestError: false,
            Value: '',
            AcceptedValue: '',
            Level: '',
            DoctorName: '',
            Diagnosis: 'Patient suffering migrane',
            DiagnosisError: false,
            Test: '',
            Comments: 'Vitals are normal',
            patName:'Tejas Karelia',
            patid:'591a367cd080e313fc5951b1',
            docName:'Reena Nair',
            docId:'591a384a0b89d731bca155f8',
            testName:'CBC',
            testId:'591a5e9b90798d09186851cb',
            reportParameter:'haemoglobin',
            testDate:'20150514T13:45:23.345Z',
            reportResult:'52',
            acceptableValue:'50',
            status:'Normal'
        };
    }
    changeDiagnosis(e) {
        this.setState({
            Diagnosis: e.target.value
        });
    }
    onChangeTest(e) {
        this.setState({
            Test: e.target.value
        });
    }
    patName(e) {
        this.setState({
            patName: e.target.value,
            patId: e.target.key
        });
    }
    modifyPatient(){
        if (!this.state.Test) {
            this.setState({ TestError: true});
            e.preventDefault();
            return false;
        };
        const reportObjFinal = {};
        const lab = {};
        lab.name = "Ranbaxy";
        const patientObj = {};
        (this.state.patName) ? patientObj.name = this.state.patName : null;

        (this.state.patid) ? patientObj.id = this.state.patid : null;

        const doctorObj = {};
        (this.state.docName) ? doctorObj.name = this.state.docName : null;

        (this.state.docId) ? doctorObj.id = this.state.docId: null;

        const testObj = {};
        (this.state.testName) ? testObj.name = this.state.testName: null;

        (this.state.testId) ? testObj.id = this.state.testId: null;

        const report= [];
        const reportObj = {};
        (this.state.reportParameter) ? reportObj.parameter = this.state.reportParameter: null;
        (this.state.reportResult) ? reportObj.result = this.state.reportResult: null;
        (this.state.acceptableValue) ? reportObj.acceptableValue = this.state.acceptableValue: null;
        (this.state.status) ? reportObj.status = this.state.status: null;
        report.push(reportObj);


        (this.state.Comments) ? reportObj.testSummary = this.state.Comments: null;
        reportObjFinal.lab = lab;
        reportObjFinal.patient = patientObj;
        reportObjFinal.doctor = doctorObj;
        (this.state.Diagnosis) ? reportObjFinal.diagnosis = this.state.Diagnosis: null;
        reportObjFinal.test = testObj;
        (this.state.testDate) ? reportObj.testDate = this.state.testDate: null;
        reportObjFinal.report = reportObj;
        (this.state.Comments) ? reportObj.testSummary = this.state.Comments: null;

        $.ajax({
            url: "/api/v1/labs/591a35be22261e30a85de560/test-reports",
            type: "POST",
            data: reportObj,
            dataType: 'json',
            cache: false,
            contentType: 'application/json',
            success: function(data)
            {

            },
            error: function (request, status, error) {

                console.log(error);
            }
        });
        return true;
    }
    showError(){
        if (this.state.DiagnosisError) {
            return (
                <div>
                    No Diagnosis provided
                </div>
            );
        }
    }
    componentDidMount(){
        fetch('/api/v1/patients')
            .then(patient=>patient.json())
            .then(patients=>this.setState({patients})),
            fetch('/api/v1/tests')
                .then(tes=>tes.json())
                .then(tests=>this.setState({tests}))
    }
    printTest(){
        const testArray = [];
        this.state.tests.map(item=> {
            testArray.push(<option value={item._id}>{item.name}</option>)
        })

        return testArray;
    }
    getPatientName(){
        const newPat = [];
        const id = this.props.params.id;
        const pat = this.state.patients.map(pat => {
            if(pat._id == id) {
                newPat.push(<input type="text" className="form-control" value={pat.name} onChange={this.patName.bind(this)} key={pat._id} disabled />)
            }
        });
        return newPat;
    }
    render(){
        return (
            <div>
                <Header/>
                <HeaderRightLab/>
                {this.showError()}
                <div className="panel panel-default container">
                    <div className="panel-heading font-bold">Modify Patient</div>
                    <div className="panel-body">
                        <form onSubmit={this.modifyPatient.bind(this)} className="bs-example form-horizontal">
                            <div className="form-group">
                                <label className="col-lg-2 control-label">Name</label>
                                <div className="col-lg-10">
                                    {this.getPatientName()}
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label">Doctor's Name</label>
                                <div className="col-lg-10">
                                    <input type="text" className="form-control" placeholder="Doctor's Name" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label">Diagnosis</label>
                                <div className="col-lg-10">
                                    <input type="text" className="form-control" placeholder="Diagnosis" />
                                </div>
                            </div>


                            <div className="form-group">
                                <label className="col-lg-2 control-label">Test</label>
                                <div className="col-lg-10">
                                    <FormControl componentClass="select" placeholder="Test" ref="Test">
                                        <option>...</option>
                                        {this.printTest()}
                                    </FormControl>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label">Value</label>
                                <div className="col-lg-10">
                                    <input type="text" className="form-control" placeholder="Value" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label">Accepted Value</label>
                                <div className="col-lg-10">
                                    <input type="text" className="form-control" placeholder="Accepted Value" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label">Level</label>
                                <div className="col-lg-10">
                                <FormControl componentClass="select" placeholder="Level" ref="Level">
                                    <option value="">Level</option>
                                    <option value="High">High</option>
                                    <option value="Low">Low</option>
                                    <option value="Normal">Normal</option>
                                </FormControl>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label">Comments</label>
                                <div className="col-lg-10">
                                    <input type="text" className="form-control" placeholder="Comments" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-lg-offset-2 col-lg-10">
                                    <button type="submit" className="btn btn-sm btn-info">Add Report</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default modifyPatient