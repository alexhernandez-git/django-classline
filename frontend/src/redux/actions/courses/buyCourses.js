import axios from "axios";
import Swal from "sweetalert2";

import {
  BUY_COURSE,
  BUY_COURSE_FAIL,
  BUY_COURSE_SUCCESS,
  FETCH_PUBLISHED_COURSES,
  FETCH_PUBLISHED_COURSES_SUCCESS,
  FETCH_PUBLISHED_COURSES_FAIL,
  FETCH_MY_COURSES,
  FETCH_MY_COURSES_SUCCESS,
  FETCH_MY_COURSES_FAIL,
  FETCH_COURSE,
  FETCH_COURSE_SUCCESS,
  FETCH_COURSE_FAIL,
} from "../../types";

import { tokenConfig } from "../auth";

export const buyCourse = (
  course,
  paymentMethodId = null,
  promotion_code = null
) => (dispatch, getState) => {
  const data = {
    payment_method: paymentMethodId,
  };
  if (promotion_code) {
    data.promotion_code = promotion_code;
  }
  dispatch({ type: BUY_COURSE });

  axios
    .patch(
      `/api/programs/${getState().programReducer.program.code}/courses/${
        course.code
      }/buy_course/`,
      data,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log("res-data", res.data);

      dispatch({
        type: BUY_COURSE_SUCCESS,
        payload: res.data,
      });

      Swal.fire({
        title: "Curso Adquirido!",
        icon: "success",
        confirmButtonText: "Ok",
      });
    })
    .catch((err) => {
      dispatch({
        type: BUY_COURSE_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

// CHECK TOKEN & LOAD USER
export const fetchPublishedCourses = (setShowMyCourses = false) => (
  dispatch,
  getState
) => {
  // User Loading
  dispatch({ type: FETCH_PUBLISHED_COURSES });

  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/courses/list_published_courses/`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: FETCH_PUBLISHED_COURSES_SUCCESS,
        payload: res.data,
      });
      if (setShowMyCourses) {
        setShowMyCourses(false);
      }
    })
    .catch((err) => {
      dispatch({
        type: FETCH_PUBLISHED_COURSES_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const fetchBuyCoursesPagination = (url, showMyCourses) => (
  dispatch,
  getState
) => {
  // User Loading
  dispatch({
    type: showMyCourses ? FETCH_MY_COURSES : FETCH_PUBLISHED_COURSES,
  });

  axios
    .get(url, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: showMyCourses
          ? FETCH_MY_COURSES_SUCCESS
          : FETCH_PUBLISHED_COURSES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: showMyCourses
          ? FETCH_MY_COURSES_FAIL
          : FETCH_PUBLISHED_COURSES_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchMyCourses = (setShowMyCourses = false) => (
  dispatch,
  getState
) => {
  // User Loading
  dispatch({ type: FETCH_MY_COURSES, payload: getState().authReducer.user.id });
  if (setShowMyCourses) {
    setShowMyCourses(true);
  }
};

// CHECK TOKEN & LOAD USER
export const fetchPublishedCourse = (courseId) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: FETCH_COURSE });

  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/courses/${courseId}/retrieve_content/`
    )
    .then((res) => {
      dispatch({
        type: FETCH_COURSE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: FETCH_COURSE_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
