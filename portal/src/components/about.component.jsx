import React, { Component } from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { Thumbnail, Grid, Col, Row, clearfix, Button, FormControl } from 'react-bootstrap';

import Header from './header.components.jsx';


class aboutUs extends Component {
    constructor(props){
        super(props);
        document.title = "About Us | Labs Anywhere";
        this.state={
        doctors:[],
        tests:[]
        };
    }
    componentDidMount(){
        fetch('/api/v1/doctors') 
          .then(doc=>doc.json())
          .then(doctors=>this.setState({doctors})),
        fetch('/api/v1/tests') 
          .then(tes=>tes.json())
          .then(tests=>this.setState({tests}))
    }
    render(){
        return (
            <div>
                <Header/>
                
                <ul>
                {this.state.doctors.map(doctor=><li key={doctor.id}>{doctor.name}</li>)}
                </ul>
                <ul>
                {this.state.tests.map(test=><li key={test.id}>{test.name}</li>)}
                </ul>
                <p className="container" style={{textAlign: "center"}}>Labs Anywhere is a web based electronic pathology which will connect Doctors, Labs and Patients all over the country.<br/> We provide a quick solution which makes healthcare much more efficient. Our main aim is to allow our users to gain access to Lab reports and connect with each other easily through any electronic device connected to the web.</p>
                <Grid>
                    <Row>
                    <Col xs={6} md={4}>
                      <Thumbnail src="../img/test.jpg" alt="Image showing Test tubes">
                        <h3 style={{textAlign: "center"}}>TESTS</h3>
                        <p style={{textAlign: "center"}}>People get access to various tests like CBC, BSF, Widal, etc..</p>
                      </Thumbnail>
                    </Col>
                    <Col xs={6} md={4}>
                      <Thumbnail src="../img/lab.jpg" alt="Image of two doctors doing some tests">
                        <h3 style={{textAlign: "center"}}>LABORATORIES</h3>
                        <p style={{textAlign: "center"}}>The medium to provide services of ace labortaories at a single locations. Helps you connect and get reports online.</p>
                      </Thumbnail>
                    </Col>
                    <Col xs={6} md={4}>
                      <Thumbnail src="../img/docter.jpg" alt="Image showing a doctor checking a patient">
                        <h3 style={{textAlign: "center"}}>DOCTORS</h3>
                        <p style={{textAlign: "center"}}>Helps you connect easily with your doctors and provides them with your latest reports.</p>
                      </Thumbnail>
                    </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default aboutUs