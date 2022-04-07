/**Author: Raja Harshini Kasibhotla */
import React, { useEffect, useState } from "react";
import axios from "axios";

function DeleteJobPostings(props) {
  var styleButton = {
    height: "auto",
    width: "150px",
    float: "right",
    textAlign: "center",
  };
  const [userId, setuserId] = useState(props.id);
  function deletePost() {
    setuserId(props.id);
    console.log(userId);
    axios.delete("/api/v1/admin/deleteJobPosts", {
      data: {
        id: userId,
      },
    });
    window.location.reload(false);
  }
  return (
    <button
      style={styleButton}
      type="button"
      className="btn btn-primary btn-small"
      onClick={() => {
        deletePost();
        props.ref();
      }}
    >
      Delete
    </button>
  );
}

export default DeleteJobPostings;
