/* author Arpreet*/

import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";
import '../../styles/JobDesc.css'
import React, { Component } from 'react'

const JobDesc = (props) => {

    const history = useHistory();
    const postvalue = props.postvalue;
    //console.log(props.post);
    //console.log("postvalue" + postvalue);
    let jobpost = {};

    for(let i=0;i<props.post.length;i++)
    {
        if(props.post[i]._id == postvalue)
        {
            jobpost = {
                compimage: props.post[i].companyLogoUrl,
                jobtitle: props.post[i].jobTitle,
                companyname: props.post[i].companyName,
                companylocation: props.post[i].addLocation,
                dateposted: props.post[i].jobPostDate,
                jobdesc: props.post[i].jobShortDescription,
                longjobdes:props.post[i].jobDescription,
                jobID : props.post[i]._id
            }
        }
    }
     

    const ApplyJob = (event) => {
        event.preventDefault();
        history.push({pathname: '/JobApply',
                    state :jobpost} );
    }

    let dateStr =new Date(jobpost.dateposted)

    let dateposted = dateStr.toLocaleDateString()

    return (
        <div>
            <form onSubmit={ApplyJob}>
            <br></br>
            <h1> <img src= {jobpost.compimage} width="100" height="100"></img> {jobpost.jobtitle}</h1>
            <br></br>
            <p className="Titles"><strong>Company Name and Location:</strong> {jobpost.companyname} , {jobpost.companylocation}</p>
            <p className="Titles"><strong>Date Posted:</strong> {dateposted}</p>
            <p className="Titles"><strong>Job Description:</strong> </p>
            <p>{jobpost.longjobdes}</p>
            <br></br>
            <br></br>
            <Button type="button" class="btn btn-secondary" type="submit">Apply for job</Button>
            </form>
        </div>
    )

}

export default JobDesc;