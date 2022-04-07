/**Author: Raja Harshini Kasibhotla */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function JobPostings() {
  var listStyle = { listStyleType: "none" };
  var containerstyle = {
    paddinTop: "50px",
    alignItems: "center",
    paddingLeft: "350px",
  };
  var customCard = {
    height: "auto",
    width: "750px",
    backgroundColor: "aliceblue",
    borderColor: "black",
    //"box-shadow": '0 4px 8px 0 rgba(203, 189, 246, 0.2)', '0 6px 20px 0 rgba(196, 153, 239, 0.19)'
  };
  var customcardheader = {
    backgroundColor: "rgb(100, 138, 194)",
    padding: "0rem 0rem",
    opacity: 1,
  };
  var postImage = {
    border: "1px solid #ddd",
    float: "left",
    marginTop: "0px",
    width: " 55px",
  };
  var customInlineCard = {
    size: "flex",
    backgroundColor: "aliceblue",
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
  var customCont = {
    paddingTop: "50px",
    paddingLeft: "10px",
    paddingBottom: "0px",
  };
  var customInlineCardHeader = {
    backgroundColor: "rgb(185, 250, 230)",
    padding: " 0rem 0rem",
  };
  var customCardHeaderPost = {
    backgroundColor: "rgb(213, 217, 223)",
    padding: " 0rem 0rem",
  };
  const [jobPosts, setJobPost] = useState({ posts: [] });

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await axios("/api/v1/admin/listPosts");

      setJobPost(result.data);
      console.log("postfeed : " + jobPosts.posts);
    };

    fetchPosts();
  }, []);

  return (
    <React.Fragment>
      <br />
      <br />
      <br />
      <br />
      <div style={customCont}>
        <Link to="/admin/expiredJobPostings" className="btn btn-primary">
          Get Expired Job Postings
        </Link>
      </div>
      <div>
        <h5 align="center">Job Postings</h5>
        <div style={containerstyle} className="container-fluid d-flex">
          <ul>
            {jobPosts.posts.length <= 0 ? (
              <h1>No Posts Found</h1>
            ) : (
              jobPosts.posts.map((post) => (
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
        )
      </div>
    </React.Fragment>
  );
}

export default JobPostings;
