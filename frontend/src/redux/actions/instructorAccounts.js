import axios from "axios";
import Swal from "sweetalert2";

import {
  INSTRUCTOR_ACCOUNTS_FETCH,
  INSTRUCTOR_ACCOUNTS_SUCCESS,
  INSTRUCTOR_ACCOUNTS_FAIL,
  CREATE_INSTRUCTOR_ACCOUNT,
  CREATE_INSTRUCTOR_ACCOUNT_FAIL,
  CREATE_INSTRUCTOR_ACCOUNT_SUCCESS,
  DELETE_INSTRUCTOR_ACCOUNT,
  DELETE_INSTRUCTOR_ACCOUNT_FAIL,
  DELETE_INSTRUCTOR_ACCOUNT_SUCCESS,
  RESET_INSTRUCTOR_ACCOUNT_CREATE,
  SUBSTRACT_ACCOUNT,
  ADD_ACCOUNT,
} from "../types";

import { tokenConfig } from "./auth";
// CHECK TOKEN & LOAD USER
export const fetchAccounts = (search = "") => (dispatch, getState) => {
  // User Loading
  dispatch({ type: INSTRUCTOR_ACCOUNTS_FETCH });

  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/instructors/?search=${search}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: INSTRUCTOR_ACCOUNTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: INSTRUCTOR_ACCOUNTS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchAccountsPagination = (url) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: INSTRUCTOR_ACCOUNTS_FETCH });

  axios
    .get(url, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: INSTRUCTOR_ACCOUNTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: INSTRUCTOR_ACCOUNTS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const createAccount = (account, handleClose) => (dispatch, getState) => {
  dispatch({
    type: CREATE_INSTRUCTOR_ACCOUNT,
  });
  axios
    .post(
      `/api/users/${
        getState().programReducer.program.code
      }/create_instructor_account/`,
      account,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: CREATE_INSTRUCTOR_ACCOUNT_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: ADD_ACCOUNT,
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
        type: CREATE_INSTRUCTOR_ACCOUNT_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const deleteAccount = (id) => (dispatch, getState) => {
  dispatch({
    type: DELETE_INSTRUCTOR_ACCOUNT,
    payload: id,
  });

  axios
    .delete(
      `/api/programs/${
        getState().programReducer.program.code
      }/instructors/${id}/`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: DELETE_INSTRUCTOR_ACCOUNT_SUCCESS,
      });
      dispatch({
        type: SUBSTRACT_ACCOUNT,
      });
      Swal.fire({
        title: "Eliminado!",
        icon: "success",
        confirmButtonText: "Ok",
      });
    })
    .catch((err) => {
      dispatch({
        type: DELETE_INSTRUCTOR_ACCOUNT_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const resetAccountCreate = () => (dispatch) => {
  dispatch({
    type: RESET_INSTRUCTOR_ACCOUNT_CREATE,
  });
};
