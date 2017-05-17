import React, { Component } from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { Col, Row, clearfix, Button, FormControl } from 'react-bootstrap';

class message extends Component {
    constructor(props){
        super(props);
        document.title = "About Us | Labs Anywhere";
    }
    render(){
        return (
            <div>
                <h5 className="font-bold">Recent Posts</h5>
                <div>
                    <div>
                        <a className="pull-left thumb thumb-wrapper m-r">
                            <img src="img/b0.jpg" />
                        </a>
                        <div className="clear">
                            <a href className="font-semibold text-ellipsis">Bootstrap 3: What you need to know</a>
                            <div className="text-xs block m-t-xs"><a href>Travel</a> 2 minutes ago</div>
                        </div>
                    </div>
                    <div className="line" />
                    <div>
                        <a className="pull-left thumb thumb-wrapper m-r">
                            <img src="img/b1.jpg" />
                        </a>
                        <div className="clear">
                            <a href className="font-semibold text-ellipsis">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</a>
                            <div className="text-xs block m-t-xs"><a href>Design</a> 2 hours ago</div>
                        </div>
                    </div>
                </div>
                <h4 className="m-t-lg m-b">Leave a comment</h4>
                <form>
                    <div className="form-group pull-in clearfix">
                        <div className="col-sm-6">
                            <label>Your name</label>
                            <input type="text" className="form-control" placeholder="Name" />
                        </div>
                        <div className="col-sm-6">
                            <label>Email</label>
                            <input type="email" className="form-control" placeholder="Enter email" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Comment</label>
                        <textarea className="form-control" rows={5} placeholder="Type your comment" defaultValue={""} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-success">Submit comment</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default message