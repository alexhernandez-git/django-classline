import axios from "axios";
import Swal from "sweetalert2";

import {
  COURSES_FETCH,
  COURSES_SUCCESS,
  COURSES_FAIL,
  SET_COURSE_EDIT,
  DELETE_COURSE_EDIT,
  EDIT_COURSE,
  EDIT_COURSE_FAIL,
  EDIT_COURSE_SUCCESS,
  CREATE_COURSE,
  CREATE_COURSE_FAIL,
  CREATE_COURSE_SUCCESS,
  DELETE_COURSE,
  DELETE_COURSE_FAIL,
  DELETE_COURSE_SUCCESS,
} from "../types";

import { tokenConfig } from "./auth";

// CHECK TOKEN & LOAD USER
export const fetchPlaylists = (search = "") => (dispatch, getState) => {
  // User Loading
  dispatch({ type: COURSES_FETCH });

  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/courses/?search=${search}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: COURSES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: COURSES_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchPlaylistsPagination = (url) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: COURSES_FETCH });

  axios
    .get(url, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: COURSES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: COURSES_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const setPlaylistEdit = (playlist) => (dispatch) => {
  // User Loading

  dispatch({
    type: SET_COURSE_EDIT,
    payload: playlist,
  });
};

export const deletePlaylistEdit = () => (dispatch) => {
  // User Loading

  dispatch({
    type: DELETE_COURSE_EDIT,
  });
};

export const editPlaylist = (playlist) => (dispatch, getState) => {
  delete playlist.picture;
  console.log(playlist);
  dispatch({
    type: EDIT_COURSE,
  });
  axios
    .patch(
      `/api/programs/${getState().programReducer.program.code}/courses/${
        playlist.id
      }/`,
      playlist,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log("res", res);

      dispatch({
        type: EDIT_COURSE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: EDIT_COURSE_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const createPlaylist = (playlist) => (dispatch, getState) => {
  delete playlist.picture;
  console.log(playlist);
  dispatch({
    type: CREATE_COURSE,
  });

  axios
    .post(
      `/api/programs/${getState().programReducer.program.code}/courses/`,
      playlist,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: CREATE_COURSE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: CREATE_COURSE_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const deletePlaylist = (id) => (dispatch, getState) => {
  dispatch({
    type: DELETE_COURSE,
    payload: id,
  });

  axios
    .delete(
      `/api/programs/${getState().programReducer.program.code}/courses/${id}`,
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: DELETE_COURSE_SUCCESS,
      });
      Swal.fire({
        title: "Eliminado!",
        icon: "success",
        confirmButtonText: "Ok",
      });
    })
    .catch((err) => {
      dispatch({
        type: DELETE_COURSE_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
