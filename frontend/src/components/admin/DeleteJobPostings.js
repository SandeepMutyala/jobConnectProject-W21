/**Author: Raja Harshini Kasibhotla */
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

function DeleteJobPostings(props) {
  const [userId, setuserId] = useState(props.id);
  function deletePost() {
    setuserId(props.id);
    console.log(userId);
    axios.delete("http://localhost:4000/api/v1/admin/deleteJobPosts", {
      data: {
        id: userId,
      },
    });
    window.location.reload(false);
  }
  return (
    <button
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
