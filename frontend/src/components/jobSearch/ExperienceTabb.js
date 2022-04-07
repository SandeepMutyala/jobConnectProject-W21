/* author Arpreet*/

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import React, { Component , useState } from 'react';
import Button from 'react-bootstrap/Button'
import '../../styles/ExperienceTabb.css'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import {useSelector} from "react-redux";

const ExperienceTabb = (props)=> {

    const {user} = useSelector(
        (state) => state.auth
      );
      console.log(user);
    let flag = "y";
    const history = useHistory();
    const [errorMessage,updateErrorMessage] = useState({
        companyLocation: "",
        dateOfJoining: "",
        dateOfLeaving: "",
        reasonOfLeaving: "",
        yearsOfExperience: "",
        experienceDetails: ""
    });

    const namepattern = /^[a-z]+$/i;

    const [Experiencelist,updateExperienceList] = useState([{
        UserId : "1",
        CompanyName : "",
        CompanyLocation : "",
        ExperienceField : "",
        DateofJoining : "",
        DateofLeaving : "",
        LeavingReason : "",
        ExpereinceYears : "",
        ExpereinceDetails : "",
        Experienceid : Math.random(),
        Experienceindex : "",
        jobID : props.jobID,
        userID: user._id
    }])
    

    const handleExperienceRemove = (index) => {
        const list = [...Experiencelist];
        list.splice(index, 1);
        updateExperienceList(list);
    };
    
      const handleExperienceAdd = () => {
        updateExperienceList([...Experiencelist, {
            UserId : "1",
            CompanyName : "",
            CompanyLocation : "",
            ExperienceField : "",
            DateofJoining : "",
            DateofLeaving : "",
            LeavingReason : "",
            ExpereinceYears : "",
            ExpereinceDetails : "",
            Experienceid : Math.random(),
            Experienceindex : "",
            jobID : props.jobID,
            userID: user._id
        }]);
      };

      const ExperienceListChange = (e, index) => {
        
        const {name, value} = e.target;
        const Experiencelistupdated = [...Experiencelist];
        
        Experiencelistupdated[index][name] = value;
        Experiencelistupdated[index]["Experienceindex"] = index;
       // console.log(Experiencelistupdated);
        updateExperienceList(Experiencelistupdated);
    }

    const handleExperienceSave = () => {
        const result = validationscheck();
        if(result == "noerror")
            axios.post("JobSearch/ExperienceDetails", Experiencelist);
        else
            updateErrorMessage(result);
    }

    const validationscheck = () => {
        //console.log(Experiencelist);
        const errorlist = {};
        for(let i=0; i<Experiencelist.length;i++ )
        {
            if(Experiencelist[i].CompanyName != "" || Experiencelist[i].CompanyName != null)
            {
                if(Experiencelist[i].CompanyLocation == "" || Experiencelist[i].CompanyLocation == null)
                {
                    //console.log("enetered in");
                    errorlist.companyLocation = "Please enter Company Location correctly"
                    flag = "n";
                }
                if(Experiencelist[i].DateofJoining == "" || Experiencelist[i].DateofJoining == null)
                {
                    errorlist.dateOfJoining = "Please enter Date of Joining"
                    flag = "n";
                }
                if((Experiencelist[i].DateofLeaving == "" || Experiencelist[i].DateofLeaving == null) && (Experiencelist[i].DateofJoining != "" || Experiencelist[i].DateofJoining != null))
                {
                    errorlist.dateOfLeaving = "Please enter Date of Leaving"
                    flag = "n";
                }
                if((Experiencelist[i].DateofLeaving != "" || Experiencelist[i].DateofLeaving != null) && (Experiencelist[i].LeavingReason != "" || Experiencelist[i].LeavingReason != null))
                {
                    errorlist.LeavingReason = "Please enter Reason of Leaving"
                    flag = "n";
                }
                if(Experiencelist[i].ExpereinceYears == "" || Experiencelist[i].ExpereinceYears == null)
                {
                    errorlist.ExpereinceYears = "Please enter Years of Experience"
                    flag = "n";
                }
                if(Experiencelist[i].ExpereinceDetails == "" || Experiencelist[i].ExpereinceDetails == null)
                {
                    errorlist.experienceDetails = "Please enter Details of your Experience"
                    flag = "n";
                }
                //console.log(errorlist);
                if(flag == "n")
                    return errorlist;
            }
        }
            return "noerror";
    }

    const handleApplicationSubmit = () => {

        history.push({pathname: '/ApplicationSubmit'} );
    }
    return (
        <div>
        {Experiencelist.map((Experience, index) => (
        <form key={Experience.Experienceid}>
        <div >
            <Container >
            
            <Row>
                <Col>
                    <label>Company Name</label>
                    <br></br>
                    <input type="text" className='textbox' placeholder='Company Name' name="CompanyName"  value={Experience.CompanyName} onChange={(e) => ExperienceListChange(e, index)}></input>
                </Col>
                <Col>
                    <label>Company Location</label>
                    <br></br>
                    <input  type="text"  className='textbox' placeholder='Company Location' name="CompanyLocation" value={Experience.CompanyLocation} onChange={(e) => ExperienceListChange(e, index)}></input>
                    {errorMessage.companyLocation && <div> {errorMessage.companyLocation} </div>}
                </Col>
                <Col>
                    <label>Experience Field</label>
                    <br></br>
                    <input  type="text" className='textbox' placeholder='Experience Field' name="ExperienceField" value={Experience.ExperienceField} onChange={(e) => ExperienceListChange(e, index)}></input>
                </Col>
            </Row>
            <br></br>
            <Row>
                <Col>
                    <label>Date of Joining</label>
                    <br></br>
                    <input  type="date" className='textbox' placeholder='Date of Joining' name="DateofJoining" value={Experience.DateofJoining} onChange={(e) => ExperienceListChange(e, index)}></input>
                    {errorMessage.dateOfJoining && <div> {errorMessage.dateOfJoining} </div>}
                </Col>
                <Col>
                    <label>Date of leaving</label>
                    <br></br>
                    <input  type="date"  className='textbox' placeholder='Date of leaving' name="DateofLeaving" value={Experience.DateofLeaving} onChange={(e) => ExperienceListChange(e, index)}></input>
                    {errorMessage.dateOfLeaving && <div> {errorMessage.dateOfLeaving} </div>}
                </Col>
                <Col>
                    <label>Reason of leaving</label>
                    <br></br>
                    <input  type="text" className='textbox' placeholder='Reason of leaving' name="LeavingReason" value={Experience.LeavingReason} onChange={(e) => ExperienceListChange(e, index)}></input>
                    {errorMessage.reasonOfLeaving && <div> {errorMessage.reasonOfLeaving} </div>}
                </Col>
             </Row>
             <br></br>
            <Row>
                <Col xs={4}>
                    <label>Years of Experience</label>
                    <br></br>
                    <input  type="text" className='textbox' placeholder='Years of Experience' name="ExpereinceYears" value={Experience.ExpereinceYears} onChange={(e) => ExperienceListChange(e, index)}></input>
                    {errorMessage.yearsOfExperience && <div> {errorMessage.yearsOfExperience} </div>}              
                </Col>
                <Col>
                    <label>Experience Details</label>
                    <br></br>
                    <input  type="text" className='textbox' placeholder='Experience Details' name="ExpereinceDetails" value={Experience.ExpereinceDetails} onChange={(e) => ExperienceListChange(e, index)}></input>
                    {errorMessage.experienceDetails && <div> {errorMessage.experienceDetails} </div>} 
                </Col>
             </Row>
             <br></br>
             <Row>
                <Col>
                <div>
                {Experiencelist.length - 1 === index && Experiencelist.length < 4 && (
                    <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleExperienceAdd}
                    >
                    <span>Click to add another experience</span>
                    </button>
                )}
                </div>
                </Col>
                <Col>
                <div>
                {Experiencelist.length !== 1 && (
                    <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => handleExperienceRemove(index)}
                    >
                    <span>Click to remove this</span>
                    </button>
                )}
                </div>
                </Col>
            </Row>
            </Container>
        </div>
        </form>
            
        ))}
        <br></br>
        <br></br>
        <button
                        type="button"
                        class="btn btn-primary , buttonStyle"
                        onClick={handleExperienceSave}
                        >
                        <span>Click to save data</span>
        </button>
        <button
                        type="button"
                        class="btn btn-primary , buttonStyle"
                        onClick={handleApplicationSubmit}
                        >
                        <span>Click to Submit Job Application</span>
        </button>
        </div>
    )
}

export default ExperienceTabb;