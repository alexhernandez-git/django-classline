import axios from "axios";
import Swal from "sweetalert2";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  STRIPE_CONNECTED,
  STRIPE_CONNECTED_SUCCESS,
  STRIPE_CONNECTED_FAIL,
} from "../types";

// SET TOKEN
// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: USER_LOADING });

  axios
    // .get("http://localhost:4000/users/1",
    .get(
      `/api/users/${
        getState().programReducer.program.code
      }/get_profile_platform`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {});
};
export const login = (data) => (dispatch, getState) => {
  console.log(data);
  axios
    .post(
      `/api/users/${
        getState().programReducer.program.code
      }/login_from_platform/`,
      data
    )
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const logout = () => (dispatch, getState) => {
  dispatch({ type: LOGOUT_SUCCESS });
};

export const updateProfile = (profile) => (dispatch, getState) => {
  dispatch({ type: UPDATE_PROFILE });
  let data = new FormData();
  if (profile.picture && profile.picture.name) {
    data.append("picture", profile.picture, profile.picture.name);
  }

  axios
    .patch("/api/users/profile/", data, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: res.data.profile.picture,
      });
    })
    .catch((err) => {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const updateUser = (user) => (dispatch, getState) => {
  console.log("user", user);
  dispatch({ type: UPDATE_USER });
  axios
    .patch(
      `/api/users/${getState().authReducer.user.code}/`,
      user,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const changePassword = (data) => (dispatch, getState) => {
  console.log(data);
  dispatch({
    type: CHANGE_PASSWORD,
  });
  axios
    .post("/api/users/change_password/", data, tokenConfig(getState))
    .then((res) => {
      console.log(res.data);
      Swal.fire({
        title: "Contraseña actualizada!",
        icon: "success",
        confirmButtonText: "Ok",
      });
      dispatch({
        type: CHANGE_PASSWORD_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: CHANGE_PASSWORD_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const connectStripe = (authCode) => (dispatch, getState) => {
  console.log(data);
  dispatch({
    type: STRIPE_CONNECTED,
  });
  axios
    .post(
      "/api/users/stripe_connect/",
      { code: authCode },
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: STRIPE_CONNECTED_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: STRIPE_CONNECTED_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
  // Get token from state
  let token = getState().authReducer.auth_token;
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
