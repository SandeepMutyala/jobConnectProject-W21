/**Author: Geetanjali Bommera */
import React, { Component } from "react";
import axios from "axios";
import Card from "react-bootstrap/esm/Card";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";

const EachUser = (props) => (
  <div>
  <Card border="primary" >
    <Card.Header style={{ display: "flex" }}>
      <Card.Title style={{ marginRight: "auto" }}>
        {props.userdetails.name}
      </Card.Title>
      <Link
        to={{
          pathname: "fetchuser/" + props.userdetails._id,
          state: {
            email: props.userdetails.email,
            name: props.userdetails.name,
          },
        }}
      >
        View
      </Link>
    </Card.Header>
    <Card.Body>
      <Card.Text>{props.userdetails.summary}</Card.Text>
    </Card.Body>
  </Card>
  <br></br>
  </div>
);

export default class SearchUser extends Component {
  state = {
    user: "",
    allusers: [],
  };

  handleChange = (e) => {
    this.setState({ user: e.target.value });
  };
  componentDidMount() {
    axios
      .get("/profile/users")
      .then((res) => {
        var string = JSON.stringify(res.data.docs);
        var objectValue = JSON.parse(string);
        this.setState({ allusers: objectValue });
      })
      .catch((error) => {});
  }
  userlist = (e) => {
    return this.state.allusers.map((current) => {
      var t1 = current.name;
      var t2 = this.state.user;
      var t3 = t1.toUpperCase();
      var t4 = t2.toUpperCase();
      if (t3.includes(t4)) {
        return <EachUser userdetails={current} key={current._id} />;
      }
    });
  };

  render() {
    return (
      <div className="container" style={{width:"60%",marginTop:"2cm"}}>
        <Form.Group className="mb-3">
          <Form.Label>Profile Search</Form.Label>
          <Form.Control placeholder="Enter user name"
            type="text"
            onChange={this.handleChange.bind(this)}
            value={this.state.user}
          ></Form.Control>
        </Form.Group>
        <Card border="primary">
          <Card.Header>
            <Card.Title>Users</Card.Title>
          </Card.Header>
          <Card.Body>{this.userlist()}</Card.Body>
        </Card>
      </div>
    );
  }
}
