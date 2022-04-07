/**Author: Geetanjali Bommera */
import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { BsAsterisk } from "react-icons/bs";
export default class AddExperience extends Component {
  state = {
    id: this.props.location.state.id,
    role: "",
    company: "",
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
      this.state.company.match(/^[a-zA-Z ]+$/) &&
      this.state.company !== null &&
      this.state.company !== ""
    ) {
      if (
        this.state.role.match(/^[a-zA-Z ]+$/) &&
        this.state.role !== null &&
        this.state.role !== ""
      ) {
        if (this.state.fromdate < this.state.todate) {
          return true;
        } else {
          alert("Please enter valid date");
        }
      } else {
        alert("Please enter valid Experience or role name");
      }
    } else {
      alert("Please enter valid company name");
    }
  }
  handleSubmit = (e) => {
    if (this.handlevalidation()) {
      axios
        .post("/profile/experienceroute/add/" + this.state.id, this.state)
        .then((res) => {
          if (res.status === 200) {
            alert("Experience inserted successfully");
            this.props.history.push("/profile");
          } else {
            alert("Please verify the details");
          }

          console.log(res);
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
        <p>Youre in create experience page</p>
        <Form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <Form.Label>Role</Form.Label>
            <BsAsterisk size={10} style={{ color: "#eb3440" }}></BsAsterisk>
            <Form.Control
              name="role"
              type="text"
              onChange={this.handleChange}
              placeholder="Role"
              required
            />
          </div>
          <div className="form-group">
            <Form.Label>Company Name</Form.Label>
            <BsAsterisk size={10} style={{ color: "#eb3440" }}></BsAsterisk>
            <Form.Control
              name="company"
              type="text"
              onChange={this.handleChange}
              placeholder="Company Name"
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
              Kindly add anticipated date if currently working
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
