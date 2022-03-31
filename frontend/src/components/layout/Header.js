import React, { Fragment } from "react";
import { Route, Link } from "react-router-dom";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../actions/userActions";

function Header() {
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Fragment>
      <nav className="navbar row">
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
                <Link className="dropdown-item" to="/profile">
                  Profile
                </Link>
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
            !loading && (
              <Link to="/login" className="btn ml-4" id="login_btn">
                Login
              </Link>
            )
          )}
        </div>
      </nav>
    </Fragment>
  );
}

export default Header;
