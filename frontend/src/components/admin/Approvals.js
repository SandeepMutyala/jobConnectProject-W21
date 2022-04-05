/**Author: Raja Harshini Kasibhotla */
import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import DeleteRejectedEmployers from "./DeleteRejectedEmployers";
import UpdateEmployerStatus from "./UpdateEmployerStatus";

function Approvals() {
  const [employersList, setEmployersList] = useState({ employers: [] });
  const [approvedList, setApprovedList] = useState({ employers: [] });
  useEffect(() => {
    const fetchEmployers = async () => {
      const result = await axios(
        "http://localhost:4000/api/v1/admin/listEmployers"
      );

      setEmployersList(result.data);
      console.log("postfeed : " + employersList.employers);
    };

    const fetchApprovedEmployers = async () => {
      const result = await axios(
        "http://localhost:4000/api/v1/admin/listApprovedEmployers"
      );

      setApprovedList(result.data);
      console.log("postfeed : " + approvedList.employers);
    };

    fetchEmployers();
    fetchApprovedEmployers();
  }, []);

  return (
    <React.Fragment>
    <br/>
      <br/>
      <br/>
      <div class="row justify-content-center" style={{ marginTop: "50px" }}>
        <br />
        <ul id="ul-table">
          <table
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

      <div className="row justify-content-center" style={{ marginTop: "50px" }}>
        <br />
        <ul id="ul-table">
          <table
            className="table table-fixed table-striped table-bordered
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
    </React.Fragment>
  );
}

export default Approvals;
