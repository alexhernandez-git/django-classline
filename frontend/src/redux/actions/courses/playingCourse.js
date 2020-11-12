import axios from "axios";

import {
  PLAYING_COURSE_FETCH,
  PLAYING_COURSE_SUCCESS,
  PLAYING_COURSE_FAIL,
} from "../../types";

import { tokenConfig } from "../auth";
// CHECK TOKEN & LOAD USER
export const fetchPlayingCourse = (id) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: PLAYING_COURSE_FETCH });

  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/courses/${id}/retrieve_playing/`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: PLAYING_COURSE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PLAYING_COURSE_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
