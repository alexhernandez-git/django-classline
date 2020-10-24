import axios from "axios";
import Swal from "sweetalert2";

import {
  PODCASTS_TOPIC_FETCH,
  PODCASTS_TOPIC_SUCCESS,
  PODCASTS_TOPIC_FAIL,
  PODCASTS_TOPIC_ADD,
  PODCASTS_TOPIC_ADD_FAIL,
  PODCASTS_TOPIC_ADD_SUCCESS,
  PODCASTS_TOPIC_REMOVE,
  PODCASTS_TOPIC_REMOVE_FAIL,
  PODCASTS_TOPIC_REMOVE_SUCCESS,
} from "../../types";

import { tokenConfig } from "../auth";

// CHECK TOKEN & LOAD USER
export const fetchPodcastsTopic = (search = "") => (dispatch, getState) => {
  // User Loading
  dispatch({ type: PODCASTS_TOPIC_FETCH });

  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/topics/${getState().topicReducer.topic.code}/podcasts-topic?search=${search}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: PODCASTS_TOPIC_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PODCASTS_TOPIC_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchPodcastsTopicPagination = (url) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: PODCASTS_TOPIC_FETCH });

  axios
    .get(url, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: PODCASTS_TOPIC_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PODCASTS_TOPIC_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchPodcastsTopicIncrease = (limit, search = "") => (
  dispatch,
  getState
) => {
  // User Loading
  dispatch({ type: PODCASTS_TOPIC_FETCH });

  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/topics/${getState().topicReducer.topic.code}/podcasts-topic?search=${search}&limit=${limit}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: PODCASTS_TOPIC_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PODCASTS_TOPIC_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const addPodcastTopic = (id) => (dispatch, getState) => {
  dispatch({
    type: PODCASTS_TOPIC_ADD,
  });
  axios
    .patch(
      `/api/programs/${
        getState().programReducer.program.code
      }/topics/${getState().topicReducer.topic.code}/add_podcast/`,
      {podcast: id},
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: PODCASTS_TOPIC_ADD_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PODCASTS_TOPIC_ADD_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};


export const removePodcastTopic = (id) => (dispatch, getState) => {
  dispatch({
    type: PODCASTS_TOPIC_REMOVE,
    payload: id,
  });

  axios
    .patch(
      `/api/programs/${
        getState().programReducer.program.code
      }/topics/${getState().topicReducer.topic.code}/remove_podcast/`,
      {podcast: id},
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: PODCASTS_TOPIC_REMOVE_SUCCESS,
      });
      Swal.fire({
        title: "Eliminado!",
        icon: "success",
        confirmButtonText: "Ok",
      });
    })
    .catch((err) => {
      dispatch({
        type: PODCASTS_TOPIC_REMOVE_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
