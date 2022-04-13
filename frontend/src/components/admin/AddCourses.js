/* Author: Raja Harshini Kasibhotla*/

import React, { useState, useDispatch } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function AddCourses() {
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [instructor, setInstructor] = useState("");
  var reg = new RegExp('^[0-9]*$');
  const [validationError, setValidationError] = useState({
    code: false,
    msg: "",
  });

  var styleButton = {
    height: "auto",
    width: "100px",
    textAlign: "center",
    alignItems: "center",
  };

  var formStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 700,
  };

  var h1style = {
    fontFamily: '"Times New Roman", Times, serif',
    fontSize: "30px",
    fontStyle: "italic",
    fontWeight: "bold",
    alignItems: "center",
  };

  const requestBody = {
    coursename: courseName,
    description: description,
    instructor: instructor,
    price: price,
  };

  const setDefaults = () => {
    setCourseName("");
    setDescription("");
    setInstructor("");
    setPrice("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(instructor);
    if (courseName.length === 0) {
      setValidationError({
        ...validationError,
        code: true,
        msg: "Course name cannot be empty",
      });
    } else if (description.length === 0) {
      setValidationError({
        ...validationError,
        code: true,
        msg: "Description cannot be empty",
      });
    } else if (instructor.length === 0) {
      setValidationError({
        ...validationError,
        code: true,
        msg: "Instructor name cannot be empty",
      });
    } else if (price.length === 0) {
      setValidationError({
        ...validationError,
        code: true,
        msg: "Price cannot be empty",
      });
    } else if (reg.test(price) == false) {
        setValidationError({
          ...validationError,
          code: true,
          msg: "Price can contain only digits",
        });
      } 
    else {
      axios
        .post("/courses/savecourse/", requestBody)
        .then((res) => {
          if (res.status === 200) {
            alert("Course added successfully");
            setDefaults();
          } else {
            alert("Please verify the course details");
          }
        });
        setValidationError({
            ...validationError,
            code: false,
            msg: "",
          });
    }
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setDefaults();
  };

  function errorMessage() {
    if (validationError.code) {
      return (
        <div>
          <p className="text-danger">{validationError.msg}</p>
        </div>
      );
    }
  }

  return (
    <React.Fragment>
      <br />

      <div style={formStyle}>
        <div
          className="col-10 col-lg-5"
          style={{ marginTop: "100px", maxWidth: "600px" }}
        >
          <h1 style={h1style}>Add a New Course</h1>
          <br />
          <div align="center"> {errorMessage()} </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label for="course_name_field">Course Name</label>
              <input
                type="courseName"
                id="course_name_field"
                className="form-control"
                name="courseName"
                value={courseName}
                placeholder="Enter name of the course"
                onChange={(e) => setCourseName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="description_field">Description</label>
              <input
                type="description"
                id="description_field"
                className="form-control"
                name="description"
                placeholder="Enter course description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="instructor_field">Instructor</label>
              <input
                type="instructor"
                id="instructor_field"
                className="form-control"
                name="instructor"
                placeholder="Enter Instructor name"
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="price_field">Price</label>
              <input
                type="price"
                id="price_d=field"
                className="form-control"
                name="price"
                placeholder="Enter price in CAD"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div style={{ paddingTop: "25px" }} align="center">
              <button
                style={styleButton}
                className="btn btn-secondary btn-sm"
                onClick={handleCancel}
              >
                Cancel
              </button>
              &nbsp; &nbsp;
              <button style={styleButton} className="btn btn-primary btn-sm">
                Add Course
              </button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AddCourses;
