import axios from "axios";
import Swal from "sweetalert2";

import {
  PLAYLISTS_TOPIC_FETCH,
  PLAYLISTS_TOPIC_SUCCESS,
  PLAYLISTS_TOPIC_FAIL,
  PLAYLISTS_TOPIC_ADD,
  PLAYLISTS_TOPIC_ADD_FAIL,
  PLAYLISTS_TOPIC_ADD_SUCCESS,
  PLAYLISTS_TOPIC_REMOVE,
  PLAYLISTS_TOPIC_REMOVE_FAIL,
  PLAYLISTS_TOPIC_REMOVE_SUCCESS,
} from "../../types";

import { tokenConfig } from "../auth";

// CHECK TOKEN & LOAD USER
export const fetchPlaylistsTopic = (search = "") => (dispatch, getState) => {
  // User Loading
  dispatch({ type: PLAYLISTS_TOPIC_FETCH });

  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/topics/${getState().topicReducer.topic.code}/playlists-topic?search=${search}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: PLAYLISTS_TOPIC_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PLAYLISTS_TOPIC_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchPlaylistsTopicPagination = (url) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: PLAYLISTS_TOPIC_FETCH });

  axios
    .get(url, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: PLAYLISTS_TOPIC_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PLAYLISTS_TOPIC_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchPlaylistsTopicIncrease = (limit, search = "") => (
  dispatch,
  getState
) => {
  // User Loading
  dispatch({ type: PLAYLISTS_TOPIC_FETCH });

  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/topics/${getState().topicReducer.topic.code}/playlists-topic?search=${search}&limit=${limit}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: PLAYLISTS_TOPIC_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PLAYLISTS_TOPIC_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const addPlaylistTopic = (id) => (dispatch, getState) => {
  dispatch({
    type: PLAYLISTS_TOPIC_ADD,
  });
  axios
    .patch(
      `/api/programs/${
        getState().programReducer.program.code
      }/topics/${getState().topicReducer.topic.code}/add_playlist/`,
      {playlist: id},
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: PLAYLISTS_TOPIC_ADD_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PLAYLISTS_TOPIC_ADD_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};


export const removePlaylistTopic = (id) => (dispatch, getState) => {
  dispatch({
    type: PLAYLISTS_TOPIC_REMOVE,
    payload: id,
  });

  axios
    .patch(
      `/api/programs/${
        getState().programReducer.program.code
      }/topics/${getState().topicReducer.topic.code}/remove_playlist/`,
      {playlist: id},
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: PLAYLISTS_TOPIC_REMOVE_SUCCESS,
      });
      Swal.fire({
        title: "Eliminado!",
        icon: "success",
        confirmButtonText: "Ok",
      });
    })
    .catch((err) => {
      dispatch({
        type: PLAYLISTS_TOPIC_REMOVE_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
