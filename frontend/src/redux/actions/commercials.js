import axios from "axios";
import Swal from "sweetalert2";

import {
  COMMERCIALS_FETCH,
  COMMERCIALS_SUCCESS,
  COMMERCIALS_FAIL,
  CREATE_COMMERCIAL,
  CREATE_COMMERCIAL_FAIL,
  CREATE_COMMERCIAL_SUCCESS,
  DELETE_COMMERCIAL,
  DELETE_COMMERCIAL_FAIL,
  DELETE_COMMERCIAL_SUCCESS,
  RESET_COMMERCIAL_CREATE,
  CHANGE_CURRENT_COMMERCIAL,
} from "../types";

import { tokenConfig } from "./authCommercials";
// CHECK TOKEN & LOAD USER
export const fetchCommercial = (search = "") => (dispatch, getState) => {
  // User Loading
  dispatch({ type: COMMERCIALS_FETCH });
  let code;
  if (getState().commercialsReducer.current_commercial) {
    code = getState().commercialsReducer.current_commercial;
  } else {
    code = getState().authCommercialsReducer.user.code;
  }
  axios
    .get(
      `/api/commercials/?user_code=${code}&search=${search}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: COMMERCIALS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: COMMERCIALS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchCommercialsPagination = (url) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: COMMERCIALS_FETCH });

  axios
    .get(url, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: COMMERCIALS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: COMMERCIALS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const createCommercial = (account, handleClose) => (
  dispatch,
  getState
) => {
  dispatch({
    type: CREATE_COMMERCIAL,
  });
  console.log(account);
  axios
    .post(`/api/users/create_commercial/`, account, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: CREATE_COMMERCIAL_SUCCESS,
        payload: res.data,
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
        type: CREATE_COMMERCIAL_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const deleteCommercial = (id) => (dispatch, getState) => {
  dispatch({
    type: DELETE_COMMERCIAL,
    payload: id,
  });

  axios
    .delete(`/api/commercials/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: DELETE_COMMERCIAL_SUCCESS,
      });

      Swal.fire({
        title: "Eliminado!",
        icon: "success",
        confirmButtonText: "Ok",
      });
    })
    .catch((err) => {
      dispatch({
        type: DELETE_COMMERCIAL_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const resetCommercialCreate = () => (dispatch) => {
  dispatch({
    type: RESET_COMMERCIAL_CREATE,
  });
};
export const changeCurrentCommercial = (code) => (dispatch) => {
  dispatch({
    type: CHANGE_CURRENT_COMMERCIAL,
    payload: code,
  });
};
