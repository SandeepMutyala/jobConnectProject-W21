/**Author: Geetanjali Bommera */
import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { BsAsterisk } from "react-icons/bs";

export default class WriteReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.location.state.user,
            id: this.props.location.state.cid,
            rating: "",
            comments: "",
            existingratings: []
        };
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };
    componentDidMount() {
        axios
            .get("/courses/getratings/" + this.state.id)
            .then((res) => {

                var string = JSON.stringify(res.data.ratings);
                var objectValue = JSON.parse(string);
                this.setState({ existingratings: objectValue });
            })
            .catch((error) => {
                console.log("Error:", error);
            });
    }
  
    handleSubmit = (e) => {
            axios
                .post("/courses/addrating/" + this.state.id, this.state)
                .then((res) => {
                    if (res.status === 200) {
                        alert("Rating inserted successfully");
                        this.props.history.push("/viewcourses");
                    } else {
                        alert("Please verify the details");
                    }

                });
        e.preventDefault();
    };
    handleCancel = (e) => {
        this.props.history.push("/viewcourses");
        e.preventDefault();
    };
    render() {
        console.log(this.props.location.state.user)
        return (
            <div className="container" style={{ marginTop:"2cm",width: "60%" }}>
                I am in Write Ratings page
                <Form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <Form.Label>Ratings</Form.Label>
                        <BsAsterisk size={10} style={{ color: "#eb3440" }}></BsAsterisk>
                        <Form.Control
                            name="rating"
                            type="Number"
                            onChange={this.handleChange}
                            placeholder="Rating"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <Form.Label>Review</Form.Label>
                        <BsAsterisk size={10} style={{ color: "#eb3440" }}></BsAsterisk>
                        <Form.Control
                            name="comments"
                            type="Text"
                            onChange={this.handleChange}
                            placeholder="Review...."
                            required
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
