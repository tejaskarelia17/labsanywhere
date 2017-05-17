import React, { Component } from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { Col, Row, clearfix, Button, FormControl } from 'react-bootstrap';

import Header from '../header.components.jsx';
import HeaderRightAdmin from "../admin/HeaderRightAdmin.components.jsx";


class addDoctor extends Component {
    constructor(props){
        super(props);
        document.title = "Add Doc | Labs Anywhere";
        this.state={
        items:[],
        Name:'',
        NameError:false,
        Phone:'',
        PhoneError:false,
        Designation:'',
        DesignationError:false,
        Type:'',
        TypeError:false
        };
    }
    changeName(e) {
        this.setState({
            Name: e.target.value
        });
    }
    changeDesignation(e) {
        this.setState({
            Designation: e.target.value
        });
    }
    changePhone(e) {
        this.setState({
            Phone: e.target.value
        });
    }
    changeType(e) {
        this.setState({
            Type: e.target.value
          });
        }
        addDoctors(e) {
        if (!this.state.Name) {
            this.setState({ NameError: true});
            e.preventDefault();
            return false;
        };
        if (!this.state.Designation) {
            this.setState({ NameError: false, DesignationError: true});
            e.preventDefault();
            return false;
        };
        if (!this.state.Type) {
            this.setState({ NameError: false, DesignationError: false, PhoneError: false, TypeError: true});
            e.preventDefault();
            return false;
        };
        if (!this.state.Phone) {
                this.setState({ NameError: false, DesignationError: false, PhoneError: true});
                e.preventDefault();
                return false;
        };

        const doctorObj = {};
        (this.state.Name) ? doctorObj.name = this.state.Name : null;
        (this.state.Designation) ? doctorObj.designation = this.state.Designation : null;
        const contact = [];
        let contactObj = {};
        (this.state.Phone) ? contactObj.value = this.state.Phone : null;
        (this.state.Type) ? contactObj.type = this.state.Type : null;
        contact.push(contactObj);
        doctorObj.contact = contact;
        $.ajax({
            url: "/api/v1/doctors",
            type: "POST",
            data: doctorObj,
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
                    No Name
                </div>
            );
        }
        if (this.state.DesignationError) {
            return (
                <div>
                    No Designation
                </div>
            );
        }
        if (this.state.TypeError) {
            return (
                <div>
                    No Type Selected
                </div>
            );
        }
        if (this.state.PhoneError) {
            return (
                <div>
                    No Phone provided
                </div>
            );
        }
    }
  componentDidMount(){
    fetch('api/v1/doctors')
    .then(result=>result.json())
    .then(items=>{
        this.setState({items})
    });

  }
  printDoc(){
      const docArray = [];
      this.state.items.map(item=> {
          docArray.push(<tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.designation}</td>
              <td>{item.contact[0].value}</td>
              <td><button>Modify</button></td>
          </tr>)
      })
      return docArray;
  }
    render(){
        return (
            <div>
                <Header/>
                <HeaderRightAdmin/>
                {this.showError()}
                    <div className="panel panel-default container">
                        <div className="panel-heading font-bold">Add Doctor</div>
                        <div className="panel-body">
                          <form onSubmit={this.addDoctors.bind(this)} className="bs-example form-horizontal">
                            <div className="form-group">
                              <label className="col-lg-2 control-label">Name</label>
                              <div className="col-lg-10">
                                <FormControl type="text" ref="Name" placeholder={'Name'}
                                onChange={this.changeName.bind(this)}
                                value={this.state.Name} className="no-border"  />
                              </div>
                            </div>
                            <div className="form-group">
                              <label className="col-lg-2 control-label">Designation</label>
                              <div className="col-lg-10">
                                <FormControl type="text" ref="Designation" placeholder={'Designation'} onChange={this.changeDesignation.bind(this)}
                                value={this.state.Designation} className="no-border"  />
                              </div>
                            </div>
                            <div className="form-group">
                              <label className="col-lg-2 control-label">Contact</label>
                              <div className="col-lg-10">
                                <FormControl componentClass="select" placeholder="Type" onChange={this.changeType.bind(this)}
                                value={this.state.Type} ref="Type">
                                    <option value="">Type</option>
                                    <option value="Primary">Primary</option>
                                    <option value="Home">Home</option>
                                    <option value="Work">Work</option>
                                </FormControl>
                              </div>
                            </div>
                            <div className="form-group">
                              <label className="col-lg-2 control-label">Phone</label>
                              <div className="col-lg-10">
                                <FormControl type="phone" ref="Phone" placeholder={'Phone'} onChange={this.changePhone.bind(this)}
                                value={this.state.Phone} className="no-border" />
                              </div>
                            </div>
                            <div className="form-group">
                              <div className="col-lg-offset-2 col-lg-10">
                                <Button type="submit" className="btn btn-sm btn-info">Add</Button>
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
                                    List of Doctors
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-striped m-b-none">
                                        <thead>
                                        <tr>
                                            <th style={{width: '25%'}}>Doctor Name</th>
                                            <th style={{width: '25%'}}>Designation</th>
                                            <th style={{width: '25%'}}>Contact</th>
                                            <th style={{width: '25%'}}>Modify</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {this.printDoc()}
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

export default addDoctor