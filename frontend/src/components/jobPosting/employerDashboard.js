 /* Author Sai Sandeep Mutyala */
import React from 'react'
import {Card} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";
import "../jobPosting/employerDashboard.css"
import EmployerSideNav from './employerSideNav';

const EmployerDashboard = () => {
    const history = useHistory();
    const [jobPost, setJobPost] = useState([]);
        useEffect(() => {
        axios.get("/jobpost/displayjobpost")
        .then((response) => {
            setJobPost(response.data.jobList);
        })
    },[1]);
    const showJobPost = (id) =>{
        console.log(id)
        history.push({pathname: "/EditJobPost/"+id, state: id})
    }

  return (
    <div className='rows'>
        <div className='left'>
            <EmployerSideNav/>  
        </div>
        <div className='right'>
            <card className="completeCard" style={{backgroundColor: "none"}}>
                <div className='container-fluid'>
                    <h3 className='dashboard-heading'>Job Listings</h3>
                    <div>
                    { jobPost.map(fieldName => (
                        <div>
                            <div>
                                <Card.Body onClick={() => showJobPost(fieldName._id)} className='card individualCard'>
                                    <img className="logo" src={fieldName.companyLogoUrl} ></img>
                                    <div className='cardRow'>
                                        <p className='cardContent'><div className='cardColumn'>Job Title:</div> <div className='cardColumn'>{fieldName.jobTitle}</div> </p>
                                        <p className='cardContent'><div className='cardColumn'>Company name: </div><div className='cardColumn'>{fieldName.companyName}</div></p>
                                        <p className='cardContent'><div className='cardColumn'>Job Role Description: </div><div className='cardColumn'>{fieldName.jobShortDescription}</div></p>
                                        <p className='cardContent'><div className='cardColumn'>Hiring Count: </div><div className='cardColumn'>{fieldName.hiringCount}</div></p>
                                        <p className='cardContent'><div className='cardColumn'>Last date to apply:</div><div className='cardColumn'>{fieldName.lastDateToApply}</div></p>
                                    </div> 
                                </Card.Body>
                            </div> 
                        </div>
                    ))}
                    </div> 
                </div>
            </card>
        </div>
    </div>
  )
}

export default EmployerDashboard