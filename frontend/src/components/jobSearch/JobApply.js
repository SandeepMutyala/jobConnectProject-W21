/* author Arpreet*/

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Navbar from './Navbar';
import 'react-tabs/style/react-tabs.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import TextField from '@mui/material/TextField';
import React, { Component ,  useState } from 'react';
import EducationTabb from './EducationTabb.js'
import ExperienceTabb from './ExperienceTabb.js'
import PersonalTabb from './PersonalTabb.js'
import '../../styles/JobApply.css'
import axios from 'axios';
import {useLocation} from 'react-router-dom';
import JobData from './Jobdata.js'
import Divider from '@mui/material/Divider';
import JobApplydata from './JobApplyData.js'

const JobApply = (props,{route}) => {

    const key1 = 1, key2 = 2, key3 = 3;

    const location = useLocation();
   // console.log("state");
   // console.log(location.state);
    //console.log(location.state.jobID);
    const jobID = location.state.jobID;

   

    return (
    <div >
        <Navbar>
        </Navbar>
        <br></br>
        <br></br>
        <div className='JobApplyBackground'>
        <br></br>
        <br></br>
        <h4 className="ApplicationHeading">Job Application</h4>
        
        <Divider />
        <JobApplydata 
                 jobid = {location.state.jobID}
                 compimage={location.state.compimage} 
                 jobtitle={location.state.jobtitle}
                 companyname={location.state.companyname}
                 dateposted={location.state.dateposted}
                jobdesc={location.state.jobdesc}
                companylocation={location.state.companylocation}></JobApplydata>
        
        <Tabs>
            <TabList className="TabStyle">
                <Tab>Personal Details</Tab>
                <Tab>Education Details</Tab>
                <Tab>Experience</Tab>
            </TabList>

            <TabPanel >
            <br></br>
            <br></br>
            <PersonalTabb jobID={jobID}></PersonalTabb>
            
            </TabPanel>
            <TabPanel>
            <br></br>
            <br></br>
            <EducationTabb jobID={jobID}></EducationTabb>
            </TabPanel>
            <TabPanel >
            <br></br>
            <br></br>
            <ExperienceTabb jobID={jobID}></ExperienceTabb>
            </TabPanel>
        </Tabs>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        </div>
 
    </div>);

}

export default JobApply;