import axios from "axios";
import Swal from "sweetalert2";
import {
  COURSE_FETCH,
  COURSE_SUCCESS,
  COURSE_FAIL,
  COURSE_PICTURE_UPLOAD,
  COURSE_PICTURE_SUCCESS,
  COURSE_PICTURE_FAIL,
  COURSE_VIDEO_UPLOAD,
  COURSE_VIDEO_SUCCESS,
  COURSE_VIDEO_FAIL,
  COURSE_SAVE,
  COURSE_SAVE_SUCCESS,
  COURSE_SAVE_FAIL,
  COURSE_PUBLISH,
  COURSE_PUBLISH_SUCCESS,
  COURSE_PUBLISH_FAIL,
  COURSE_CANCEL_PUBLISH,
  COURSE_CANCEL_PUBLISH_SUCCESS,
  COURSE_CANCEL_PUBLISH_FAIL,
  REMOVE_COURSE,
  REMOVE_COURSE_SUCCESS,
  REMOVE_COURSE_FAIL,
  RESET_COURSES_ERRORS,
} from "../../types";

import { tokenConfig } from "../auth";
// CHECK TOKEN & LOAD USER
export const fetchCourse = (id) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: COURSE_FETCH });

  axios
    .get(
      `/api/programs/${getState().programReducer.program.code}/courses/${id}`
    )
    .then((res) => {
      console.log(res);

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
      // if (process.browser) {
      //     document.location.href = `https://classlineacademy.com`
      // }
    });
};
export const saveCourse = (course) => (dispatch, getState) => {
  dispatch({ type: COURSE_SAVE });
  // dispatch({
  //     type: COURSE_PICTURE_SUCCESS,
  //     payload: '/static/img/taichi.jpg'
  // })
  console.log(getState().courseReducer);
  axios
    .patch(
      `/api/programs/${getState().programReducer.program.code}/courses/${
        getState().courseReducer.course.code
      }/`,
      course,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res);
      Swal.fire({
        title: "Guardado!",
        icon: "success",
        confirmButtonText: "Ok",
      });
      dispatch({
        type: COURSE_SAVE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: COURSE_SAVE_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const uploadPicture = (picture) => (dispatch, getState) => {
  dispatch({ type: COURSE_PICTURE_UPLOAD });
  // dispatch({
  //     type: COURSE_PICTURE_SUCCESS,
  //     payload: '/static/img/taichi.jpg'
  // })
  const fd = new FormData();
  fd.append("picture", picture, picture.name);
  axios
    .patch(
      `/api/programs/${getState().programReducer.program.code}/courses/${
        getState().courseReducer.course.code
      }/`,
      fd,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: COURSE_PICTURE_SUCCESS,
        payload: res.data.picture,
      });
    })
    .catch((err) => {
      dispatch({
        type: COURSE_PICTURE_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const uploadVideo = (video_presentation) => (dispatch, getState) => {
  dispatch({ type: COURSE_VIDEO_UPLOAD });
  const fd = new FormData();
  fd.append("video_presentation", video_presentation, video_presentation.name);
  axios
    .patch(
      `/api/programs/${getState().programReducer.program.code}/courses/${
        getState().courseReducer.course.code
      }/`,
      fd,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: COURSE_VIDEO_SUCCESS,
        payload: res.data.video_presentation,
      });
    })
    .catch((err) => {
      dispatch({
        type: COURSE_VIDEO_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const publishCourse = () => (dispatch, getState) => {
  dispatch({ type: COURSE_PUBLISH });
  axios
    .patch(
      `/api/programs/${getState().programReducer.program.code}/courses/${
        getState().courseReducer.course.code
      }/publish/`,
      {},
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res);
      Swal.fire({
        title: "Publicado!",
        icon: "success",
        confirmButtonText: "Ok",
      });
      dispatch({
        type: COURSE_PUBLISH_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: COURSE_PUBLISH_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const cancelPublishedCourse = () => (dispatch, getState) => {
  dispatch({ type: COURSE_CANCEL_PUBLISH });

  axios
    .patch(
      `/api/programs/${getState().programReducer.program.code}/courses/${
        getState().courseReducer.course.code
      }/cancel_publish/`,
      {},
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: COURSE_CANCEL_PUBLISH_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: COURSE_CANCEL_PUBLISH_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const removeCourse = (history) => (dispatch, getState) => {
  dispatch({ type: REMOVE_COURSE });
  axios
    .delete(
      `/api/programs/${getState().programReducer.program.code}/courses/${
        getState().courseReducer.course.code
      }/`,
      tokenConfig(getState)
    )
    .then((res) => {
      history.push(
        `/academy/${getState().programReducer.program.code}/admin/courses`
      );
      dispatch({
        type: REMOVE_COURSE_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: REMOVE_COURSE_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const resetCoursesErrors = () => (dispatch) => {
  dispatch({
    type: RESET_COURSES_ERRORS,
  });
};
