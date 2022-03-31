/* author bijitashya*/

import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_ERRORS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  REGISTER_EMPLOYER_SUCCESS,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  NEW_PASSWORD_REQUEST,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_FAIL,
  REGISTER_PROFILE_ID,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/v1/login",
      { email, password },
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Register user
export const register = (name, email, password, role) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const { data } = await axios.post("/api/v1/register", {
      name,
      email,
      password,
      role,
    });
    var id;
      axios
      .post("/profile/userheader/update",data)
      .then((res) => {
        var string = JSON.stringify(res.data.id);
        var objectValue = JSON.parse(string);
        id = objectValue;
        dispatch({
          type: REGISTER_PROFILE_ID,
          payload: id,
        });
      })
      .catch((error) => {
        console.log("Error:" + error);
      });

    if (data.message) {
      dispatch({
        type: REGISTER_EMPLOYER_SUCCESS,
        payload: data.message,
      });
    } else {
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: data.user ? data.user : data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get("/api/v1/me");

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.get("/api/v1/logout");

    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

// Forgot password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/v1/password/forgot",
      { email },
      config
    );

    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Reset password
export const resetPassword =
  (token, password, confirmPassword) => async (dispatch) => {
    try {
      dispatch({ type: NEW_PASSWORD_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        `/api/v1/password/reset/${token}`,
        { password, confirmPassword },
        config
      );

      dispatch({
        type: NEW_PASSWORD_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: NEW_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };
