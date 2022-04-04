/**Author: Raja Harshini Kasibhotla */

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

function UpdateEmployerStatus(props) {
  const [userId, setuserId] = useState(props.id);
  function updateStatus() {
    setuserId(props.id);
    console.log(userId);
    axios.post(
      "http://localhost:4000/api/v1/admin/updateEmployerVerificationStatus",
      {
        id: userId,
      }
    );
  }
  return (
    <button
      type="button"
      className="btn btn-success btn-sm"
      onClick={updateStatus}
    >
      Approve
    </button>
  );
}

export default UpdateEmployerStatus;
