/**Author: Geetanjali Bommera */
import React, { Component } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import moment from "moment";
import { connect } from "react-redux";
const Education = (props) => (
  <Card border="primary">
    <Card.Body>
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "auto" }}>
          <Card.Title>{props.education.educationname}</Card.Title>
        </div>
      </div>

      <Card.Subtitle className="mb-2 text-muted">
        {props.education.universityname}
      </Card.Subtitle>
      <Card.Text>
        {moment.utc(props.education.fromdate).format("MMMM YYYY")} {" - "}
        {moment.utc(props.education.todate).format("MMMM YYYY")}
      </Card.Text>
      <Card.Text>{props.education.description}</Card.Text>
    </Card.Body>
    {/* <Card.Text>{props.education.todate}</Card.Text> */}
  </Card>
);

const Experience = (props) => (
  <div>
  <Card border="primary" >
    <Card.Body>
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "auto" }}>
          <Card.Title>{props.experience.role}</Card.Title>
        </div>
      </div>

      <Card.Subtitle className="mb-2 text-muted">
        {props.experience.company}
      </Card.Subtitle>
      <Card.Text>
        {moment.utc(props.experience.fromdate).format("MMMM YYYY")} {" - "}
        {moment.utc(props.experience.todate).format("MMMM YYYY")}
      </Card.Text>
      <Card.Text>{props.experience.description}</Card.Text>
    </Card.Body>
    {/* <Card.Text>{props.experience.todate}</Card.Text> */}
  </Card>
  <br></br>
  </div>
);
class User extends Component {
  state = {
    id: "",
    name: this.props.location.state.name,
    email: this.props.location.state.email,
    summary: "",
    educations: [],
    experiences: [],
    user: {},
    profileImg: "",
  };

  arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }
  componentDidMount() {
    var mailid = this.state.email;
    axios
      .get("/profile/", { params: { email: mailid } })
      .then((res) => {
        var string = JSON.stringify(res.data.docs);
        var objectValue = JSON.parse(string);

        this.setState({ educations: objectValue["UserEducation"] });
        this.setState({ experiences: objectValue["UserExperience"] });
        this.setState({ summary: objectValue["summary"] });
        this.setState({ id: objectValue["_id"] });
      })
      .catch((error) => {
        console.log("Error:" + error);
      });

    // fetch("/profile/getprofileimage/" + this.state.email)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     var base64Flag = "data:image/jpeg;base64,";
    //     if (Object.keys(data).length) {
    //       var imageStr = this.arrayBufferToBase64(data.data.data);

    //       this.setState({ profileImg: base64Flag + imageStr });
    //     }
    //   });
  }

  educationslist() {
    const id = this.state.id;
    return this.state.educations.map((current) => {
      const key_id = id;

      return (
        <Education
          education={current}
          
          id={key_id}
          key={current._id}
        />
      );
    });
  }

  experienceslist() {
    const id = this.state.id;
    return this.state.experiences.map((current) => {
      const key_id = id;

      return (
        <Experience
          experience={current}
         
          id={key_id}
          key={current._id}
        />
      );
    });
  }

  render() {
    return (
      <div className="container" style={{ width: "60%",marginTop:"2cm" }}>
        <h3 style={{ margin: "0.2cm", textAlign: "center" }}>
          {this.state.name}
        </h3>
        {/* <Card border="primary" style={{ display: "flex" }}>
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "auto" }}>
              <Card.Img
                src={this.state.profileImg}
                style={{ height: "4cm", width: "4cm" }}
              ></Card.Img>
            </div>
          </div>
        </Card> */}
        <br></br>

        <Card border="primary" className="bg">
          <div></div>
          <Card.Header>
            <Card.Title>
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: "auto" }}>Summary</div>
              </div>
            </Card.Title>
          </Card.Header>

          <Card.Body>
            <Card.Text>{this.state.summary}</Card.Text>
          </Card.Body>
        </Card>
        <br></br>
        <Card border="primary" className="bg">
          <Card.Header>
            <Card.Title>
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: "auto" }}>Education Details</div>
              </div>
            </Card.Title>
          </Card.Header>
          <Card.Body>{this.educationslist()}</Card.Body>
        </Card>
        <br></br>

        <Card border="primary" className="bg">
          <Card.Header>
            <Card.Title>
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: "auto" }}>Experience Details</div>
              </div>
            </Card.Title>
          </Card.Header>
          <Card.Body>{this.experienceslist()}</Card.Body>
        </Card>
      </div>
    );
  }
}

export default User;
