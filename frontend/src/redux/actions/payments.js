import axios from "axios";

import { PAYMENTS_FETCH, PAYMENTS_SUCCESS, PAYMENTS_FAIL } from "../types";

import { tokenConfig } from "./auth";
// CHECK TOKEN & LOAD USER
export const fetchPlaylist = (id) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: PAYMENTS_FETCH });

  axios
    .get(`/api/payments/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: PAYMENTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PAYMENTS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
