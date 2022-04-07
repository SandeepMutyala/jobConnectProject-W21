/**Author: Raja Harshini Kasibhotla */
import React, { useEffect, useState } from "react";
import axios from "axios";

function DeleteRejectedEmployers(props) {
  const [userId, setuserId] = useState(props.id);
  function deleteEmployers() {
    setuserId(props.id);
    console.log(userId);
    axios.delete("/api/v1/admin/deleteRejectedEmployers", {
      data: {
        id: userId,
      },
    });
    window.location.reload(false);
  }
  return (
    <button
      type="button"
      className="btn btn-primary btn-sm"
      onClick={deleteEmployers}
    >
      Reject
    </button>
  );
}

export default DeleteRejectedEmployers;
