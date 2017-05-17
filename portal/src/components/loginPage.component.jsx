import React, { Component } from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { Col, Row, clearfix, Button, FormControl } from 'react-bootstrap';

class loginPage extends Component {
    constructor(props){
        super(props);
        document.title = "Login | Labs Anywhere";
        this.state = {
            username: "",
            password: ""
        }
    }

    login(e) {
        e.preventDefault();
        $.ajax({
            url: "/api/v1/auth/login",
            type: "POST",
            data: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            }),
            cache: false,
            contentType: 'application/json',
            success: function(data)
            {
                browserHistory.pushState(null, 'admin/dashboard');
            },
            error: function (request, status, error) {
                console.log(error);
            }
        });
    }

    changeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    changePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    render(){
        return (
            <div>
                <div className="app app-header-fixed  ">
                    <div className="container w-xxl w-auto-xs">
                        <a href="#" className="navbar-brand block m-t">Labs Anywhere</a>
                        <div className="m-b-lg">
                            <form name="form" onSubmit={this.login.bind(this)} className="form-validation">
                                <div className="text-danger wrapper text-center">

                                </div>
                                <div className="list-group list-group-sm">
                                    <div className="list-group-item">
                                        <FormControl type="username" placeholder={'Username'} className="no-border" required
                                        onChange={this.changeUsername.bind(this)} value={this.state.username} />
                                    </div>
                                    <div className="list-group-item">
                                        <FormControl type="password" placeholder={'Password'} className="no-border" required
                                        onChange={this.changePassword.bind(this)} value={this.state.password}/>
                                    </div>
                                </div>
                                <Button type="submit" className="btn btn-lg btn-primary btn-block">Log in</Button>
                                <div className="text-center m-t m-b"><a href="/forgotPass">Forgot password?</a></div>
                                <div className="line line-dashed"></div>
                            </form>
                        </div>
                    </div>


                </div>
            </div>

        );
    }
}

export default loginPage
