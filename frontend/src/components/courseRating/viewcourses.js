/**Author: Geetanjali Bommera */
import React, { Component } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";



class ViewCourses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // userdata: this.props.location.state,
            user: this.props.state_Data.auth.user.email,
            courses: [],
            cid: "",
            DataisLoaded: false,
        };

    }

    componentDidMount() {
        console.log(this.state)
        axios
            .get("/courses/getallcourses")
            .then((res) => {
                var string = JSON.stringify(res.data.docs);
                var objectValue = JSON.parse(string);
                console.log(objectValue)
                this.setState({ courses: objectValue });
                this.setState({ DataisLoaded: true });
                console.log(this.state.courses)
            })
            .catch((error) => {
                console.log("Error:" + error);
            });
    }

    Ratings(courseid) {
        this.props.history.push("/viewratings", courseid);
    }
    render() {
        const { DataisLoaded, items } = this.state;
        if (!DataisLoaded)
            return (
                <div>
                    <h1> Please wait some time.... </h1>{" "}
                </div>
            );
        return (
            <div className="container" style={{ marginTop:"2cm",width: "60%" }}>
                I am in view courses page
                {this.state.courses.map((item, index) => (
                    <div key={index} style={{ width: "60%", margin: "auto", textAlign: "center" }}>
                        <Card border="primary" key={item.coursename}>
                            <Card.Header>
                                {item.coursename}
                            </Card.Header>
                            <Card.Text >{item.description}</Card.Text>
                            <Card.Text >Price: {item.price} CAD</Card.Text>
                            <Button
                                onClick={this.Ratings.bind(this, item._id)}
                            >
                                View Ratings
                            </Button>
                            <br></br>
                            <Button
                                onClick={() =>
                                    this.setState({
                                        cid: item._id
                                    }, () => this.props.history.push("/writereview", this.state)
                                    )
                                }
                            >
                                Give Review
                            </Button>
                        </Card>

                        <br></br>
                    </div>
                ))

                }
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    state_Data: state,
});

export default connect(mapStateToProps, null)(ViewCourses); 