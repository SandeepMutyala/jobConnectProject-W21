/**Author: Geetanjali Bommera */
import React, { Component } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { MdModeEditOutline } from "react-icons/md";
import moment from "moment";
import { connect } from "react-redux";
import { MdUpload } from "react-icons/md";
const Education = (props) => (
  <Card border="primary">
    <Card.Body>
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "auto" }}>
          <Card.Title>{props.education.educationname}</Card.Title>
        </div>
        <div>
          <Link
            to={{
              pathname: "updateEducation",
              state: { id: props.id, education: props.education },
            }}
          >
            <Button variant="outline-dark" size="sm">
              <MdModeEditOutline></MdModeEditOutline>
            </Button>
          </Link>
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
  </Card>
);

const Experience = (props) => (
  <Card border="primary">
    <Card.Body>
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "auto" }}>
          <Card.Title>{props.experience.role}</Card.Title>
        </div>
        <div>
          <Link
            to={{
              pathname: "updateExperience",
              state: { id: props.id, experience: props.experience },
            }}
          >
            <Button variant="outline-dark" size="sm">
              <MdModeEditOutline></MdModeEditOutline>
            </Button>
          </Link>
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
  </Card>
);
class Profile extends Component {
  state = {
    id: "",
    name: this.props.state_Data.auth.user.name,
    email: this.props.state_Data.auth.user.email,
    summary: "",
    educations: [],
    experiences: [],
    user: {},
    profileImg: "",
    uploadImg: "",
  };

  arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }
  componentDidMount() {
    var mailid = this.state.email;

    if (mailid) {
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
    } else {
      // alert("Please login");
      this.props.history.push("/");
    }
  }

  educationslist() {
    const id = this.state.id;
    return this.state.educations.map((current) => {
      const key_id = id;

      return (
        <Education
          education={current}
          deleteEducation={this.deleteEducation}
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
          deleteExperience={this.deleteExperience}
          id={key_id}
          key={current._id}
        />
      );
    });
  }

  handleAdd = (e) => {
    this.props.history.push("/addEducation", this.state);
    e.preventDefault();
  };
  handleAddExperience = (e) => {
    this.props.history.push("/addExperience", this.state);
    e.preventDefault();
  };
  onFileChange = (e) => {
    this.setState({ uploadImg: e.target.files[0] });
  };
  onImgSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("profileImg", this.state.uploadImg);
    axios
      .post("profile/profileimage/" + this.state.id, formData, {})
      .then((res) => {
        console.log("Image uploaded", res);
      });

    alert("Profile picture is updated");
    // fetch("/profile/getprofileimage/" + this.state.email)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     var base64Flag = "data:image/jpeg;base64,";
    //     var imageStr = this.arrayBufferToBase64(data.data.data);

    //     this.setState({ profileImg: base64Flag + imageStr });
    //   });
  };
  searchusers = (e) => {
    console.log("I am inside serach");
    this.props.history.push("/searchuser", this.state);
    e.preventDefault();
  };
  render() {
    return (
      <div className="container" style={{ marginTop:"2cm",width: "60%" }}>
        <h3 style={{ margin: "0.2cm", textAlign: "center" }}>My Profile</h3>
        <Card border="primary" style={{ display: "flex" }}>
          <Form onSubmit={this.onImgSubmit.bind(this)}>
            <Card.Header style={{ display: "flex" }}>
              <Card.Title style={{ marginRight: "auto" }}>
                <strong>{this.state.name}</strong>
              </Card.Title>
              <Button onClick={this.searchusers}>View profiles</Button>
            </Card.Header>
            {/* <Card.Body style={{ display: "flex" }}>
              <Card.Img
                src={this.state.profileImg ? this.state.profileImg:""}
                style={{ marginRight: "auto", height: "4cm", width: "4cm" }}
                alt = "Please upload your picture"
              ></Card.Img>
              <Form.Group controlId="formFileSm" className="mb-3">
                <div
                  style={{
                    display: "flex",
                    height: "max-content",
                    marginBottom: "auto",
                  }}
                >
                  <Form.Control
                    size="sm"
                    type="file"
                    name="pimg"
                    onChange={this.onFileChange.bind(this)}
                  />
                  <Button variant="outline-dark" size="sm" type="submit">
                    <MdUpload></MdUpload>
                  </Button>
                </div>
                <div></div>
              </Form.Group>
            </Card.Body> */}
          </Form>
        </Card>
        <br></br>
        <Card border="primary" className="bg">
          <div></div>
          <Card.Header>
            <Card.Title>
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: "auto" }}>Summary</div>
                <div>
                  <Link
                    to={{
                      pathname: "editSummary",
                      state: { id: this.state.id },
                    }}
                  >
                    <Button variant="outline-dark" size="sm">
                      <MdModeEditOutline></MdModeEditOutline>
                    </Button>
                  </Link>
                </div>
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
                <div>
                  <Button variant="primary" onClick={this.handleAdd}>
                    Add
                  </Button>
                </div>
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
                <div>
                  <Button variant="primary" onClick={this.handleAddExperience}>
                    Add
                  </Button>
                </div>
              </div>
            </Card.Title>
          </Card.Header>
          <Card.Body>{this.experienceslist()}</Card.Body>
        </Card>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  state_Data: state,
});

export default connect(mapStateToProps, null)(Profile);
