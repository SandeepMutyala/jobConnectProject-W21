/**Author: Raja Harshini Kasibhotla */
import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { Link } from "react-router-dom";

function JobPostings() {
  const [jobPosts, setJobPost] = useState({ posts: [] });

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await axios(
        "/api/v1/admin/listPosts"
      );

      setJobPost(result.data);
      console.log("postfeed : " + jobPosts.posts);
    };

    fetchPosts();
  }, []);

  return (
    <React.Fragment>
         <br/>
      <br/>
      <br/>
      <div id="custom-cont">
        <Link to="/admin/expiredJobPostings" className="btn btn-primary">
          Get Expired Job Postings
        </Link>
      </div>
      <div>
        <h5 align="center">Job Postings</h5>
        <div id="container" className="container-fluid d-flex">
          <ul>
            {jobPosts.posts.length <= 0 ? (
              <h1>No Posts Found</h1>
            ) : (
              jobPosts.posts.map((post) => (
                <li id="custom-list" key={post._id}>
                  <div className="col-md-12 col-lg-4 col-sm-3">
                    <div className="card" id="custom-card">
                      <div className="card-header" id="custom-card-header-post">
                        <img
                          id="post-image"
                          src={post.companyLogoUrl}
                          className="card-img-top"
                          alt="..."
                        ></img>
                        <h5 className="card-title" id="custom-h5">
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
