/**Author: Raja Harshini Kasibhotla */
import React, { useEffect, useState } from "react";
import axios from "axios";

function UpdateEmployerStatus(props) {
  var styleButton = {
    height: "auto",
    width: "150px",
    float: "right",
    textAlign: "center",
  };
  const [userId, setuserId] = useState(props.id);
  function updateStatus() {
    setuserId(props.id);
    console.log(userId);
    axios.post("/api/v1/admin/updateEmployerVerificationStatus", {
      id: userId,
    });
  }
  return (
    <button
      style={styleButton}
      type="button"
      className="btn btn-success btn-sm"
      onClick={updateStatus}
    >
      Approve
    </button>
  );
}

export default UpdateEmployerStatus;
