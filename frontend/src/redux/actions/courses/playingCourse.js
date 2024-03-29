import axios from "axios";

import {
  PLAYING_COURSE_FETCH,
  PLAYING_COURSE_SUCCESS,
  PLAYING_COURSE_FAIL,
} from "../../types";

import { tokenConfig } from "../auth";
// CHECK TOKEN & LOAD USER
export const fetchPlayingCourse = (id, isDemo) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: PLAYING_COURSE_FETCH });
  console.log(`/api/programs/${
    getState().programReducer.program.code
  }/courses/${id}/${isDemo ?"retrieve_demo_playing" :"retrieve_playing"}/`)
  if (isDemo){
    axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/courses/${id}/retrieve_demo_playing/`
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
  }else{
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
  }

};
