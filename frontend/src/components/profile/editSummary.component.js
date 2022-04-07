/**Author: Geetanjali Bommera */
import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default class EditSummary extends Component {
  state = {
    id: this.props.location.state.id,
    summary: "",
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleCancel = (e) => {
    this.props.history.push("/profile");

    e.preventDefault();
  };
  componentDidMount() {
    axios
      .get("profile/userheader/" + this.state.id)
      .then((res) => {
        var data = JSON.stringify(res.data.summary);
        var objectValue = JSON.parse(data);
        this.setState({ summary: objectValue });
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }
  handleSubmit = (e) => {
    axios
      .post("/profile/userheader/update/" + this.state.id, this.state)
      .then((res) => {
        if (res.status === 200) {
          alert("Summary updated successfully");
          this.props.history.push("/profile");
        } else {
          alert("Please verify the details");
        }
      });
    e.preventDefault();
  };
  render() {
    return (
      <div className="container" style={{ width: "60%" ,marginTop:"2cm"}}>
        <Form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <Form.Label>Summary</Form.Label>
            <Form.Control
              name="summary"
              type="text"
              onChange={this.handleChange}
              placeholder="Tell us about yourself"
              value={this.state.summary}
              required
            />
            <br></br>
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
