/**Author: Raja Harshini Kasibhotla */
import React, { useEffect, useState } from "react";
import axios from "axios";
import DeletePosts from "./DeletePosts";
import DeleteComments from "./DeleteComments";

function PostFeed() {
  const [postFeed, setPostFeed] = useState([]);
  const [postComments, setPostComments] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const result = await axios("/api/v1/admin/displayPosts").then(
        (result) => {
          console.log(result.data.posts);
          setPostFeed(result.data.posts);
          console.log(postFeed);
        }
      );
    };
    const fetchComments = async () => {
      const commentsData = await axios("/api/v1/admin/displayComments")
        .then((commentsData) => {
          console.log(commentsData.data.comments);
          setPostComments(commentsData.data.comments);
        })
        .catch((error) => console.log(error));
    };
    fetchPosts();
    fetchComments();
  }, []);

  return (
    <React.Fragment>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
          <a className="navbar-brand" href="#">
            &nbsp; &nbsp; JobConnect
          </a>
          <div className="navbar-header">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="/admin/postFeed">
                  Home <span className="sr-only"></span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin/approvals">
                  Approvals
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Job Postings
                </a>
              </li>
            </ul>
            <ul className="navbar-nav navbar-right">
              <a className="btn btn-danger btn-xsmall" href="/login">
                Logout
              </a>
            </ul>
          </div>
        </nav>
      </div>
      <div id="container" className="container-fluid d-flex">
        <ul>
          {postFeed.length == 0 ? (
            <h1>No Posts Found</h1>
          ) : (
            postFeed.map((post) => (
              <li id="custom-list" key={post._id}>
                <div class="col-md-12 col-lg-4 col-sm-3">
                  <div className="card" id="custom-card">
                    <div className="card-header" id="custom-card-header">
                      <img
                        id="post-image"
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
                        className="card-img-top"
                        alt="..."
                      ></img>
                      <h5 className="card-title" id="custom-h5">
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{post.userName}
                      </h5>
                    </div>
                    <div className="card-body">
                      <p className="card-text">{post.postMessage}</p>
                      <DeletePosts id={post._id} />
                      <br />
                      <h6>
                        <b>
                          <pre> Comments</pre>
                        </b>
                      </h6>
                      <ul>
                        {postComments.length === 0 ? (
                          <h1>No Comments found for this post </h1>
                        ) : (
                          Object.values(postComments)
                            .filter((comment) =>
                              comment.postID.includes(post._id)
                            )
                            .map((comment) => (
                              <li id="custom-list" key={comment._id}>
                                <div
                                  className="card inline-card"
                                  id="custom-inline-card"
                                >
                                  <div
                                    className="card-header"
                                    id="custom-inline-card-header"
                                  >
                                    <img
                                      id="post-image"
                                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
                                      className="card-img-top"
                                      alt="..."
                                    ></img>
                                    <h5 className="card-title" id="custom-h5">
                                      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                      {comment.respondedUserName}
                                    </h5>
                                  </div>
                                  <div className="card-body">
                                    <p className="card-text">
                                      {comment.commentMessage}
                                    </p>
                                    <DeleteComments id={comment._id} />
                                    <br />
                                  </div>
                                </div>
                              </li>
                            ))
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
                <br />
              </li>
            ))
          )}
        </ul>
      </div>
    </React.Fragment>
  );
}

export default PostFeed;
