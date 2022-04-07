/**Author: Raja Harshini Kasibhotla */
import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteJobPostings from "./DeleteJobPostings";
import { Link } from "react-router-dom";
function GetExpiredJobPostings() {
  const [filteredPosts, setFilteredPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const result = await axios("/api/v1/admin/listExpiredPostings");

      setFilteredPosts(result.data.expiredPosts);
      console.log("expired Posts : " + filteredPosts.posts);
    };

    fetchPosts();
  }, []);
  var customCont = {
    paddingTop: "50px",
    " paddingLeft": "10px",
    " paddingBottom": "0px",
  };
  var container = {
    paddingTop: "50px",
    alignItems: "center",
    paddingLeft: "350px",
  };
  var h4style = {
    color: "red",
    " alignItems": "center",
    fontFamily: '"Times New Roman", Times, serif',
    fontSize: "20px",
    fontStyle: "italic",
    fontWeight: "bold",
  };
  var customCardHeaderPost = {
    backgroundColor: "rgb(213, 217, 223)",
    padding: " 0rem 0rem",
  };
  var customh5 = {
    fontFamily: '"Times New Roman", Times, serif',
    fontSize: "20px",
    fontStyle: "italic",
    fontWeight: "bold",
    color: "rgb(70, 37, 37)",
    paddingLeft: "20px",
    paddingTop: "20px",
  };
  var listStyle = { listStyleType: "none" };
  var postImage = {
    border: "1px solid #ddd",
    float: "left",
    marginTop: "0px",
    width: " 55px",
  };
  var customCard = {
    height: "auto",
    width: "750px",
    backgroundColor: "aliceblue",
    borderColor: "black",
    //"box-shadow": '0 4px 8px 0 rgba(203, 189, 246, 0.2)', '0 6px 20px 0 rgba(196, 153, 239, 0.19)'
  };
  return (
    <React.Fragment>
      <br />
      <br />
      <br />
      <div style={customCont}>
        <Link to="/admin/jobpostings" className="btn btn-primary">
          Go Back To All Postings
        </Link>
      </div>
      <div>
        <h4 style={h4style} align="center">
          {" "}
          Expired Job Postings
        </h4>
        <div style={container} className="container-fluid d-flex">
          <ul>
            {filteredPosts.length <= 0 ? (
              <h5
                style={{
                  paddingLeft: "20px",
                  paddingTop: "20px",
                  alignSelf: "center",
                }}
                align="center"
              >
                No Posts Found
              </h5>
            ) : (
              filteredPosts.map((post) => (
                <li style={listStyle} key={post._id}>
                  <div className="col-md-12 col-lg-4 col-sm-3">
                    <div className="card" style={customCard}>
                      <div className="card-header" style={customCardHeaderPost}>
                        <img
                          style={postImage}
                          src={post.companyLogoUrl}
                          className="card-img-top"
                          alt="..."
                        ></img>
                        <h5 className="card-title" style={customh5}>
                          {post.companyName} is hiring !!!!
                        </h5>
                      </div>
                      <div className="card-body">
                        <p className="card-text">
                          <strong> Role: </strong> {post.jobTitle}
                          <br />
                          <strong>Role Description: </strong>{" "}
                          {post.jobShortDescription}
                          <br />
                          {post.jobShortDescription}
                          <br />
                          <strong>LastDateToApply: </strong>{" "}
                          {post.lastDateToApply}
                        </p>
                        <DeleteJobPostings id={post._id} />
                        <br />
                      </div>
                    </div>
                  </div>
                  <br />
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}

export default GetExpiredJobPostings;
