/* author bijitashya*/

import React, { Fragment, useState, useEffect } from "react";
import Loader from "../layout/Loader";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearErrors } from "../../actions/userActions";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, loading, message } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, alert, error, message]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(forgotPassword(email));
  };

  const enabled = email.length > 0;

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="row wrapper">
            <div
              className="col-10 col-lg-5"
              style={{ marginTop: "150px", maxWidth: "500px" }}
            >
              <form
                className="shadow-lg"
                style={{ height: "476px, !important" }}
                onSubmit={submitHandler}
              >
                <h1 className="mb-3">Forgot Password</h1>
                <div className="form-group">
                  <label htmlFor="email_field">Enter Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <Link to="/login" className="float-right mt-1">
                  Back to Login
                </Link>

                <button
                  id="forgot_password_button"
                  type="submit"
                  className="btn btn-block py-3"
                  style={{ marginTop: "1.2rem" }}
                  disabled={!enabled}
                >
                  Send Email
                </button>
              </form>
            </div>
          </div>
        </Fragment>
      )}
      ;
    </Fragment>
  );
};

export default ForgotPassword;
