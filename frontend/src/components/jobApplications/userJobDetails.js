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
      const userID = location.state.userID;
      const jobID = location.state.jobID;
    const history = useHistory();
    const [userPersonalDetails, setuserPersonalDetails] = useState({
            FirstName : "",
            LastName : "",
            Email : "",
            PhoneNumber : "",
            EducationType : "",
            InstituteName: "",
            ExpereinceYears: 0,
            CurrentCompany : "",
    });
    const [userEducationDetails, setuserEducationDetails] = useState([{
        EducationType: "",
        InstituteName: "",
        InstituteLocation : "",
        EducationField : "",
        StartingYear : "",
        CompletionYear : "",
        PercentageAchieved: 0
    }])
    const [userExperienceDetails, setuserExperienceDetails] = useState([{
        CompanyName: "",
        CompanyLocation: "",
        ExperienceField : "",
        DateofJoining : "",
        DateofLeaving : "",
        LeavingReason : "",
        ExpereinceYears: 0,
        ExpereinceDetails: ""
    }])
        useEffect(() => {
            console.log("inside useeffect")
        // to fetch all the job posts posted by that particular employer
        axios.get("/jobapplication/userPersonalDetails/" + userID + "/" + jobID)
        .then((response) => {
            //console.log(response.data.allUserPersonalDetails);
            //console.log(typeof(response.data.allUserPersonalDetails));
            setuserPersonalDetails(response.data.allUserPersonalDetails);
        })

        axios.get("/jobapplication/userEducationDetails/" + userID + "/" + jobID)
        .then((response) => {
            //console.log(response)
            setuserEducationDetails(response.data.allUserEducationDetails);
        })

        axios.get("/jobapplication/userExperienceDetails/" + userID + "/" + jobID)
        .then((response) => {
            //console.log(response)
            setuserExperienceDetails(response.data.allUserExperienceDetails);
        })
    },[1]);
    
    const handleApprove = e => {
        alert('Sent email notification to job seeker!')
      }

    const handleReject = e => {
    alert('Sent notification to user regarding rejection.')
    }

      
    

  return (
    <div className='rows'>
        <div className='left'>
            <EmployerSideNav/>  
        </div>
        <div className='right'>
            <card className="completeCard" style={{backgroundColor: "none"}}>
                <div className='container-fluid'>
                    <h3 className='dashboard-heading'>User Details</h3>
                    <div>
                    <Card.Body className='employercard singleCard'>
                        <div>
                            <h6>Personal Details</h6>
                                </div>
                                <div className='cardRow'>
                                        <p className='cardContent'><div className='cardColumn'>First Name:</div> <div className='cardColumn'>{userPersonalDetails.FirstName}</div> </p>
                                        <p className='cardContent'><div className='cardColumn'>Last Name: </div><div className='cardColumn'>{userPersonalDetails.LastName}</div></p>
                                        <p className='cardContent'><div className='cardColumn'>Email: </div><div className='cardColumn'>{userPersonalDetails.Email}</div></p>
                                        <p className='cardContent'><div className='cardColumn'>Phone Number:</div><div className='cardColumn'>{userPersonalDetails.PhoneNumber}</div></p>
                                        <p className='cardContent'><div className='cardColumn'>Education type:</div><div className='cardColumn'>{userPersonalDetails.EducationType}</div></p>
                                        <p className='cardContent'><div className='cardColumn'>Institute Name </div><div className='cardColumn'>{userPersonalDetails.InstituteName}</div></p>
                                        <p className='cardContent'><div className='cardColumn'>Work Experience: </div><div className='cardColumn'>{userPersonalDetails.ExpereinceYears}</div></p>
                                        <p className='cardContent'><div className='cardColumn'>Current Company:</div><div className='cardColumn'>{userPersonalDetails.CurrentCompany}</div></p>
                                </div> 
                    </Card.Body>
                    { userEducationDetails.map(educationfieldName => (
                        <div>
                                <Card.Body className='employercard singleCard'>
                                    <div>
                                        <h6>Education Details</h6>
                                    </div>
                                    <div className='cardRow'>
                                        <p className='cardContent'><div className='cardColumn'>Education Type:</div> <div className='cardColumn'>{educationfieldName.EducationType}</div> </p>
                                        <p className='cardContent'><div className='cardColumn'>Institute Name: </div><div className='cardColumn'>{educationfieldName.InstituteName}</div></p>
                                        <p className='cardContent'><div className='cardColumn'>Institute Location: </div><div className='cardColumn'>{educationfieldName.InstituteLocation}</div></p>
                                        <p className='cardContent'><div className='cardColumn'>Education Field:</div><div className='cardColumn'>{educationfieldName.EducationField}</div></p>
                                        <p className='cardContent'><div className='cardColumn'>Starting Year:</div><div className='cardColumn'>{educationfieldName.StartingYear}</div></p>
                                        <p className='cardContent'><div className='cardColumn'>Completion Year: </div><div className='cardColumn'>{educationfieldName.CompletionYear}</div></p>
                                        <p className='cardContent'><div className='cardColumn'>Percentage Achieved: </div><div className='cardColumn'>{educationfieldName.PercentageAchieved}</div></p>
                                    </div> 
                                </Card.Body>
                        </div>
                    ))}
                    { userExperienceDetails.map(experiencefieldName => (
                        <div>
                                <Card.Body className='employercard singleCard'>
                                    <div>
                                        <h6>Experience Details</h6>
                                    </div>
                                    <div className='cardRow'>
                                        <p className='cardContent'><div className='cardColumn'>Company Name:</div> <div className='cardColumn'>{experiencefieldName.CompanyName}</div> </p>
                                        <p className='cardContent'><div className='cardColumn'>Company Location: </div><div className='cardColumn'>{experiencefieldName.CompanyLocation}</div></p>
                                        <p className='cardContent'><div className='cardColumn'>Experience Field: </div><div className='cardColumn'>{experiencefieldName.ExperienceField}</div></p>
                                        <p className='cardContent'><div className='cardColumn'>Date of Joining:</div><div className='cardColumn'>{experiencefieldName.DateofJoining}</div></p>
                                        <p className='cardContent'><div className='cardColumn'>Date of Leaving:</div><div className='cardColumn'>{experiencefieldName.DateofLeaving}</div></p>
                                        <p className='cardContent'><div className='cardColumn'>Leaving Reason: </div><div className='cardColumn'>{experiencefieldName.LeavingReason}</div></p>
                                        <p className='cardContent'><div className='cardColumn'>Experience Years: </div><div className='cardColumn'>{experiencefieldName.ExpereinceYears}</div></p>
                                        <p className='cardContent'><div className='cardColumn'>Experience Details: </div><div className='cardColumn'>{experiencefieldName.ExpereinceDetails}</div></p>
                                    </div> 
                                </Card.Body>
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