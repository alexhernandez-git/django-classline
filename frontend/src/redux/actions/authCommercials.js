import axios from "axios";
import Swal from "sweetalert2";

import {
  COMMERCIAL_LOADED,
  COMMERCIAL_LOADING,
  AUTH_COMMERCIAL_ERROR,
  LOGIN_COMMERCIAL_SUCCESS,
  LOGOUT_COMMERCIAL_SUCCESS,
  UPDATE_COMMERCIAL_PROFILE_SUCCESS,
  UPDATE_COMMERCIAL_PROFILE_FAIL,
  UPDATE_COMMERCIAL_PROFILE,
  UPDATE_COMMERCIAL_SUCCESS,
  UPDATE_COMMERCIAL_FAIL,
  UPDATE_COMMERCIAL,
  CHANGE_COMMERCIAL_PASSWORD,
  CHANGE_COMMERCIAL_PASSWORD_SUCCESS,
  CHANGE_COMMERCIAL_PASSWORD_FAIL,
  STRIPE_COMMERCIAL_CONNECTED,
  STRIPE_COMMERCIAL_CONNECTED_SUCCESS,
  STRIPE_COMMERCIAL_CONNECTED_FAIL,
} from "../types";

// SET TOKEN
// CHECK TOKEN & LOAD USER
export const loadCommercial = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: COMMERCIAL_LOADING });
  console.log(tokenConfig(getState));
  axios
    // .get("http://localhost:4000/users/1",
    .get(`/api/users/get_profile_from_dashboard`, tokenConfig(getState))
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: COMMERCIAL_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: AUTH_COMMERCIAL_ERROR,
      });
    });
};
export const login = (data) => (dispatch, getState) => {
  console.log(data);
  axios
    .post(`/api/users/login_to_dashboard/`, data)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: LOGIN_COMMERCIAL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: AUTH_COMMERCIAL_ERROR,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const logout = () => (dispatch, getState) => {
  dispatch({ type: LOGOUT_COMMERCIAL_SUCCESS });
};

export const updateProfile = (profile) => (dispatch, getState) => {
  dispatch({ type: UPDATE_COMMERCIAL_PROFILE });
  let data = new FormData();
  if (profile.picture && profile.picture.name) {
    data.append(
      "picture",
      profile.picture,
      Math.random().toString(36) + profile.picture.name
    );
  }

  axios
    .patch("/api/users/profile/", data, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: UPDATE_COMMERCIAL_PROFILE_SUCCESS,
        payload: res.data.profile.picture,
      });
    })
    .catch((err) => {
      dispatch({
        type: UPDATE_COMMERCIAL_PROFILE_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const updateUser = (user) => (dispatch, getState) => {
  console.log("user", user);
  dispatch({ type: UPDATE_COMMERCIAL });
  axios
    .patch(
      `/api/users/${getState().authCommercialsReducer.user.code}/`,
      user,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: UPDATE_COMMERCIAL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: UPDATE_COMMERCIAL_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const changePassword = (data) => (dispatch, getState) => {
  console.log(data);
  dispatch({
    type: CHANGE_COMMERCIAL_PASSWORD,
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
        type: CHANGE_COMMERCIAL_PASSWORD_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: CHANGE_COMMERCIAL_PASSWORD_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const connectStripe = (authCode) => (dispatch, getState) => {
  dispatch({
    type: STRIPE_COMMERCIAL_CONNECTED,
  });
  axios
    .post(
      "/api/users/stripe_connect_commercial/",
      { code: authCode },
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res);
      console.log(res.data);
      dispatch({
        type: STRIPE_COMMERCIAL_CONNECTED_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: STRIPE_COMMERCIAL_CONNECTED_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
  // Get token from state
  let token = getState().authCommercialsReducer.auth_commercial_token;
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
