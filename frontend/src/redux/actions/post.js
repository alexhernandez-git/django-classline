import axios from "axios";

import { POST_FETCH, POST_SUCCESS, POST_FAIL } from "../types";

import { tokenConfig } from "./auth";

// CHECK TOKEN & LOAD USER
export const fetchPost = (id) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: POST_FETCH });

  axios
    .get(
      `/api/programs/${getState().programReducer.program.code}/posts/${id}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: POST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: POST_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
