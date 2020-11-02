import axios from "axios";
import Swal from "sweetalert2";

import {
  PLAYLISTS_ADMIN_FETCH,
  PLAYLISTS_ADMIN_SUCCESS,
  PLAYLISTS_ADMIN_FAIL,
  SET_PLAYLIST_ADMIN_EDIT,
  DELETE_PLAYLIST_ADMIN_EDIT,
  EDIT_PLAYLIST_ADMIN,
  EDIT_PLAYLIST_ADMIN_FAIL,
  EDIT_PLAYLIST_ADMIN_SUCCESS,
  CREATE_PLAYLIST_ADMIN,
  CREATE_PLAYLIST_ADMIN_FAIL,
  CREATE_PLAYLIST_ADMIN_SUCCESS,
  DELETE_PLAYLIST_ADMIN,
  DELETE_PLAYLIST_ADMIN_FAIL,
  DELETE_PLAYLIST_ADMIN_SUCCESS,
} from "../types";

import { tokenConfig } from "./auth";

// CHECK TOKEN & LOAD USER
export const fetchPlaylists = (search = "") => (dispatch, getState) => {
  // User Loading
  dispatch({ type: PLAYLISTS_ADMIN_FETCH });

  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/playlists-admin/?search=${search}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: PLAYLISTS_ADMIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PLAYLISTS_ADMIN_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchPlaylistsPagination = (url) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: PLAYLISTS_ADMIN_FETCH });

  axios
    .get(url, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: PLAYLISTS_ADMIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PLAYLISTS_ADMIN_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchPlaylistsIncrease = (limit, search = "") => (
  dispatch,
  getState
) => {
  // User Loading
  dispatch({ type: PLAYLISTS_ADMIN_FETCH });

  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/playlists-admin/?search=${search}&limit=${limit}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: PLAYLISTS_ADMIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PLAYLISTS_ADMIN_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const setPlaylistEdit = (playlist) => (dispatch) => {
  // User Loading

  dispatch({
    type: SET_PLAYLIST_ADMIN_EDIT,
    payload: playlist,
  });
};

export const deletePlaylistEdit = () => (dispatch) => {
  // User Loading

  dispatch({
    type: DELETE_PLAYLIST_ADMIN_EDIT,
  });
};

export const editPlaylist = (playlist) => (dispatch, getState) => {
  delete playlist.picture;
  console.log(playlist);
  dispatch({
    type: EDIT_PLAYLIST_ADMIN,
  });
  axios
    .patch(
      `/api/programs/${
        getState().programReducer.program.code
      }/playlists-admin/${playlist.id}/`,
      playlist,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log("res", res);

      dispatch({
        type: EDIT_PLAYLIST_ADMIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: EDIT_PLAYLIST_ADMIN_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const createPlaylist = (playlist) => (dispatch, getState) => {
  delete playlist.picture;
  console.log(playlist);
  dispatch({
    type: CREATE_PLAYLIST_ADMIN,
  });

  axios
    .post(
      `/api/programs/${
        getState().programReducer.program.code
      }/playlists-admin/`,
      playlist,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: CREATE_PLAYLIST_ADMIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: CREATE_PLAYLIST_ADMIN_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const deletePlaylist = (id) => (dispatch, getState) => {
  dispatch({
    type: DELETE_PLAYLIST_ADMIN,
    payload: id,
  });

  axios
    .delete(
      `/api/programs/${
        getState().programReducer.program.code
      }/playlists-admin/${id}`,
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: DELETE_PLAYLIST_ADMIN_SUCCESS,
      });
      Swal.fire({
        title: "Eliminado!",
        icon: "success",
        confirmButtonText: "Ok",
      });
    })
    .catch((err) => {
      dispatch({
        type: DELETE_PLAYLIST_ADMIN_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
