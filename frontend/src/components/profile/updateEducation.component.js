/**Author: Geetanjali Bommera */
import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import dateFormat from "dateformat";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { BsAsterisk } from "react-icons/bs";
export default class UpdateEducation extends Component {
  state = {
    id: this.props.location.state.education._id,
    educationname: this.props.location.state.education.educationname,
    universityname: this.props.location.state.education.universityname,
    fromdate: this.formatDate(this.props.location.state.education.fromdate),
    todate: this.formatDate(this.props.location.state.education.todate),
    description: this.props.location.state.education.description,
    show: false,
  };

  formatDate(date_final) {
    const date = new Date(date_final);
    const finaldate = dateFormat(date, "yyyy-mm-dd");
    return finaldate;
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    if (this.handlevalidation()) {
      axios
        .post("/profile/educationroute/update/" + this.state.id, this.state)
        .then((res) => {
          if (res.status === 200) {
            alert("Education updated successfully");
            this.props.history.push("/profile");
          } else {
            alert("Please verify the details");
          }
        });
    }
    e.preventDefault();
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
          return true;
        } else {
          alert("Please enter valid date");
        }
      } else {
        alert("Please enter valid Education or Course name");
      }
    } else {
      alert("Please enter valid University name");
    }
  }
  handleDelete = (e) => {
    confirmAlert({
      title: "Are you sure to delete",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            alert("Deleted successfully");
            this.confirmDelete();
          },
        },
        {
          label: "No",
          onClick: () => console.log("Deletion cancelled"),
        },
      ],
    });

    e.preventDefault();
  };
  confirmDelete = (e) => {
    axios
      .delete("/profile/educationroute/delete/" + this.state.id, this.state)
      .then((res) => {
        if (res.status === 200) {
          this.props.history.push("/profile");
        } else {
          alert("Please verify the details");
        }
      });
  };
  handleCancel = (e) => {
    this.props.history.push("/profile");
    e.preventDefault();
  };
  render() {
    return (
      <div className="container" style={{ width: "60%",marginTop:"2cm" }}>
        <p>Please edit education details</p>
        <Form>
          <div className="form-group">
            <Form.Label>Education Name</Form.Label>
            <BsAsterisk size={10} style={{ color: "#eb3440" }}></BsAsterisk>
            <Form.Control
              name="educationname"
              type="text"
              onChange={this.handleChange}
              placeholder="Education Name"
              value={this.state.educationname}
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
              value={this.state.universityname}
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
              value={this.state.fromdate}
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
              value={this.state.todate}
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
              value={this.state.description}
            />
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", margin: "2px" }}>
              <Button
                variant="danger"
                type="submit"
                onClick={this.handleDelete}
              >
                Delete
              </Button>
            </div>
            <div style={{ margin: "2px", marginRight: "auto" }}>
              <Button
                variant="secondary"
                type="submit"
                onClick={this.handleCancel}
              >
                Cancel
              </Button>
            </div>
            <div style={{ margin: "2px" }}>
              <Button
                variant="primary"
                type="submit"
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}
