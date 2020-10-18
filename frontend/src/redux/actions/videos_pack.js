import axios from "axios";
import Swal from "sweetalert2";

import {
  VIDEOS_PACK_FETCH,
  VIDEOS_PACK_SUCCESS,
  VIDEOS_PACK_FAIL,
  VIDEOS_PACK_ADD,
  VIDEOS_PACK_ADD_FAIL,
  VIDEOS_PACK_ADD_SUCCESS,
  VIDEOS_PACK_REMOVE,
  VIDEOS_PACK_REMOVE_FAIL,
  VIDEOS_PACK_REMOVE_SUCCESS,
} from "../types";

import { tokenConfig } from "./auth";

// CHECK TOKEN & LOAD USER
export const fetchVideos = (search = "") => (dispatch, getState) => {
  // User Loading
  dispatch({ type: VIDEOS_PACK_FETCH });

  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/packs/${getState().packReducer.pack.code}/videos-pack?search=${search}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: VIDEOS_PACK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: VIDEOS_PACK_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchVideosPagination = (url) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: VIDEOS_PACK_FETCH });

  axios
    .get(url, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: VIDEOS_PACK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: VIDEOS_PACK_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchVideosIncrease = (limit, search = "") => (
  dispatch,
  getState
) => {
  // User Loading
  dispatch({ type: VIDEOS_PACK_FETCH });

  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/packs/${getState().packReducer.pack.code}/videos-pack?search=${search}&limit=${limit}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: VIDEOS_PACK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: VIDEOS_PACK_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const addVideoPack = (id) => (dispatch, getState) => {
  dispatch({
    type: VIDEOS_PACK_ADD,
  });
  console.log(video);
  axios
    .patch(
      `/api/programs/${
        getState().programReducer.program.code
      }/packs/${getState().packReducer.pack.code}/add_video/`,
      {video: id},
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: VIDEOS_PACK_ADD_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: VIDEOS_PACK_ADD_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};


export const removeVideoPack = (id) => (dispatch, getState) => {
  dispatch({
    type: VIDEOS_PACK_REMOVE,
    payload: id,
  });

  axios
    .patch(
      `/api/programs/${
        getState().programReducer.program.code
      }/packs/${getState().packReducer.pack.code}/remove_video/`,
      {video: id},
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: VIDEOS_PACK_REMOVE_SUCCESS,
      });
      Swal.fire({
        title: "Eliminado!",
        icon: "success",
        confirmButtonText: "Ok",
      });
    })
    .catch((err) => {
      dispatch({
        type: VIDEOS_PACK_REMOVE_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
