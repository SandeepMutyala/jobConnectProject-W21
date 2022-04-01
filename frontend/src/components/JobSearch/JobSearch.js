import Navbar from './Navbar';
import Searchbar from './Searchbar';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { Component, useState, useEffect } from 'react';
import Jobpost from './Jobpost';
import JobDesc from './JobDesc';
import axios from 'axios';


function JobSearch() {

  console.log("entered here");
    useEffect(() => {
        getJobData();

    }, []) ;
    
    const [jobPostData, updatejobPostData] = useState([{
                                                        _id : "",
                                                        country: "",
                                                        language:"",
                                                        companyName: "",
                                                        jobTitle: "",
                                                        jobPostDate: "",
                                                        jobShortDescription: "",
                                                        workLocation:"",
                                                        addLocation: "",
                                                        hiringCount : 0,
                                                        lastDateToApply : "",
                                                        jobType1 : "",
                                                        jobType2 : "",
                                                        schedule : "",
                                                        payType : "",
                                                        pay : Number,
                                                        jobDescription : "",
                                                        jobPostDate: "",
                                                        __v : 0,
                                                        companyLogoUrl: "",
                                                        }]);

    //console.log("entered here");
     // const jobdata = 1;


      //console.log("passed");
      //console.log(jobPostData);                 

      

      const [initialJoblocation,setJobLocation] = useState("");
      const [initialJobTitle,setJobTitle] = useState("");
      const [initialjobdata, setjobdata] = useState("");

      

      const jobLocationHandler = (updatedLocation) =>{

            setJobLocation(updatedLocation);
           // console.log(updatedLocation);
      }

      const jobTitleHandler = (updatedTitle) =>{

        setJobTitle(updatedTitle);
       // console.log(updatedTitle);
  }

      const updatejobdata = (newjobdata) => {

        setjobdata(newjobdata);
  }

  const getJobData = async () => {
    console.log("heeeee");
    await axios.get("http://localhost:5000/JobSearch").then((res) => {
        console.log("result");
        setjobdata(res.data.result[0]._id);
        updatejobPostData(res.data.result);
     });
 } 


    
  return (
    <div className='siteColor'>
      <Navbar>
      </Navbar>
      <br></br>
      <Container>
        <Row>
          <Col className='col col-lg-3'>
          </Col>
          
          <Col className='col col-lg-3'>
            <Searchbar inside="Job Location" jobLocationHandler ={jobLocationHandler}></Searchbar> 
          </Col> 
          <Col className='col col-lg-3'>
            <Searchbar inside="Job Title" jobTitleHandler ={jobTitleHandler}></Searchbar>
          </Col>
        </Row>
      </Container>
      <br></br>
      <br></br>

      <Container>
        <Row>
          <Col className="container1">
              <Jobpost posts={jobPostData} location={initialJoblocation} title={initialJobTitle} jobdata={updatejobdata}></Jobpost>
          </Col>
          <Col className='col col-lg-1'>
          </Col>
          <Col className="container2">
              <JobDesc post={jobPostData} postvalue={initialjobdata}></JobDesc>
          </Col>
        </Row>
      </Container>
    </div>
  );
}





export default JobSearch;