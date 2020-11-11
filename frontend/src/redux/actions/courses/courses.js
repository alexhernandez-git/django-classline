import axios from "axios";

import {
  COURSES_FETCH,
  COURSES_SUCCESS,
  COURSES_FAIL,
  CREATE_COURSE,
  CREATE_COURSE_FAIL,
  CREATE_COURSE_SUCCESS,
  PROGRAM_COURSES_FETCH,
  PROGRAM_COURSES_SUCCESS,
  PROGRAM_COURSES_FAIL,
} from "../../types";

import { tokenConfig } from "../auth";

// CHECK TOKEN & LOAD USER
export const fetchCourses = (search = "") => (dispatch, getState) => {
  // User Loading
  dispatch({ type: COURSES_FETCH });

  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/courses/?search=${search}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: COURSES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: COURSES_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchCoursesPagination = (url) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: COURSES_FETCH });

  axios
    .get(url, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: COURSES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: COURSES_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const createCourse = (history) => (dispatch, getState) => {
  dispatch({
    type: CREATE_COURSE,
  });
  axios
    .post(
      `/api/programs/${getState().programReducer.program.code}/courses/`,
      {},
      tokenConfig(getState)
    )
    .then((res) => {
      console.log("res", res);

      dispatch({
        type: CREATE_COURSE_SUCCESS,
        payload: res.data,
      });
      history.push(
        `/academy/${getState().programReducer.program.code}/admin/course/${
          res.data.code
        }`
      );
    })
    .catch((err) => {
      console.log("error", err.response);
      dispatch({
        type: CREATE_COURSE_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

// CHECK TOKEN & LOAD USER
export const fetchProgramCourses = (search = "") => (dispatch, getState) => {
  // User Loading
  dispatch({ type: PROGRAM_COURSES_FETCH });

  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/courses/list_program_courses/?search=${search}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: PROGRAM_COURSES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PROGRAM_COURSES_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchProgramCoursesPagination = (url) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: PROGRAM_COURSES_FETCH });

  axios
    .get(url, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: PROGRAM_COURSES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PROGRAM_COURSES_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
