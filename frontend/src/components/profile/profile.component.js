import React, { Component } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { MdModeEditOutline } from "react-icons/md";
import moment from "moment";
import { connect } from "react-redux";
import Image from "react-bootstrap/Image";
import SearchUser from "./searchUser.component";
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
    console.log(mailid);
    // if(mailid){
    //   loggedin = true

    // }else{
    //   loggedin = false
      
    // }
    axios
      .get("/profile/", { params: { email: mailid } })
      .then((res) => {
        console.log(res);
        var string = JSON.stringify(res.data.docs);
        var objectValue = JSON.parse(string);

        this.setState({ educations: objectValue["UserEducation"] });
        this.setState({ experiences: objectValue["UserExperience"] });
        this.setState({ summary: objectValue["summary"] });
        this.setState({ id: objectValue["_id"] });

        // this.setState({profileImg:objectValue["profileImg"]})
      })
      .catch((error) => {
        console.log("Error:" + error);
      });

    // console.log("id",this.state.id)

    fetch("/profile/getprofileimage/" + this.state.email)
      .then((res) => res.json())
      .then((data) => {
        var base64Flag = "data:image/jpeg;base64,";
        var imageStr = this.arrayBufferToBase64(data.data.data);

        this.setState({ profileImg: base64Flag + imageStr });
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
  onFileChange = (e) => {
    console.log(e.target.files[0]);
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
    fetch("/profile/getprofileimage/" + this.state.email)
      .then((res) => res.json())
      .then((data) => {
        var base64Flag = "data:image/jpeg;base64,";
        var imageStr = this.arrayBufferToBase64(data.data.data);

        this.setState({ profileImg: base64Flag + imageStr });
      });
  };
  render() {
    // console.log("PROPS:",this.props)
    // console.log("STATE:",this.props.state_Data)
    // console.log("profileid:", this.props.state_Data.auth.auth.profile_id)
    // console.log("username",this.props.state_Data.auth.user.name)
    // console.log("email",this.props.state_Data.auth.user.email)
    
    return (
      <div className="container" style={{ width: "60%" }}>
        <h3 style={{ margin: "0.2cm", textAlign: "center" }}>
          My Profile Details
        </h3>
        {/* <SearchUser></SearchUser> */}
        <Card border="primary" style={{ display: "flex" }}>
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "auto" }}>
              <Card.Img
                src={this.state.profileImg}
                style={{ height: "4cm", width: "4cm" }}
              ></Card.Img>
            </div>
            <div>
              <form onSubmit={this.onImgSubmit.bind(this)}>
                <div className="form-group">
                  <input
                    type="file"
                    name="pimg"
                    onChange={this.onFileChange.bind(this)}
                  />
                </div>
                <div className="form-group">
                  <button className="btn btn-primary" type="submit">
                    Upload
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Card>
        <br></br>
        {/* <div style={{textAlign:"center"}}>
        <Image src={this.state.profileImg} style={{ height: "4cm",width:"4cm" }}roundedCircle></Image>
        </div> */}
        {/* <form onSubmit={this.onImgSubmit.bind(this)}>
          <div className="form-group">
            <input
              type="file"
              name="pimg"
              onChange={this.onFileChange.bind(this)}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" type="submit">
              Upload
            </button>
          </div>
        </form> */}

        <Card border="primary" className="bg">
          <div></div>
          <Card.Header>
            <Card.Title>
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: "auto" }}>Summary</div>
                <div>
                  {(() => {
                    if (!this.state.id) {
                      <Link
                        to={{
                          pathname: "editSummary/",
                          state: { id: this.state.id },
                        }}
                      >
                        <Button variant="outline-dark" size="sm">
                          <MdModeEditOutline></MdModeEditOutline>
                        </Button>
                      </Link>;
                    } else {
                      <div>not logged in</div>;
                    }
                  })()}
                </div>
              </div>
            </Card.Title>
          </Card.Header>
          {/* <Card.Header>
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
          </Card.Header> */}
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
