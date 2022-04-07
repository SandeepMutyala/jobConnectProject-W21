 /* Author Sai Sandeep Mutyala */
import React, { useState } from 'react';
import axios from "axios";
// REACT BOOTSTRAP COMPONENTS
import {Row, Col, Form, Container} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
// BOOTSTRAP LIBRARY
import 'bootstrap/dist/css/bootstrap.css';
// ASSETS
import image6 from '../../assets/image6.jpg';
import './jobPostForm.css';
import EmployerSideNav from './employerSideNav';
import {useSelector} from "react-redux";

const JobPostForm= () => {

  const [ jobPostForm, setJobPostForm ] = useState({})
  const [ formErrors, setFormErrors ] = useState({})
  const {user} = useSelector(
    (state) => state.auth
  );
  console.log(user);
  const setFormField = (field, value) => {
    setJobPostForm({
      ...jobPostForm,
      [field]: value
    })
    // Check and see if errors exist, and remove them from the error object:
    if ( !!formErrors[field] ) setFormErrors({
      ...formErrors,
      [field]: null
    })
  }

  const handleSubmitJobPost = e => {
    e.preventDefault()
    const newFormErrors = findFormErrors()
    if ( Object.keys(newFormErrors).length > 0 ) {
      setFormErrors(newFormErrors)
    } else {
      let employObj = jobPostForm
      employObj['employer_id'] = user._id; //to post job post specific to that employer
      axios.post("/jobpost/createpost",jobPostForm )
      .then(res=>console.log(res))
      alert('Your job post got created.')
    }
  }

  const findFormErrors = () => {
    const { country, language, companyName, jobTitle, jobShortDescription, workLocation, addLocation, hiringCount, lastDateToApply, jobType1, jobType2, schedule, payType, pay, jobDescription, companyLogoUrl} = jobPostForm
    // form errors
    const newFormErrors = {}
    if ( !country || country === '' ) newFormErrors.country = 'Please select the country!'
    if ( !language || language === '' ) newFormErrors.language = 'Please select the language!'
    if ( !companyName || companyName  === '' ) newFormErrors.companyName  = 'Company name cannot be blank!'
    else if ( companyName.length > 30 ) newFormErrors.companyName = 'Company name is too long!'
    if ( !jobTitle || jobTitle === '' ) newFormErrors.jobTitle = 'Job title cannot be blank!'
    else if ( jobTitle.length > 30 ) newFormErrors.jobTitle = 'Job title is too long!'
    if ( !jobShortDescription || jobShortDescription === '' ) newFormErrors.jobShortDescription = 'Job title cannot be blank!'
    else if ( jobShortDescription.length > 60 ) newFormErrors.jobShortDescription = 'Job short description is too long!'
    if ( !workLocation || workLocation === '' ) newFormErrors.workLocation = 'Please select the workLocation!'
    if ( !addLocation || addLocation === '' ) newFormErrors.addLocation = 'Add location cannot be blank!'
    else if ( addLocation.length > 30 ) newFormErrors.addLocation = 'add location is too long!'
    if ( !hiringCount || hiringCount > 501 || hiringCount < 1 ) newFormErrors.hiringCount = 'Hiring count must be assigned between 1 and 500!'
    if ( !lastDateToApply || lastDateToApply === '' ) newFormErrors.lastDateToApply = 'Please select the last date to apply!'
    if ( !jobType1 || jobType1 === '' ) newFormErrors.jobType1 = 'Is it a part-time or full-time or Internship!'
    if ( !jobType2 || jobType2 === '' ) newFormErrors.jobType2 = 'Is it permenant or temperory job!'
    if ( !schedule || schedule === '' ) newFormErrors.schedule = 'Please select the job schedule!'
    if ( !payType || payType === '' ) newFormErrors.payType = 'Please select the type of pay!'
    if ( !pay || pay > 1000001 || pay < 15 ) newFormErrors.pay = 'Pay must be between $15 and $1000000!'
    if ( !jobDescription || jobDescription === '' ) newFormErrors.jobDescription = 'Job description cannot be blank!'
    else if ( jobDescription.length > 500 ) newFormErrors.jobDescription = 'Job description is too long!'
    if ( !companyLogoUrl || companyLogoUrl === '' ) newFormErrors.companyLogoUrl = 'Please enter the company logo URL!'

    return newFormErrors
  }

  return (
    <div className='rows'>
      <div className='uppercolumn-left'>
        <EmployerSideNav/>  
      </div>  
      <div className='uppercolumn-right'>  
        <div className='rows'>
          <div className='top-container'>
            <div className='column-left'>
              <h4  className='main-heading'>Because people are our most precious assets, we create a bridge between them...</h4>
            </div>
          </div>
          <div className='column-right'>
            <img className='top-image'src={image6} height='10%' width='10%' alt="background" />
          </div>
        </div>
      <div className='form'>
        <Container id="main-container" className="b-grid h-100">
          <h1 className = 'heading'>Please fill in job post details:</h1>
          <Form id="sign-in-form" className="text-left w-130">
            <Form.Group as={Row} className="mb-3">
              <Form.Label id='label' column sm={5}>Country:</Form.Label>
              <Col sm={3}>
                <Form.Control 
                  id='place-holder'
                  as='select' 
                  onChange={ e => setFormField('country', e.target.value) }
                  isInvalid={ !!formErrors.country }
                >
                  <option value=''>Select the Country</option>
                  <option value='Canada'>Canada</option>
                  <option value='India'>India</option>
                  <option value='US'>US</option>
                  <option value='Australia'>Australia</option>
                  <option value='Brzail'>Brzail</option>
                  <option value='China'>China</option>
                </Form.Control>
              </Col>
              <Form.Control.Feedback className='form-error' type='invalid'>{ formErrors.country }</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label id='label' column sm={5}>Language:</Form.Label>
              <Col sm={3}>
                <Form.Control 
                  id='place-holder'
                  as='select' 
                  onChange={ e => setFormField('language', e.target.value) }
                  isInvalid={ !!formErrors.language }
                >
                  <option value=''>Select the language:</option>
                  <option value='English'>English</option>
                  <option value='French'>French</option>
                  <option value='Japanese'>Japanese</option>
                  <option value='Chinese'>Chinese</option>
                  <option value='Spanish'>Spanish</option>
                </Form.Control>
              </Col>
              <Form.Control.Feedback className='form-error' type='invalid'>{ formErrors.language }</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label id='label' column sm={5}>Company Name:</Form.Label>
              <Col sm={3}>
                <Form.Control 
                  id='place-holder'
                  placeholder='Company name'
                  type='text' 
                  onChange={ e => setFormField('companyName', e.target.value) }
                  isInvalid={ !!formErrors.companyName }
                />
              </Col>
              <Form.Control.Feedback className='form-error' type='invalid'>{ formErrors.companyName }</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label id='label' column sm={5}>Job Title</Form.Label>
              <Col sm={3}>
                <Form.Control 
                  id='place-holder'
                  placeholder='Job Title'
                  type='text' 
                  onChange={ e => setFormField('jobTitle', e.target.value) }
                  isInvalid={ !!formErrors.jobTitle }
                />
              </Col>
              <Form.Control.Feedback className='form-error' type='invalid'>{ formErrors.jobTitle }</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label id='label' column sm={5}>Job Short Description</Form.Label>
              <Col sm={3}>
                <Form.Control 
                  id='place-holder'
                  placeholder='Job Short Description'
                  type='text' 
                  onChange={ e => setFormField('jobShortDescription', e.target.value) }
                  isInvalid={ !!formErrors.jobShortDescription }
                />
              </Col>
              <Form.Control.Feedback className='form-error' type='invalid'>{ formErrors.jobShortDescription }</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label id='label' column sm={5}>Where will employee report to work?</Form.Label>
              <Col sm={3}>
                <Form.Control 
                  id='place-holder'
                  as='select' 
                  onChange={ e => setFormField('workLocation', e.target.value) }
                  isInvalid={ !!formErrors.workLocation }>
                  <option value=''>Select the work location:</option>
                  <option value='Office'>Office</option>
                  <option value='Remote'>Remote</option>
                </Form.Control>
              </Col>
              <Form.Control.Feedback className='form-error' type='invalid'>{ formErrors.workLocation }</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label id='label' column sm={5}>Where would you like to advertise this add?</Form.Label>
              <Col sm={3}>
                <Form.Control 
                  id='place-holder'
                  placeholder='Add Location'
                  type='text' 
                  onChange={ e => setFormField('addLocation', e.target.value) }
                  isInvalid={ !!formErrors.addLocation }/>
              </Col>
              <Form.Control.Feedback className='form-error' type='invalid'>{ formErrors.addLocation }</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label id='label' column sm={5}>Number of people required for this role?</Form.Label>
              <Col sm={3}>
                <Form.Control 
                  id='place-holder'
                  placeholder='Hiring count'
                  type='number' 
                  onChange={ e => setFormField('hiringCount', e.target.value) }
                  isInvalid={ !!formErrors.hiringCount }/>
              </Col>
              <Form.Control.Feedback className='form-error' type='invalid'>{ formErrors.hiringCount }</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label id='label' column sm={5}>Last date to apply?</Form.Label>
              <Col sm={3}>
                <Form.Control 
                  id='place-holder'
                  placeholder='YYYY-MM-DD'
                  type='text' 
                  onChange={ e => setFormField('lastDateToApply', e.target.value) }
                  isInvalid={ !!formErrors.lastDateToApply }
                />
              </Col>
              <Form.Control.Feedback className='form-error' type='invalid'>{ formErrors.lastDateToApply }</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label id='label' column sm={5}>Is this a internship or full time or part time job?</Form.Label>
              <Col sm={3}>
                <Form.Control 
                  id='place-holder'
                  as='select' 
                  onChange={ e => setFormField('jobType1', e.target.value) }
                  isInvalid={ !!formErrors.jobType1 }>
                  <option value=''>Select the job type:</option>
                  <option value='Full-time'>Full-time</option>
                  <option value='Part-time'>Part-time</option>
                  <option value='Intership'>Intership</option>
                </Form.Control>
              </Col>
              <Form.Control.Feedback className='form-error' type='invalid'>{ formErrors.jobType1 }</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label id='label' column sm={5}>Job Type</Form.Label>
              <Col sm={3}>
                <Form.Control 
                  id='place-holder'
                  as='select' 
                  onChange={ e => setFormField('jobType2', e.target.value) }
                  isInvalid={ !!formErrors.jobType2 }>
                  <option value=''>Select the job type</option>
                  <option value='Permenant'>Permenant</option>
                  <option value='Temperory'>Temperory</option>
                  <option value='Contract'>Contract</option>
                </Form.Control>
              </Col>
              <Form.Control.Feedback className='form-error' type='invalid'>{ formErrors.jobType2 }</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label id='label' column sm={5}>What is the schedule for this job?</Form.Label>
              <Col sm={3}>
                <Form.Control 
                  id='place-holder'
                  as='select' 
                  onChange={ e => setFormField('schedule', e.target.value) }
                  isInvalid={ !!formErrors.schedule }>
                  <option value=''>Select the job schedule</option>
                  <option value='Three days a week'>Three days a week</option>
                  <option value='Four days a weeks'>Four days a weeks</option>
                  <option value='Five days a weeks'>Five days a weeks</option>
                  <option value='Six days a week'>Six days a week</option>
                  <option value='Weekly'>Weekly</option>
                </Form.Control>
              </Col>
              <Form.Control.Feedback className='form-error' type='invalid'>{ formErrors.schedule }</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label id='label' column sm={5}>Pay rate type</Form.Label>
              <Col sm={3}>
                <Form.Control 
                  id='place-holder'
                  as='select' 
                  onChange={ e => setFormField('payType', e.target.value) }
                  isInvalid={ !!formErrors.payType }>
                  <option value=''>Select the pay type</option>
                  <option value='Weekly'>Weekly</option>
                  <option value='Bi-weekly'>Bi-weekly</option>
                  <option value='Monthly'>Monthly</option>
                  <option value='Quaterly'>Quaterly</option>
                  <option value='Yearly'>Yearly</option>
                </Form.Control>
              </Col>
              <Form.Control.Feedback className='form-error' type='invalid'>{ formErrors.payType }</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label id='label' column sm={5}>Pay</Form.Label>
              <Col sm={3}>
                <Form.Control 
                  id='place-holder'
                  placeholder='Pay'
                  type='number' 
                  onChange={ e => setFormField('pay', e.target.value) }
                  isInvalid={ !!formErrors.pay }/>
              </Col>
              <Form.Control.Feedback className='form-error' type='invalid'>{ formErrors.pay }</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label id='label' column sm={5}>Job Description</Form.Label>
              <Col sm={3}>
                <Form.Control 
                  id='text-area-place-holder'
                  placeholder='Job Description'
                  as='textarea' 
                  onChange={ e => setFormField('jobDescription', e.target.value) }
                  isInvalid={ !!formErrors.jobDescription }/>
              </Col>
              <Form.Control.Feedback className='form-error' type='invalid'>{ formErrors.jobDescription }</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label id='label' column sm={5}>Please enter the company logo URL</Form.Label>
              <Col sm={3}>
                <Form.Control 
                  id='place-holder'
                  placeholder='Company logo URL'
                  type='text' 
                  onChange={ e => setFormField('companyLogoUrl', e.target.value) }
                  isInvalid={ !!formErrors.companyLogoUrl }/>
              </Col>
              <Form.Control.Feedback className='form-error' type='invalid'>{ formErrors.companyLogoUrl }</Form.Control.Feedback>
            </Form.Group>
       

            <div>
              <Form.Check className='form-checkbox'
                label={'Please tick the checkbox before submitting the job post.'}/>
            </div>
    
            <div className='submitbutton'>
            <Button  type='submit' variant="primary" size="md" onClick={ handleSubmitJobPost }>Submit</Button>
            </div>
          </Form>
          <br/>
      </Container>
      </div>
      </div>
  </div>
  )
}

export default JobPostForm;