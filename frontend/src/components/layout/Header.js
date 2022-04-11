/* author bijitashya*/

import React, { Fragment } from "react";
import { Route, Link } from "react-router-dom";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../actions/userActions";

function Header() {
  const dispatch = useDispatch();

  let history = useHistory();

  const { user, loading } = useSelector((state) => state.auth);
  const logoutHandler = () => {
    dispatch(logout());
    setTimeout(() => {
      history.replace("/login");
    }, 200);
  };

  return (
    <Fragment>
      <nav className="navbar row fixed-top">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link className="nav-bar-link" to="/">
              <h3 className="brand-name">JobConnect</h3>
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 pr-5 text-right">
          {user ? (
            <div className="ml-2 dropdown d-inline">
              <Link
                to="#!"
                className="btn dropdown-toggle text-white mr-4"
                type="button"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src="/images/default_avatar.jpg"
                    alt="avatar"
                    className="rounded-circle"
                  />
                </figure>
                <span>{user && user.name}</span>
              </Link>

              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                {/* {user && user.role === "admin" && (
                  <Link className="dropdown-item" to="/dashboard_home">
                    Dashboard
                  </Link>
                )} */}
                {user && user.role === "admin" && (
                  <Link className="dropdown-item" to="/admin/postFeed">
                    PostFeed
                  </Link>
                )}

                {user && user.role === "admin" && (
                  <Link className="dropdown-item" to="/admin/jobPostings">
                    Job Postings
                  </Link>
                )}

                {user && user.role === "admin" && (
                  <Link className="dropdown-item" to="/admin/approvals">
                    Approvals
                  </Link>
                )}
                {user && user.role === "employer" && (
                  <Link className="dropdown-item" to="/employerDashboardHome">
                    Employer Dashboard
                  </Link>
                )}
                {user && user.role === "employee" && (
                  <Link className="dropdown-item" to="/homepage">
                    Post Feed
                  </Link>
                )}
                {user && user.role === "employee" && (
                  <Link className="dropdown-item" to="/JobSearch">
                    Job Search
                  </Link>
                )}
                {user && user.role === "employee" && (
                  <Link className="dropdown-item" to="/myposts">
                    My Posts
                  </Link>
                )}
                {user && user.role !== "admin" && (
                  <Link className="dropdown-item" to="/profile">
                    Profile
                  </Link>
                )}
                {user && user.role !== "admin" && (
                  <Link className="dropdown-item" to="/viewcourses">
                  Courses
                </Link>
                )}
                 {user && user.role === "admin" && (
                  <Link className="dropdown-item" to="/admin/addCourse">
                  Add Courses
                </Link>
                )}
                <Link
                  className="dropdown-item text-danger"
                  to="/"
                  onClick={logoutHandler}
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </nav>
    </Fragment>
  );
}

export default Header;
