import axios from "axios";
import Swal from "sweetalert2";

import {
  PACKS_FETCH,
  PACKS_SUCCESS,
  PACKS_FAIL,
  CREATE_PACK,
  CREATE_PACK_FAIL,
  CREATE_PACK_SUCCESS,
} from "../types";

import { tokenConfig } from "./auth";

// CHECK TOKEN & LOAD USER
export const fetchPacks = (search = "") => (dispatch, getState) => {
  // User Loading
  dispatch({ type: PACKS_FETCH });

  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/packs/list_program_packs/?search=${search}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: PACKS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PACKS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchPacksPagination = (url) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: PACKS_FETCH });

  axios
    .get(url, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: PACKS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PACKS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchPacksIncrease = (limit, search = "") => (
  dispatch,
  getState
) => {
  // User Loading
  dispatch({ type: PACKS_FETCH });

  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/packs/list_program_packs/?search=${search}&limit=${limit}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: PACKS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PACKS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const createPack = (video) => (dispatch, getState) => {
  dispatch({
    type: CREATE_PACK,
  });
  axios
    .post(
      `/api/programs/${getState().programReducer.program.code}/packs/`,
      {},
      tokenConfig(getState)
    )
    .then((res) => {
      console.log("res", res);

      dispatch({
        type: CREATE_PACK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("error", err.response);
      dispatch({
        type: CREATE_PACK_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

