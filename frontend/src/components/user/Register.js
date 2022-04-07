/* author bijitashya*/

import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../../actions/userActions";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";

const Register = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const dispatch = useDispatch();

  const { isAuthenticated, error, loading, message } = useSelector(
    (state) => state.auth
  );
  const alert = useAlert();
  useEffect(() => {
    if (isAuthenticated) {
      history.replace("/homepage");
    }

    if (message) {
      alert.success(message);
      history.replace("/login");
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, alert, error, message, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password, role));
  };
  return (
    <Fragment>
      <div className="row wrapper">
        <div
          className="col-10 col-lg-5"
          style={{ marginTop: "100px", maxWidth: "500px" }}
        >
          <form
            className="shadow-lg"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <h1 className="mb-3">Register</h1>

            <div className="form-group">
              <label htmlFor="name_field">Name</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="role">User Type</label>
              <select
                className="form-control"
                value={role}
                name="role"
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option>Select Option</option>
                <option value="employer">Employer</option>
                <option value="employee">Employee</option>
              </select>
            </div>

            <Link to="/login" className="float-right mt-3">
              Back to Login
            </Link>

            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
