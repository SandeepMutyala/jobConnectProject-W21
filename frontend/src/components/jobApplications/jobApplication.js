 /* Author Sai Sandeep Mutyala, Arpreet Singh Arora */
 import React from 'react'
 import {Button, Card} from 'react-bootstrap';
 import { useEffect, useState } from 'react';
 import axios from "axios";
 import { useHistory, useLocation } from "react-router-dom";
 import "../jobPosting/employerDashboard.css"
 import EmployerSideNav from '../jobPosting/employerSideNav';
 import {useSelector} from "react-redux";
 
 const JobApplications = () => {
    const {user} = useSelector(
        (state) => state.auth
      );
      console.log(user);

      const location = useLocation();
      const jobID = location.state;
    const history = useHistory();
    const [jobApplication, setJobApplication] = useState([]);
        useEffect(() => {
        // to fetch all the job posts posted by that particular employer
        axios.get("/jobapplication/displayjobapplications/" + jobID)
        .then((response) => {
            console.log(response)
            setJobApplication(response.data.userDetails);
        })
    },[1]);
    
    const handleApprove = e => {
        alert('Sent email notification to job seeker!')
      }

    const handleReject = e => {
    alert('Sent notification to user regarding rejection.')
    }

    const handleMoreData = (userID) => {

        history.push({pathname: "/userJobDetails", state: {userID : userID, jobID : jobID}})
    }
      
    

  return (
    <div className='rows'>
        <div className='left'>
            <EmployerSideNav/>  
        </div>
        <div className='right'>
            <card className="completeCard" style={{backgroundColor: "none"}}>
                <div className='container-fluid'>
                    <h3 className='dashboard-heading'>Job Applications</h3>
                    <div>
                    { jobApplication.map(fieldName => (
                        <div>
                            <div>
                                <Card.Body className='employercard singleCard'>
                                    <div>
                                        <h6>Application</h6>
                                    </div>
                                    <div className='cardRow'>
                                        <p className='cardContent'><div className='cardColumn'>First Name:</div> <div className='cardColumn'>{fieldName.FirstName}</div> </p>
                                        <p className='cardContent'><div className='cardColumn'>Last Name: </div><div className='cardColumn'>{fieldName.LastName}</div></p>
                                        <p className='cardContent'><div className='cardColumn'>Email: </div><div className='cardColumn'>{fieldName.Email}</div></p>
                                        <p className='cardContent'><div className='cardColumn'>Phone Number:</div><div className='cardColumn'>{fieldName.PhoneNumber}</div></p>
                                        <p className='cardContent'><div className='cardColumn'>Education type:</div><div className='cardColumn'>{fieldName.EducationType}</div></p>
                                        <p className='cardContent'><div className='cardColumn'>Institute Name </div><div className='cardColumn'>{fieldName.InstituteName}</div></p>
                                        <p className='cardContent'><div className='cardColumn'>Work Experience: </div><div className='cardColumn'>{fieldName.ExpereinceYears}</div></p>
                                        <p className='cardContent'><div className='cardColumn'>Current Company:</div><div className='cardColumn'>{fieldName.CurrentCompany}</div></p>
                                    </div> 
                                    <br/>
                                    <div className="buttontab">
                                        <Button className='approvebutton' type='submit'  variant="primary" size="sm" onClick={ handleApprove }>Approve</Button>
                                        <Button className='rejectbutton' type='submit'  variant="primary" size="sm" onClick={ handleReject }>Reject</Button>
                                        <Button className='databutton' type='submit'  variant="primary" size="sm" onClick={() => handleMoreData(fieldName.userID)}>View more Data</Button>
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
 
 export default JobApplications