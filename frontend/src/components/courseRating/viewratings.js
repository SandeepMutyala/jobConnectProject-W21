/**Author: Geetanjali Bommera */
import React, { Component } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";

export default class ViewRatings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courseid: this.props.location.state,
            ratings: [],
            DataisLoaded: false

        };
    }
    componentDidMount() {
        axios
            .get("/courses/getratings/" + this.state.courseid)
            .then((res) => {

                var string = JSON.stringify(res.data);
                var objectValue = JSON.parse(string);
                this.setState({ ratings: objectValue["ratings"] });
                console.log(this.state.ratings)
                this.setState({ DataisLoaded: true });
            })
            .catch((error) => {
                console.log("Error:" + error);
            });
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
            <div className="container"  style={{ marginTop:"2cm",width: "60%" }}>
                Ratings are here
                {/* {console.log(this.state.ratings)} */}
                {this.state.ratings.map((item, index) => (
                    <div key={index} style={{ width: "60%", margin: "auto", textAlign: "center" }}>
                        <Card border="primary" key={item.user}>
                            <Card.Header>
                                {item.user}
                            </Card.Header>
                            <Card.Text >Ratings: {item.rating} /5</Card.Text>
                            <Card.Text >Reviews: {item.comments}</Card.Text>
                        </Card>
                        <br></br>
                    </div>
                ))
                }

            </div>
        );
    }
}
