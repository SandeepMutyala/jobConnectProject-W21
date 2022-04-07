// Author Sai Sandeep Mutyala

// REACT COMPONENTS
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
// REACT BOOTSTRAP COMPONENTS
import { Row, Col, Form, Container, Button } from "react-bootstrap";
// BOOTSTRAP LIBRARY
import "bootstrap/dist/css/bootstrap.css";
// ASSETS
import image6 from "../../assets/image6.jpg";
import "./jobPostForm.css";
import EmployerSideNav from "./employerSideNav";

const EditJobPost = () => {
  const [editForm, setEditForm] = useState();
  const [updateForm, setUpdateForm] = useState({});

  const location = useLocation();
  const history = useHistory();

  const setFormField = (field, value) => {
    if (editForm) {
      if (field == "country") {
        editForm["country"] = value;
      } else if (field == "language") {
        editForm["language"] = value;
      } else if (field == "companyName") {
        editForm["companyName"] = value;
      } else if (field == "jobTitle") {
        editForm["jobTitle"] = value;
      } else if (field == "jobShortDescription") {
        editForm["jobShortDescription"] = value;
      } else if (field == "workLocation") {
        editForm["workLocation"] = value;
      } else if (field == "addLocation") {
        editForm["addLocation"] = value;
      } else if (field == "hiringCount") {
        editForm["hiringCount"] = value;
      } else if (field == "lastDateToApply") {
        editForm["lastDateToApply"] = value;
      } else if (field == "jobType1") {
        editForm["jobType1"] = value;
      } else if (field == "jobType2") {
        editForm["jobType2"] = value;
      } else if (field == "schedule") {
        editForm["schedule"] = value;
      } else if (field == "payType") {
        editForm["payType"] = value;
      } else if (field == "pay") {
        editForm["pay"] = value;
      } else if (field == "jobDescription") {
        editForm["jobDescription"] = value;
      } else if (field == "companyLogoUrl") {
        editForm["companyLogoUrl"] = value;
      }
    }

    setUpdateForm({
      ...updateForm,
      [field]: value,
    });
  };
  useEffect(() => {
    axios.get("/jobpost/displayjobpost/" + location.state).then((response) => {
      setEditForm(response.data.jobPostDetails);
    });
  }, [1]);

  const handleReSubmit = (e) => {
    history.push({ pathname: "/employerDashboard" });
    axios
      .put("/jobpost/updatejobpost/" + location.state, updateForm)
      .then((res) => console.log(res));
    alert("Your job post has been edited.");
  };

  const handleDelete = (e) => {
    history.push({ pathname: "/employerDashboardHome" });
    axios
      .delete("/jobpost/deletejobpost/" + location.state)
      .then((res) => console.log(res));
    alert("Your job post has been deleted.");
  };

  return (
    <div className="rows">
      <div className="uppercolumn-left">
        <EmployerSideNav />
      </div>
      <div className="uppercolumn-right">
        <div className="rows">
          <div className="top-container">
            <div className="column-left">
              <h4 className="main-heading">
                Because people are our most precious assets, we create a bridge
                between them...
              </h4>
            </div>
          </div>
          <div className="column-right">
            <img
              className="top-image"
              src={image6}
              height="10%"
              width="10%"
              alt="background"
            />
          </div>
        </div>
        <div className="form">
          <Container id="main-container" className="b-grid h-100">
            <h1 className="heading">Edit or delete this existing job post:</h1>
            <Form id="sign-in-form" className="text-left w-130">
              <Form.Group as={Row} className="mb-3">
                <Form.Label id="label" column sm={5}>
                  Country:
                </Form.Label>
                <Col sm={3}>
                  <Form.Control
                    id="place-holder"
                    as="select"
                    onChange={(e) => setFormField("country", e.target.value)}
                    value={editForm ? editForm.country : null}
                  >
                    <option value="">Select the Country</option>
                    <option value="Canada">Canada</option>
                    <option value="India">India</option>
                    <option value="US">US</option>
                    <option value="Australia">Australia</option>
                    <option value="Brzail">Brzail</option>
                    <option value="China">China</option>
                  </Form.Control>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label id="label" column sm={5}>
                  Language:
                </Form.Label>
                <Col sm={3}>
                  <Form.Control
                    id="place-holder"
                    as="select"
                    onChange={(e) => setFormField("language", e.target.value)}
                    value={editForm ? editForm.language : null}
                  >
                    <option value="">Select the language:</option>
                    <option value="English">English</option>
                    <option value="French">French</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Spanish">Spanish</option>
                  </Form.Control>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label id="label" column sm={5}>
                  Company Name:
                </Form.Label>
                <Col sm={3}>
                  <Form.Control
                    id="place-holder"
                    placeholder="Company name"
                    type="text"
                    onChange={(e) =>
                      setFormField("companyName", e.target.value)
                    }
                    value={editForm ? editForm.companyName : null}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label id="label" column sm={5}>
                  Job Title
                </Form.Label>
                <Col sm={3}>
                  <Form.Control
                    id="place-holder"
                    placeholder="Job Title"
                    type="text"
                    onChange={(e) => setFormField("jobTitle", e.target.value)}
                    value={editForm ? editForm.jobTitle : null}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label id="label" column sm={5}>
                  Job Short Description
                </Form.Label>
                <Col sm={3}>
                  <Form.Control
                    id="place-holder"
                    placeholder="Job Short Description"
                    type="text"
                    onChange={(e) =>
                      setFormField("jobShortDescription", e.target.value)
                    }
                    value={editForm ? editForm.jobShortDescription : null}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label id="label" column sm={5}>
                  Where will employee report to work?
                </Form.Label>
                <Col sm={3}>
                  <Form.Control
                    id="place-holder"
                    as="select"
                    onChange={(e) =>
                      setFormField("workLocation", e.target.value)
                    }
                    value={editForm ? editForm.workLocation : null}
                  >
                    <option value="">Select the work location:</option>
                    <option value="Office">Office</option>
                    <option value="Remote">Remote</option>
                  </Form.Control>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label id="label" column sm={5}>
                  Where would you like to advertise this add?
                </Form.Label>
                <Col sm={3}>
                  <Form.Control
                    id="place-holder"
                    placeholder="Add Location"
                    type="text"
                    onChange={(e) =>
                      setFormField("addLocation", e.target.value)
                    }
                    value={editForm ? editForm.addLocation : null}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label id="label" column sm={5}>
                  Number of people required for this role?
                </Form.Label>
                <Col sm={3}>
                  <Form.Control
                    id="place-holder"
                    placeholder="Hiring count"
                    type="number"
                    onChange={(e) =>
                      setFormField("hiringCount", e.target.value)
                    }
                    value={editForm ? editForm.hiringCount : null}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label id="label" column sm={5}>
                  Last date to apply?
                </Form.Label>
                <Col sm={3}>
                  <Form.Control
                    id="place-holder"
                    placeholder="YYYY-MM-DD"
                    type="text"
                    onChange={(e) =>
                      setFormField("lastDateToApply", e.target.value)
                    }
                    value={editForm ? editForm.lastDateToApply : null}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label id="label" column sm={5}>
                  Is this a internship or full time or part time job?
                </Form.Label>
                <Col sm={3}>
                  <Form.Control
                    id="place-holder"
                    as="select"
                    onChange={(e) => setFormField("jobType1", e.target.value)}
                    value={editForm ? editForm.jobType1 : null}
                  >
                    <option value="">Select the job type:</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Intership">Intership</option>
                  </Form.Control>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label id="label" column sm={5}>
                  Job Type
                </Form.Label>
                <Col sm={3}>
                  <Form.Control
                    id="place-holder"
                    as="select"
                    onChange={(e) => setFormField("jobType2", e.target.value)}
                    value={editForm ? editForm.jobType2 : null}
                  >
                    <option value="">Select the job type</option>
                    <option value="Permenant">Permenant</option>
                    <option value="Temperory">Temperory</option>
                    <option value="Contract">Contract</option>
                  </Form.Control>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label id="label" column sm={5}>
                  What is the schedule for this job?
                </Form.Label>
                <Col sm={3}>
                  <Form.Control
                    id="place-holder"
                    as="select"
                    onChange={(e) => setFormField("schedule", e.target.value)}
                    value={editForm ? editForm.schedule : null}
                  >
                    <option value="">Select the job schedule</option>
                    <option value="Three days a week">Three days a week</option>
                    <option value="Four days a weeks">Four days a weeks</option>
                    <option value="Five days a weeks">Five days a weeks</option>
                    <option value="Six days a week">Six days a week</option>
                    <option value="Weekly">Weekly</option>
                  </Form.Control>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label id="label" column sm={5}>
                  Pay rate type
                </Form.Label>
                <Col sm={3}>
                  <Form.Control
                    id="place-holder"
                    as="select"
                    onChange={(e) => setFormField("payType", e.target.value)}
                    value={editForm ? editForm.payType : null}
                  >
                    <option value="">Select the pay type</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Bi-weekly">Bi-weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Quaterly">Quaterly</option>
                    <option value="Yearly">Yearly</option>
                  </Form.Control>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label id="label" column sm={5}>
                  Pay
                </Form.Label>
                <Col sm={3}>
                  <Form.Control
                    id="place-holder"
                    placeholder="Pay"
                    type="number"
                    onChange={(e) => setFormField("pay", e.target.value)}
                    value={editForm ? editForm.pay : null}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label id="label" column sm={5}>
                  Job Description
                </Form.Label>
                <Col sm={3}>
                  <Form.Control
                    id="text-area-place-holder"
                    placeholder="Job Description"
                    as="textarea"
                    onChange={(e) =>
                      setFormField("jobDescription", e.target.value)
                    }
                    value={editForm ? editForm.jobDescription : null}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label id="label" column sm={5}>
                  Please enter the company logo URL
                </Form.Label>
                <Col sm={3}>
                  <Form.Control
                    id="place-holder"
                    placeholder="Company logo URL"
                    type="text"
                    onChange={(e) =>
                      setFormField("companyLogoUrl", e.target.value)
                    }
                    value={editForm ? editForm.companyLogoUrl : null}
                  />
                </Col>
              </Form.Group>

              {["checkbox"].map((type) => (
                <div key={`default-${type}`} className="mb-3">
                  <Form.Check
                    className="form-checkbox"
                    type={type}
                    label={
                      "Please check the checkbox before modifying the job post."
                    }
                  />
                </div>
              ))}
              <div className="buttonsection">
                <Button
                  className="deletebutton"
                  type="submit"
                  variant="primary"
                  size="md"
                  onClick={handleDelete}
                >
                  Delete-post
                </Button>
                <Button
                  className="resubmitbutton"
                  type="submit"
                  variant="primary"
                  size="md"
                  onClick={handleReSubmit}
                >
                  Re-Submit
                </Button>
              </div>
            </Form>
            <br />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default EditJobPost;
