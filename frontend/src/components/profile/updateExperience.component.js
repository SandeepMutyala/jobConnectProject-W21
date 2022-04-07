/**Author: Geetanjali Bommera */
import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import dateFormat from "dateformat";
import { confirmAlert } from "react-confirm-alert"; 
import "react-confirm-alert/src/react-confirm-alert.css"; 
import { BsAsterisk } from "react-icons/bs";
export default class Updateexperience extends Component {
  state = {
    id: this.props.location.state.experience._id,
    role: this.props.location.state.experience.role,
    company: this.props.location.state.experience.company,
    fromdate: this.formatDate(this.props.location.state.experience.fromdate),
    todate: this.formatDate(this.props.location.state.experience.todate),
    description: this.props.location.state.experience.description,
    show: false,
  };
  showModal = (e) => {
    this.setState({ show: true });
  };
  hideModal = (e) => {
    this.setState({ show: false });
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
        .post("/profile/experienceroute/update/" + this.state.id, this.state)
        .then((res) => {
          if (res.status === 200) {
            alert("experience updated successfully");
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
        alert("Please enter valid experience or role name");
      }
    } else {
      alert("Please enter valid company name");
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

  confirmDelete() {
    axios
      .delete("/profile/experienceroute/delete/" + this.state.id, this.state)
      .then((res) => {
        if (res.status === 200) {
          this.props.history.push("/profile");
        } else {
          alert("Please verify the details");
        }
      });
  }
  handleCancel = (e) => {
    this.props.history.push("/profile");
    e.preventDefault();
  };
  render() {
    return (
      <div className="container" style={{ width: "60%",marginTop:"2cm" }}>
        <p>Please edit experience details</p>
        <Form>
          <div className="form-group">
            <Form.Label>Role</Form.Label>
            <BsAsterisk size={10} style={{ color: "#eb3440" }}></BsAsterisk>
            <Form.Control
              name="role"
              type="text"
              onChange={this.handleChange}
              placeholder="Role"
              value={this.state.role}
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
              value={this.state.company}
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
