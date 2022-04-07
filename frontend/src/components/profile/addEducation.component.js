/**Author: Geetanjali Bommera */
import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { BsAsterisk } from "react-icons/bs";
export default class AddEducation extends Component {
  
  state = {
    id: this.props.location.state.id,
    educationname: "",
    universityname: "",
    fromdate: "",
    todate: "",
    description: "",
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handlevalidation() {
    if (
      this.state.universityname.match(/^[a-zA-Z ]+$/) &&
      this.state.universityname !== null &&
      this.state.universityname !== ""
    ) {
      if (
        this.state.educationname.match(/^[a-zA-Z ]+$/) &&
        this.state.educationname !== null &&
        this.state.educationname !== ""
      ) {
        if (this.state.fromdate < this.state.todate) {
          console.log(this.state);
          return true;
        } else {
          alert("Please enter valid date");
        }
      } else {
        alert("Please enter valid Education or Course name");
      }
    } else {
      alert("Please enter valid university name");
    }
  }
  handleSubmit = (e) => {
    if (this.handlevalidation()) {
      axios
        .post("profile/educationroute/add/" + this.state.id, this.state)
        .then((res) => {
          if (res.status === 200) {
            alert("Education inserted successfully");
            this.props.history.push("/profile");
          } else {
            alert("Please verify the details");
          }

        });
    }
    e.preventDefault();
  };
  handleCancel = (e) => {
    this.props.history.push("/profile");
    e.preventDefault();
  };
  render() {
    const userdetails = this.props.location.state;
    if (!userdetails)
      return (
        <div>
          <h1> Please wait some time.... </h1>{" "}
        </div>
      );

    return (
      <div className="container" style={{ width: "60%",marginTop:"2cm" }}>
        <p>Youre in create education page</p>
        <Form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <Form.Label>Education Name</Form.Label>
            <BsAsterisk size={10} style={{ color: "#eb3440" }}></BsAsterisk>
            <Form.Control
              name="educationname"
              type="text"
              onChange={this.handleChange}
              placeholder="Education Name"
              required
            />
          </div>
          <div className="form-group">
            <Form.Label>University Name</Form.Label>
            <BsAsterisk size={10} style={{ color: "#eb3440" }}></BsAsterisk>
            <Form.Control
              name="universityname"
              type="text"
              onChange={this.handleChange}
              placeholder="University Name"
              required
            />
          </div>
          <div className="form-group">
            <Form.Label>From Date</Form.Label>
            <BsAsterisk size={10} style={{ color: "#eb3440" }}></BsAsterisk>
            <Form.Control
              name="fromdate"
              type="date"
              onChange={this.handleChange}
              placeholder="From Date"
              required
            />
          </div>
          <div className="form-group">
            <Form.Label>To Date</Form.Label>
            <BsAsterisk size={10} style={{ color: "#eb3440" }}></BsAsterisk>
            <Form.Control
              name="todate"
              type="date"
              onChange={this.handleChange}
              placeholder="To Date"
              required
            />
            <Form.Text className="text-muted">
              Kindly add anticipated date if currently pursuing
            </Form.Text>
          </div>
          <div className="form-group">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              type="text"
              onChange={this.handleChange}
              placeholder="Description"
            />
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "auto" }}>
              <Button
                variant="secondary"
                type="submit"
                onClick={this.handleCancel}
              >
                Cancel
              </Button>
            </div>
            <div>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}
