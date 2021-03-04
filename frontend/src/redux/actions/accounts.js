import axios from "axios";
import Swal from "sweetalert2";

import {
  ACCOUNTS_FETCH,
  ACCOUNTS_SUCCESS,
  ACCOUNTS_FAIL,
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_FAIL,
  CREATE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT,
  DELETE_ACCOUNT_FAIL,
  DELETE_ACCOUNT_SUCCESS,
  REFRESH_PROGRAM,
  RESET_ACCOUNT_CREATE,
} from "../types";

import { tokenConfig } from "./auth";
// CHECK TOKEN & LOAD USER
export const fetchAccounts = (search = "") => (dispatch, getState) => {
  // User Loading
  dispatch({ type: ACCOUNTS_FETCH });

  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/accounts-created/?search=${search}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: ACCOUNTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ACCOUNTS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchAccountsPagination = (url) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: ACCOUNTS_FETCH });

  axios
    .get(url, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ACCOUNTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ACCOUNTS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const createAccount = (account, handleClose) => (dispatch, getState) => {
  dispatch({
    type: CREATE_ACCOUNT,
  });
  axios
    .post(
      `/api/users/${getState().programReducer.program.code}/create_account/`,
      account,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: CREATE_ACCOUNT_SUCCESS,
        payload: res.data.user,
      });
      dispatch({
        type: REFRESH_PROGRAM,
        payload: res.data.program,
      });
      Swal.fire({
        title: "Creado!",
        icon: "success",
        confirmButtonText: "Ok",
      });
      handleClose();
    })
    .catch((err) => {
      dispatch({
        type: CREATE_ACCOUNT_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const deleteAccount = (id) => (dispatch, getState) => {
  dispatch({
    type: DELETE_ACCOUNT,
    payload: id,
  });

  axios
    .delete(
      `/api/programs/${
        getState().programReducer.program.code
      }/accounts-created/${id}/`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: DELETE_ACCOUNT_SUCCESS,
      });
      dispatch({
        type: REFRESH_PROGRAM,
        payload: res.data,
      });
      Swal.fire({
        title: "Eliminado!",
        icon: "success",
        confirmButtonText: "Ok",
      });
    })
    .catch((err) => {
      dispatch({
        type: DELETE_ACCOUNT_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const resetAccountCreate = () => (dispatch) => {
  dispatch({
    type: RESET_ACCOUNT_CREATE,
  });
};
