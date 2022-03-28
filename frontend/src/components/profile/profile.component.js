import React, { Component } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { MdModeEditOutline } from "react-icons/md";
import moment from "moment";
import { connect } from "react-redux";
import Image from 'react-bootstrap/Image'
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
              pathname: "updateEducation/" + props.id,
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
    {/* <Card.Text>{props.education.todate}</Card.Text> */}
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
              pathname: "updateExperience/" + props.id,
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
        {console.log(props.experience.fromdate, props.experience.todate)}
        {moment.utc(props.experience.fromdate).format("MMMM YYYY")} {" - "}
        {moment.utc(props.experience.todate).format("MMMM YYYY")}
      </Card.Text>
      <Card.Text>{props.experience.description}</Card.Text>
    </Card.Body>
    {/* <Card.Text>{props.experience.todate}</Card.Text> */}
  </Card>
);

class Profile extends Component {
  state = {
    id: this.props.state_Data.auth.profile_id,
    summary: "",
    educations: [],
    experiences: [],
    user: {},
    profileImg:"",

  };

  componentDidMount() {
    axios
      .get("/profile/" + this.state.id)
      .then((res) => {
        var string = JSON.stringify(res.data.docs);
        var objectValue = JSON.parse(string);
        console.log(objectValue);
        this.setState({ educations: objectValue["UserEducation"] });
        this.setState({ experiences: objectValue["UserExperience"] });
        this.setState({ summary: objectValue["summary"] });
        this.setState({ id: objectValue["_id"] });
        this.setState({profileImg:objectValue["profileImg"]})
      })
      .catch((error) => {
        console.log("Error:" + error);
      });
  }

  educationslist() {
    const id = this.state.id;
    return this.state.educations.map((current) => {
      const key_id = id;

      return (
        <Education
          education={current}
          // history = {history}
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
          // history = {history}
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
  onFileChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    // this.setState({ profileImg: e.target.files[0] })
}
onImgSubmit(e) {
  console.log(this.state)
  e.preventDefault()
  const formData = new FormData()
  formData.append('profileImg', this.state.profileImg)
  axios.post("profile/profileimage/"+this.state.id, formData, {
  }).then(res => {
      console.log(res)
  })
}
  render() {
    // console.log("PROPS:",this.props)
    console.log("STATE:",this.props.state_Data)
    return (
      <div className="container" style={{ width: "60%" }}>
        <h3 style={{ margin: "0.2cm", textAlign: "center" }}>
          My Profile Details
        </h3>
        <Image src={this.state.profileImg} style={{maxWidth:"100%"}}></Image>
        {/* <form onSubmit={this.onImgSubmit}>
        <div className="form-group">
          <input type="file"onChange={this.onFileChange.bind(this)} />
        </div>
        <div className="form-group">
          <button className="btn btn-primary" type="submit">
            Upload
          </button>
        </div>
        </form> */}

        <Card border="primary" className="bg">
          <Card.Header>
            <Card.Title>
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: "auto" }}>Summary</div>
                <div>
                  <Link
                    to={{
                      pathname: "editSummary/",
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
