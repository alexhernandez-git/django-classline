import axios from "axios";
import Swal from "sweetalert2";

import {
  PODCASTS_PACK_FETCH,
  PODCASTS_PACK_SUCCESS,
  PODCASTS_PACK_FAIL,
  PODCASTS_PACK_ADD,
  PODCASTS_PACK_ADD_FAIL,
  PODCASTS_PACK_ADD_SUCCESS,
  PODCASTS_PACK_REMOVE,
  PODCASTS_PACK_REMOVE_FAIL,
  PODCASTS_PACK_REMOVE_SUCCESS,
} from "../types";

import { tokenConfig } from "./auth";

// CHECK TOKEN & LOAD USER
export const fetchPodcastsPack = (search = "") => (dispatch, getState) => {
  // User Loading
  dispatch({ type: PODCASTS_PACK_FETCH });

  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/packs/${getState().packReducer.pack.code}/podcasts-pack?search=${search}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: PODCASTS_PACK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PODCASTS_PACK_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchPodcastsPackPagination = (url) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: PODCASTS_PACK_FETCH });

  axios
    .get(url, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: PODCASTS_PACK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PODCASTS_PACK_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchPodcastsPackIncrease = (limit, search = "") => (
  dispatch,
  getState
) => {
  // User Loading
  dispatch({ type: PODCASTS_PACK_FETCH });

  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/packs/${getState().packReducer.pack.code}/podcasts-pack?search=${search}&limit=${limit}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: PODCASTS_PACK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PODCASTS_PACK_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const addPodcastPack = (id) => (dispatch, getState) => {
  dispatch({
    type: PODCASTS_PACK_ADD,
  });
  axios
    .patch(
      `/api/programs/${
        getState().programReducer.program.code
      }/packs/${getState().packReducer.pack.code}/add_podcast/`,
      {podcast: id},
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: PODCASTS_PACK_ADD_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PODCASTS_PACK_ADD_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};


export const removePodcastPack = (id) => (dispatch, getState) => {
  dispatch({
    type: PODCASTS_PACK_REMOVE,
    payload: id,
  });

  axios
    .patch(
      `/api/programs/${
        getState().programReducer.program.code
      }/packs/${getState().packReducer.pack.code}/remove_podcast/`,
      {podcast: id},
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: PODCASTS_PACK_REMOVE_SUCCESS,
      });
      Swal.fire({
        title: "Eliminado!",
        icon: "success",
        confirmButtonText: "Ok",
      });
    })
    .catch((err) => {
      dispatch({
        type: PODCASTS_PACK_REMOVE_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
