/* author Arpreet*/
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import React , { Component, useState, useEffect } from 'react';
import axios from 'axios';
import {useSelector} from "react-redux";

const PersonalTabb = (props) => {
	
	const {user} = useSelector(
        (state) => state.auth
      );
      console.log(user);

    let flag = "y";

    const [errorMessage,updateErrorMessage] = useState({
        email : "",
        phoneNumber: "",
        firstName: "",
        lastName : "",
        DOB: ""
    });

    const emailpattern = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9+.]+[A-Za-z]+$/;
    const phonepattern = /^[0-9]{10}$/;
    const namepattern = /^[a-z]+$/i;

    const [PersonalDetailsList, UpdatePersonalDetailsList] = useState({
        UserID : "1",
        FirstName: "",
        MiddleName : "",
        LastName : "",
        DOB : "",
        Email : "",
        PhoneNumber : "",
        Address : "",
        jobID : props.jobID,
		userID: user._id
    });
    
    const handlePersonalDetailsUpdate = (e) => {


        const {name, value} = e.target;
        const PersonalList = {...PersonalDetailsList};
        PersonalList[name] = value;

        UpdatePersonalDetailsList(PersonalList);
    }

    const handlePersonalDetailsSave = () => {

        
        const result = validationscheck();
        if(result == "noerror")
            axios.post("JobSearch/PersonalDetails", PersonalDetailsList);
        else
            updateErrorMessage(result);
    }

    const validationscheck = () => {

        const errorlist = {};
        if(!emailpattern.test(PersonalDetailsList.Email))
        {
            errorlist.email = "Incorrect Email entered"
            flag = "n"; 
        }
        if(!phonepattern.test(PersonalDetailsList.PhoneNumber))
        {
            errorlist.phoneNumber = "Incorrect Phone Number entered"
            flag = "n";
        }
        if(!namepattern.test(PersonalDetailsList.FirstName))
        {
            errorlist.firstName = "Please enter First Name correctly"
            flag = "n";
        }
        if(!namepattern.test(PersonalDetailsList.LastName))
        {
            errorlist.lastName = "Please enter Last Name correctly"
            flag = "n";
        }
        if(PersonalDetailsList.DOB == "" || PersonalDetailsList.DOB == null)
        {
            errorlist.DOB = "Please enter Date Of Birth"
            flag = "n";
        }

        if(flag = "n")
            return errorlist;
        else
            return "noerror";
    }

    return (
            <div>
                <form>
                <Container>
                <Row>
                    <Col>
                        <label>First name *</label>
                        <br></br>
                        <input type="text" placeholder='First Name' className='textbox' name="FirstName" onChange={(e) => handlePersonalDetailsUpdate(e)}/>
                        {errorMessage.firstName && <div> {errorMessage.firstName} </div>}
                    </Col>
                    <Col>
                        <label>Middle name</label>
                        <br></br>
                        <input type="text" placeholder='Middle Name'  className='textbox'  name="MiddleName" onChange={(e) => handlePersonalDetailsUpdate(e)}></input>
                    </Col>
                    <Col>
                        <label>Last name *</label>
                        <br></br>
                        <input type="text" placeholder='Last Name'  className='textbox'  name="LastName" onChange={(e) => handlePersonalDetailsUpdate(e)}></input>
                        {errorMessage.lastName && <div> {errorMessage.lastName} </div>}
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col>
                        <label>DOB *</label>
                        <br></br>
                        <input type="date" placeholder='Date of Birth'  className='textbox' name="DOB" onChange={(e) => handlePersonalDetailsUpdate(e)}></input>
                        {errorMessage.DOB && <div> {errorMessage.DOB} </div>}
                    </Col>
                    <Col>
                        <div>
                            <label>Email *</label>
                            <br></br>
                            <input type="email" placeholder='Email'  className='textbox'  name="Email" onChange={(e) => handlePersonalDetailsUpdate(e)}></input>
                            {errorMessage.email && <div> {errorMessage.email} </div>}
                            </div>
                    </Col>
                    <Col>
                        <label>Phone Number *</label>
                        <br></br>
                        <input type="text" placeholder='Phone Number'  className='textbox' name="PhoneNumber" pattern="[0-9]{10}" required="required" onChange={(e) => handlePersonalDetailsUpdate(e)}></input>
                        {errorMessage.phoneNumber && <div> {errorMessage.phoneNumber} </div>}
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col>
                        <label>Address</label>
                        <br></br>
                        <input type="text" placeholder='Address'  className='textbox' name="Address" onChange={(e) => handlePersonalDetailsUpdate(e)}></input>
                    </Col>
                    
                </Row>
                <br></br>
                <br></br>
                <Row>
                    <Col>
                        <button
                        type="button"
                        class="btn btn-primary"
                        onClick={handlePersonalDetailsSave}
                        >
                        <span>Click to save data</span>
                        </button>
                    </Col>
                </Row>
                </Container>
                </form>
            </div>
    )
}

export default PersonalTabb;