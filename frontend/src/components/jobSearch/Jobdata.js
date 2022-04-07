import '../../styles/Jobdata.css'
import Button from 'react-bootstrap/Button'
import Divider from '@mui/material/Divider';
import React, { Component } from 'react' 

const Jobdata = (props) => {
/* author Arpreet*/
    const setJobData = (event) =>
    {

        const jobdata = event.target.value;

        props.jobdata(jobdata);
    }

    let dateStr =new Date(props.dateposted)

    let dateposted = dateStr.toLocaleDateString()


    return (

        <div onClick={props.clickFunction}>
            <table>
                <tbody>
                    <tr>
                        <td rowSpan="2" className='padtop'><img src={props.compimage} width="100" height="100"></img></td>
                        <td className='padtop'><h4>{props.jobtitle}</h4></td>
                    </tr>
                    <tr>
                        <td><strong>Company Name and Location:</strong> {props.companyname}, {props.companylocation}</td>
                    </tr>
                    <tr>
                        <td rowSpan="3"></td>
                        <td><strong>Date posted:</strong> {dateposted}</td>
                    </tr>
                    <tr>
                        <td className='padbottom'><strong>Job Description:</strong> {props.jobdesc}</td>
                    </tr>
                    <tr>
                        <td><Button type="button" class="btn btn-primary" value={props.jobid} onClick={setJobData}>See full job description</Button></td>
                    </tr>
                </tbody>
            </table>
            <br></br>
            <br></br>
            <Divider />
        </div>
    )

}

export default Jobdata;