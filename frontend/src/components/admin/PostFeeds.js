/**Author: Raja Harshini Kasibhotla */

import React, { useEffect, useState } from "react";
import axios from "axios";
import DeletePosts from "./DeletePosts";
import DeleteComments from "./DeleteComments";

function PostFeed() {
  const [postFeed, setPostFeed] = useState([]);
  const [postComments, setPostComments] = useState([]);
  var listStyle = { listStyleType: "none" };
  var containerstyle = {
    paddinTop: "100px",
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
  var customInlineCardHeader = {
    backgroundColor: "rgb(185, 203, 230)",
    padding: " 0rem 0rem",
  };
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
      <br />
      <br />
      <br />
      <br />
      <div style={containerstyle} className="container-fluid d-flex">
        <ul>
          {postFeed.length == 0 ? (
            <h1>No Posts Found</h1>
          ) : (
            postFeed.map((post) => (
              <li style={listStyle} key={post._id}>
                <div className="col-md-12 col-lg-4 col-sm-3">
                  <div className="card" style={customCard}>
                    <div className="card-header" style={customcardheader}>
                      <img
                        style={postImage}
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
                        className="card-img-top"
                        alt="..."
                      ></img>
                      <h5 className="card-title" style={customh5}>
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
                              <li style={listStyle} key={comment._id}>
                                <div
                                  className="card inline-card"
                                  style={customInlineCard}
                                >
                                  <div
                                    className="card-header"
                                    style={customInlineCardHeader}
                                  >
                                    <img
                                      style={postImage}
                                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
                                      className="card-img-top"
                                      alt="..."
                                    ></img>
                                    <h5 className="card-title" style={customh5}>
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
                                <br />
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
