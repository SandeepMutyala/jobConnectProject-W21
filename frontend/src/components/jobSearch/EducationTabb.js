/* author Arpreet*/

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import React, { Component , useState } from 'react';
import '../../styles/EducationTabb.css'
import axios from 'axios';
import {useSelector} from "react-redux";


const EducationTabb = (props)=> {

    const {user} = useSelector(
        (state) => state.auth
      );
      console.log(user);
    let flag = "y";

    const [errorMessage,updateErrorMessage] = useState({
        instituteName: "",
        instituteLocation : "",
        startingYear: ""
    });

    const namepattern = /^[a-z]+$/;

    const [Educationlist,updateEducationList] = useState([{
        UserId : "1",
        EducationType : "",
        InstituteName : "",
        InstituteLocation : "",
        EducationField : "",
        StartingYear : "",
        CompletionYear : "",
        PercentageAchieved : 0,
        Educationid : Math.random(),
        Educationindex : "",
        jobID : props.jobID,
        userID: user._id
    }])
    

    const handleEducationRemove = (index) => {
        const list = [...Educationlist];
        list.splice(index, 1);
        updateEducationList(list);
    };
    
      const handleEducationAdd = () => {
        updateEducationList([...Educationlist, {
            UserId : "1",
            EducationType : "",
            InstituteName : "",
            InstituteLocation : "",
            EducationField : "",
            StartingYear : "",
            CompletionYear : "",
            PercentageAchieved : 0,
            Educationid : Math.random(),
            Educationindex : 0,
            jobID : props.jobID,
            userID: user._id
        }]);
      };

      const EducationListChange = (e, index) => {
        
        const {name, value} = e.target;
        const Educationlistupdated = [...Educationlist];
        
        Educationlistupdated[index][name] = value;
        Educationlistupdated[index]["Educationindex"] = index;
        //console.log(Educationlistupdated);
        updateEducationList(Educationlistupdated);
    }

    const handleEducationSave = () => {

        const result = validationscheck();
        if(result == "noerror")
            axios.post("/JobSearch/EducationDetails", Educationlist);
        else
            updateErrorMessage(result);
    }

    const validationscheck = () => {
        //console.log(Educationlist);
        const errorlist = {};
        for(let i=0; i<Educationlist.length;i++ )
        {
            //console.log(Educationlist[i].InstituteName);
            if(Educationlist[i].InstituteName == "" || Educationlist[i].InstituteName == null)
            {
               // console.log("enetered in");
                errorlist.instituteName = "Please enter Institute Name correctly"
                flag = "n";
            }
            if(Educationlist[i].InstituteLocation == "" || Educationlist[i].InstituteLocation == null)
            {
                errorlist.instituteLocation = "Please enter Institute Location correctly"
                flag = "n";
            }
            if(Educationlist[i].StartingYear == "" || Educationlist[i].StartingYear == null)
            {
                errorlist.startingYear = "Please enter Starting Year"
                flag = "n";
            }
          //  console.log(errorlist);
            if(flag == "n")
                return errorlist;
        }
            return "noerror";
    }

    return (
        <div>
        {Educationlist.map((Education, index) => (
        <form key={Education.Educationid}>
        <div >
            <Container >
            
            <Row >
                <Col >
                    <label>Type of Education *</label>
                    <br></br>
                    <select id="Educationtype" className='form-control, textbox' name="EducationType" value={Education.EducationType} onChange={(e) => EducationListChange(e,index)}>
                            <option value="High School">High School</option>
                            <option value="Bachelors">Bachelors</option>
                            <option value="Masters">Masters</option>
                            <option value="Phd">Phd</option>
                    </select>

                    
                </Col>
            </Row>
            <br></br>
            <Row>
                <Col>
                    <label>Institute Name *</label>
                    <br></br>
                    <input key={Education.Educationid} type="text" className='form-control, textbox' placeholder='Institute Name' name="InstituteName" value={Education.InstituteName} onChange={(e) => EducationListChange(e, index)}></input>
                    {errorMessage.instituteName && <div> {errorMessage.instituteName} </div>}
                </Col>
                <Col>
                    <label>Institute Location *</label>
                    <br></br>
                    <input  type="text" className='form-control, textbox' placeholder='Institute Location' name="InstituteLocation" value={Education.InstituteLocation} onChange={(e) => EducationListChange(e, index)}></input>
                    {errorMessage.instituteLocation && <div> {errorMessage.instituteLocation} </div>}
                </Col>
                <Col>
                    <label>Education Field</label>
                    <br></br>
                    <input  type="text" className='form-control, textbox' placeholder='Education Field' name="EducationField" value={Education.EducationField} onChange={(e) => EducationListChange(e, index)}></input>
                </Col>
            </Row>
            <br></br>
            <Row>
                <Col>
                    <label>Starting Year *</label>
                    <br></br>
                    <input  type="date" className='form-control, textbox' placeholder='Starting Year' name="StartingYear" value={Education.StartingYear} onChange={(e) => EducationListChange(e, index)}></input>
                    {errorMessage.startingYear && <div> {errorMessage.startingYear} </div>}
                </Col>
                <Col>
                    <label>Completion Year</label>
                    <br></br>
                    <input  type="date" className='form-control, textbox' placeholder='Completion Year' name="CompletionYear" value={Education.CompletionYear} onChange={(e) => EducationListChange(e, index)}></input>
                </Col>
                <Col>
                    <label>Percentage Achieved</label>
                    <br></br>
                    <input  type="text" id="form1" className='form-control, textbox' placeholder='Percentage Achieved' name="PercentageAchieved" value={Education.PercentageAchieved} onChange={(e) => EducationListChange(e, index)}></input>
                </Col>
             </Row>
             <br></br>
             <Row>
                <Col>
                <div>
                {Educationlist.length - 1 === index && Educationlist.length < 4 && (
                    <button
                    type="button"
                    class="btn btn-primary"
                    onClick={handleEducationAdd}
                    >
                    <span>Click to add another education</span>
                    </button>
                    
                )}
                </div>
                </Col>
                <Col>
                <div>
                {Educationlist.length !== 1 && (
                    <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => handleEducationRemove(index)}
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
                        className="btn btn-primary ,  buttonStyle"
                        onClick={handleEducationSave}
                        >
                        <span>Click to save data</span>
        </button>
        </div>
    )
}

export default EducationTabb;