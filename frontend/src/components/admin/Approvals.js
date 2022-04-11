/**Author: Raja Harshini Kasibhotla */
import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteRejectedEmployers from "./DeleteRejectedEmployers";
import UpdateEmployerStatus from "./UpdateEmployerStatus";

function Approvals() {
  var rowStyling = {
    width: "auto",
  };
  var ulTable = {
    display: "table-row",
  };
  var tableStyle = {
    alignSelf: "center",
    border: "1px solid black",
  };
  var divStyle = {
    align: "center",
  };

  var h4style = {
    fontFamily: '"Times New Roman", Times, serif',
    fontSize: "25px",
    fontStyle: "italic",
    fontWeight: "bold",
    alignItems: "center",
    color: "red"
  };

  var h4Successstyle = {
    fontFamily: '"Times New Roman", Times, serif',
    fontSize: "25px",
    fontStyle: "italic",
    fontWeight: "bold",
    alignItems: "center",
    color: "green"
  };

  const [employersList, setEmployersList] = useState({ employers: [] });
  const [approvedList, setApprovedList] = useState({ employers: [] });
  useEffect(() => {
    const fetchEmployers = async () => {
      const result = await axios("/api/v1/admin/listEmployers");

      setEmployersList(result.data);
      console.log("postfeed : " + employersList.employers);
    };

    const fetchApprovedEmployers = async () => {
      const result = await axios("/api/v1/admin/listApprovedEmployers");

      setApprovedList(result.data);
      console.log("postfeed : " + approvedList.employers);
    };

    fetchEmployers();
    fetchApprovedEmployers();
  }, []);

  return (
    <React.Fragment>
      <br />
      <br />
      <br />
      <div align="center">
        <div style={rowStyling} className="justify-content-center">
        <br />
          <h4 style={h4style}>Pending Approvals</h4>
          <ul style={ulTable}>
            <table
              style={tableStyle}
              className="table table-fixed table-striped table-bordered
                table-sm same-col-widths table-responsive"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employersList.employers.map((post) => (
                  <tr key={post._id}>
                    <td>{post.name}</td>
                    <td>{post.email}</td>
                    <td>
                      <UpdateEmployerStatus id={post._id} />
                      <DeleteRejectedEmployers id={post._id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ul>
        </div>

        <div style={rowStyling} className="justify-content-center">
          <br />
          <h4 style={h4Successstyle}>Approved Employers</h4>
          <ul style={ulTable}>
            <table
              style={tableStyle}
              className="table table-striped table-bordered
                table-sm same-col-widths table-responsive"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {approvedList.employers.map((post) => (
                  <tr key={post._id}>
                    <td>{post.name}</td>
                    <td>{post.email}</td>
                    <td>Approved</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Approvals;
