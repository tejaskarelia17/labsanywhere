import React, { Component } from 'react';
import { render } from 'react-dom';
// Import routing components
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import Main from './common/main.component.jsx'

import loginPage from './components/loginPage.component.jsx'
import contactUs from './components/contactUs.component.jsx'
import aboutUs from './components/about.component.jsx'

import dashboardAdmin from './components/admin/dashboard.component.jsx'
import addDoctor from './components/admin/addDoctor.component.jsx'
import addLab from './components/admin/addLab.component.jsx'

import dashboardDoctor from './components/doctor/dashboardDoctor.component.jsx'
import viewReportsDoctor from './components/doctor/viewReportsDoctor.component.jsx'
import messagesDoctor from './components/doctor/messageDoctor.component.jsx'

import dashboardPatient from './components/patient/dashboardPatient.component.jsx'
import viewReportsPatient from './components/patient/viewReportsPatient.component.jsx'
import messagesPatient from './components/patient/messagePatient.component.jsx'

import dashboardLab from './components/lab/dashboardLab.component.jsx'
import messagesLab from './components/lab/messageLab.component.jsx'
import profileLab from './components/lab/profileLab.component.jsx'
import addPatient from './components/lab/addPatient.component.jsx'
import modifyPatient from './components/lab/modifyPatient.component.jsx'

render(
    <Router history={browserHistory}>
        <Route component={Main}>
            <Route path="/login" component={loginPage}/>
            <Route path="/contactUs" component={contactUs}/>
            <Route path="/aboutUs" component={aboutUs}/>


            <Route path="/admin/dashboard" component={dashboardAdmin}/>
            <Route path="/admin/addDoctor" component={addDoctor}/>
            <Route path="/admin/addLab" component={addLab}/>

            <Route path="/doctor/dashboard" component={dashboardDoctor}/>
            <Route path="/doctor/viewReports" component={viewReportsDoctor}/>
            <Route path="/doctor/message" component={messagesDoctor}/>

            <Route path="/patient/dashboard" component={dashboardPatient}/>
            <Route path="/patient/viewReports" component={viewReportsPatient}/>
            <Route path="/patient/message" component={messagesPatient}/>

            <Route path="/lab/dashboard" component={dashboardLab}/>
            <Route path="/lab/message" component={messagesLab}/>
            <Route path="/lab/profile" component={profileLab}/>
            <Route path="/lab/addPatient" component={addPatient}/>
            <Route path="/lab/modifyPatient/:id" component={modifyPatient}/>

        </Route>
    </Router>,
    document.getElementById('container')
);
