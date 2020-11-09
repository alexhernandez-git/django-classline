import axios from "axios";
import Swal from "sweetalert2";
import {
  TOPIC_FETCH,
  TOPIC_SUCCESS,
  TOPIC_FAIL,
  TOPIC_PICTURE_UPLOAD,
  TOPIC_PICTURE_SUCCESS,
  TOPIC_PICTURE_FAIL,
  TOPIC_SAVE,
  TOPIC_SAVE_SUCCESS,
  TOPIC_SAVE_FAIL,
  REMOVE_TOPIC,
  REMOVE_TOPIC_SUCCESS,
  REMOVE_TOPIC_FAIL,
  RESET_TOPICS_ERRORS,
} from "../../types";

import { tokenConfig } from "../auth";
// CHECK TOKEN & LOAD USER
export const fetchTopic = (id) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: TOPIC_FETCH });

  axios
    .get(`/api/programs/${getState().programReducer.program.code}/topics/${id}`)
    .then((res) => {
      console.log(res);

      dispatch({
        type: TOPIC_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: TOPIC_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
      // if (process.browser) {
      //     document.location.href = `https://classlineacademy.com`
      // }
    });
};
export const saveTopic = (topic) => (dispatch, getState) => {
  dispatch({ type: TOPIC_SAVE });
  // dispatch({
  //     type: TOPIC_PICTURE_SUCCESS,
  //     payload: '/static/img/taichi.jpg'
  // })
  axios
    .patch(
      `/api/programs/${getState().programReducer.program.code}/topics/${
        getState().topicReducer.topic.code
      }/`,
      topic,
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
        type: TOPIC_SAVE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: TOPIC_SAVE_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const uploadPicture = (picture) => (dispatch, getState) => {
  dispatch({ type: TOPIC_PICTURE_UPLOAD });
  // dispatch({
  //     type: TOPIC_PICTURE_SUCCESS,
  //     payload: '/static/img/taichi.jpg'
  // })
  const fd = new FormData();
  fd.append("picture", picture, Math.random().toString(36) + picture.name);
  axios
    .patch(
      `/api/programs/${getState().programReducer.program.code}/topics/${
        getState().topicReducer.topic.code
      }/`,
      fd,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: TOPIC_PICTURE_SUCCESS,
        payload: res.data.picture,
      });
    })
    .catch((err) => {
      dispatch({
        type: TOPIC_PICTURE_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const removeTopic = (history) => (dispatch, getState) => {
  dispatch({ type: REMOVE_TOPIC });
  axios
    .delete(
      `/api/programs/${getState().programReducer.program.code}/topics/${
        getState().topicReducer.topic.code
      }/`,
      tokenConfig(getState)
    )
    .then((res) => {
      history.push(
        `/academy/${getState().programReducer.program.code}/admin/topics`
      );
      dispatch({
        type: REMOVE_TOPIC_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: REMOVE_TOPIC_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const resetTopicsErrors = () => (dispatch) => {
  dispatch({
    type: RESET_TOPICS_ERRORS,
  });
};
