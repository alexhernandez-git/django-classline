import axios from "axios";

import { COURSE_STUDENTS_FETCH, COURSE_STUDENTS_SUCCESS, COURSE_STUDENTS_FAIL } from "../../types";

import { tokenConfig } from "../auth";

// CHECK TOKEN & LOAD USER
export const fetchCourseStudents = (search = "") => (dispatch, getState) => {
  // User Loading
  dispatch({ type: COURSE_STUDENTS_FETCH });

  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/courses/${getState().courseReducer.course.code}/course-students/?search=${search}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: COURSE_STUDENTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: COURSE_STUDENTS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchCourseStudentsPagination = (url) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: COURSE_STUDENTS_FETCH });

  axios
    .get(url, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: COURSE_STUDENTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: COURSE_STUDENTS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
