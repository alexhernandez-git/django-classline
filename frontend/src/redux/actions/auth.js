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
  ACQUIRE_INSTRUCTOR_ACCOUNTS,
  ACQUIRE_INSTRUCTOR_ACCOUNTS_SUCCESS,
  ACQUIRE_INSTRUCTOR_ACCOUNTS_FAIL,
  CANECEL_INSTRUCTOR_ACCOUNTS,
  CANECEL_INSTRUCTOR_ACCOUNTS_SUCCESS,
  CANECEL_INSTRUCTOR_ACCOUNTS_FAIL,
  REGISTER_WITH_TOKEN_SUCCESS,
  RESET_AUTH_ERRORS,
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
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
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

export const registerCheckoutClass = (data) => (dispatch, getState) => {
  axios
    .post(`/api/users/signup_with_token/`, data)
    .then((res) => {
      console.log("res.data, resfwe", res.data);
      dispatch({
        type: REGISTER_WITH_TOKEN_SUCCESS,
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

export const addAcquireAccounts = (
  accounts_acquired,
  paymentMethodId = null,
  promotion_code = null
) => (dispatch, getState) => {
  const data = {
    accounts_acquired: accounts_acquired,
    payment_method_id: paymentMethodId,
  };
  if (promotion_code) {
    if (promotion_code.is_discount) {
      data.discount = promotion_code;
    } else {
      data.promotion_code = promotion_code;
    }
  }
  dispatch({ type: ACQUIRE_INSTRUCTOR_ACCOUNTS, payload: accounts_acquired });

  axios
    .patch(
      `/api/programs/${
        getState().programReducer.program.code
      }/add_instructor_accounts/`,
      data,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res.data);

      dispatch({
        type: ACQUIRE_INSTRUCTOR_ACCOUNTS_SUCCESS,
        payload: res.data,
      });

      Swal.fire({
        title: "Cuentas adquiridas!",
        icon: "success",
        confirmButtonText: "Ok",
      });
    })
    .catch((err) => {
      dispatch({
        type: ACQUIRE_INSTRUCTOR_ACCOUNTS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const cancelAcquireAccounts = () => (dispatch, getState) => {
  dispatch({ type: CANECEL_INSTRUCTOR_ACCOUNTS });
  axios
    .patch(
      `/api/programs/${
        getState().programReducer.program.code
      }/cancel_instructor_accounts/`,
      {},
      tokenConfig(getState)
    )
    .then((res) => {
      console.log("canceldiscountresdata", res.data);
      dispatch({
        type: CANECEL_INSTRUCTOR_ACCOUNTS_SUCCESS,
        payload: res.data,
      });

      Swal.fire({
        title: "Cuentas canceladas",
        icon: "success",
        confirmButtonText: "Ok",
      });
    })
    .catch((err) => {
      dispatch({
        type: CANECEL_INSTRUCTOR_ACCOUNTS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const resetAuthErrors = () => (dispatch, getState) => {
  dispatch({
    type: RESET_AUTH_ERRORS,
  });
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
  // Get token from state
  const current_token = localStorage.getItem("access_token");
  let token;
  if (current_token) {
    token = current_token;
    localStorage.setItem("auth_token", current_token);
  } else {
    localStorage.setItem("access_token", getState().authReducer.auth_token);
    token = getState().authReducer.auth_token;
  }

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
