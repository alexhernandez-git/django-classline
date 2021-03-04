import axios from "axios";
import Swal from "sweetalert2";

import {
  COSTUMERS_FETCH,
  COSTUMERS_SUCCESS,
  COSTUMERS_FAIL,
  CREATE_COSTUMER,
  CREATE_COSTUMER_FAIL,
  CREATE_COSTUMER_SUCCESS,
  DELETE_COSTUMER,
  DELETE_COSTUMER_FAIL,
  DELETE_COSTUMER_SUCCESS,
  RESET_COSTUMER_CREATE,
} from "../types";

import { tokenConfig } from "./authCommercials";
// CHECK TOKEN & LOAD USER
export const fetchCostumers = (search = "") => (dispatch, getState) => {
  // User Loading
  dispatch({ type: COSTUMERS_FETCH });

  axios
    .get(`/api/created-costumers/?search=${search}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: COSTUMERS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: COSTUMERS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchCostumersPagination = (url) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: COSTUMERS_FETCH });

  axios
    .get(url, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: COSTUMERS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: COSTUMERS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const createCostumer = (account, handleClose) => (
  dispatch,
  getState
) => {
  dispatch({
    type: CREATE_COSTUMER,
  });
  console.log(account);
  axios
    .post(
      `/api/users/create_user_by_commercial/`,
      account,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: CREATE_COSTUMER_SUCCESS,
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
        type: CREATE_COSTUMER_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const deleteCostumer = (id) => (dispatch, getState) => {
  dispatch({
    type: DELETE_COSTUMER,
    payload: id,
  });

  axios
    .delete(`/api/created-costumers/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: DELETE_COSTUMER_SUCCESS,
      });

      Swal.fire({
        title: "Eliminado!",
        icon: "success",
        confirmButtonText: "Ok",
      });
    })
    .catch((err) => {
      dispatch({
        type: DELETE_COSTUMER_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const resetCostumerCreate = () => (dispatch) => {
  dispatch({
    type: RESET_COSTUMER_CREATE,
  });
};
