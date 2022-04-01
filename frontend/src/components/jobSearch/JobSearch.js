/* author Arpreet*/
import Navbar from './Navbar';
import Searchbar from './Searchbar';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React , { Component, useState, useEffect } from 'react';
import Jobpost from './Jobpost';
import JobDesc from './JobDesc';
import axios from 'axios';
import '../../styles/JobSearch.css'


function JobSearch() {

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



      const [initialJoblocation,setJobLocation] = useState("");
      const [initialJobTitle,setJobTitle] = useState("");
      const [initialjobdata, setjobdata] = useState("");

      

      const jobLocationHandler = (updatedLocation) =>{

            setJobLocation(updatedLocation);
      }

      const jobTitleHandler = (updatedTitle) =>{

        setJobTitle(updatedTitle);

  }

      const updatejobdata = (newjobdata) => {

        setjobdata(newjobdata);
  }

  const getJobData = async () => {

    await axios.get("JobSearch").then((res) => {

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