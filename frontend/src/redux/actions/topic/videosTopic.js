import axios from "axios";
import Swal from "sweetalert2";

import {
  VIDEOS_TOPIC_FETCH,
  VIDEOS_TOPIC_SUCCESS,
  VIDEOS_TOPIC_FAIL,
  VIDEOS_TOPIC_ADD,
  VIDEOS_TOPIC_ADD_FAIL,
  VIDEOS_TOPIC_ADD_SUCCESS,
  VIDEOS_TOPIC_REMOVE,
  VIDEOS_TOPIC_REMOVE_FAIL,
  VIDEOS_TOPIC_REMOVE_SUCCESS,
} from "../../types";

import { tokenConfig } from "../auth";

// CHECK TOKEN & LOAD USER
export const fetchVideosTopic = (search = "") => (dispatch, getState) => {
  // User Loading
  dispatch({ type: VIDEOS_TOPIC_FETCH });

  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/topics/${getState().topicReducer.topic.code}/videos-topic?search=${search}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: VIDEOS_TOPIC_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: VIDEOS_TOPIC_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchVideosTopicPagination = (url) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: VIDEOS_TOPIC_FETCH });

  axios
    .get(url, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: VIDEOS_TOPIC_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: VIDEOS_TOPIC_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchVideosTopicIncrease = (limit, search = "") => (
  dispatch,
  getState
) => {
  // User Loading
  dispatch({ type: VIDEOS_TOPIC_FETCH });

  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/topics/${getState().topicReducer.topic.code}/videos-topic?search=${search}&limit=${limit}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: VIDEOS_TOPIC_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: VIDEOS_TOPIC_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const addVideoTopic = (id) => (dispatch, getState) => {
  dispatch({
    type: VIDEOS_TOPIC_ADD,
  });
  axios
    .patch(
      `/api/programs/${
        getState().programReducer.program.code
      }/topics/${getState().topicReducer.topic.code}/add_video/`,
      {video: id},
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: VIDEOS_TOPIC_ADD_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: VIDEOS_TOPIC_ADD_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};


export const removeVideoTopic = (id) => (dispatch, getState) => {
  dispatch({
    type: VIDEOS_TOPIC_REMOVE,
    payload: id,
  });

  axios
    .patch(
      `/api/programs/${
        getState().programReducer.program.code
      }/topics/${getState().topicReducer.topic.code}/remove_video/`,
      {video: id},
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: VIDEOS_TOPIC_REMOVE_SUCCESS,
      });
      Swal.fire({
        title: "Eliminado!",
        icon: "success",
        confirmButtonText: "Ok",
      });
    })
    .catch((err) => {
      dispatch({
        type: VIDEOS_TOPIC_REMOVE_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
