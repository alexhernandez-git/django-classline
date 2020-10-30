import axios from "axios";

import { COURSE_FETCH, COURSE_SUCCESS, COURSE_FAIL } from "../types";

import { tokenConfig } from "./auth";
// CHECK TOKEN & LOAD USER
export const fetchPlaylist = (id) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: COURSE_FETCH });

  axios
    .get(
      `/api/programs/${getState().programReducer.program.code}/courses/${id}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: COURSE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: COURSE_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
