import axios from "axios";

import { VIDEO_FETCH, VIDEO_SUCCESS, VIDEO_FAIL } from "../types";

import { tokenConfig } from "./auth";

// CHECK TOKEN & LOAD USER
export const fetchVideo = (id) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: VIDEO_FETCH });

  axios
    .get(
      `/api/programs/${getState().programReducer.program.code}/videos/${id}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: VIDEO_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: VIDEO_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
