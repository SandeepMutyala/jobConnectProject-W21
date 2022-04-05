/**Author: Raja Harshini Kasibhotla */
import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import DeleteJobPostings from "./DeleteJobPostings";
import { Link } from "react-router-dom";
function GetExpiredJobPostings() {
  const [filteredPosts, setFilteredPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const result = await axios(
        "http://localhost:4000/api/v1/admin/listExpiredPostings"
      );

      setFilteredPosts(result.data.expiredPosts);
      console.log("expired Posts : " + filteredPosts.posts);
    };

    fetchPosts();
  }, []);

  return (
    <React.Fragment>
         <br/>
      <br/>
      <br/>
      <div id="custom-cont">
        <Link to="/admin/jobpostings" className="btn btn-primary">
          Go Back To All Postings
        </Link>
      </div>
      <div>
        <h4 align="center"> Expired Job Postings</h4>
        <div id="container" className="container-fluid d-flex">
          <ul>
            {filteredPosts.length <= 0 ? (
              <h1 align="center">No Posts Found</h1>
            ) : (
              filteredPosts.map((post) => (
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
