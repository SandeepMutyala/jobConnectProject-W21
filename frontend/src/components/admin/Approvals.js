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
              <li className="nav-item">
                <a className="nav-link" href="/admin/postFeed">
                  Home <span className="sr-only"></span>
                </a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="/admin/approvals">
                  Approvals
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin/jobPostings">
                  Job Postings
                </a>
              </li>
            </ul>
            <ul class="navbar-nav navbar-right">
              <a className="btn btn-danger btn-xsmall" href="/login">
                Logout
              </a>
            </ul>
          </div>
        </nav>
      </div>
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
