import axios from "axios";
import Swal from "sweetalert2";

import {
  POSTS_FETCH,
  POSTS_SUCCESS,
  POSTS_FAIL,
  SET_POST_EDIT,
  DELETE_POST_EDIT,
  EDIT_POST,
  EDIT_POST_FAIL,
  EDIT_POST_SUCCESS,
  CREATE_POST,
  CREATE_POST_FAIL,
  CREATE_POST_SUCCESS,
  DELETE_POST,
  DELETE_POST_FAIL,
  DELETE_POST_SUCCESS,
} from "../types";

import { tokenConfig } from "./auth";

// CHECK TOKEN & LOAD USER
export const fetchPosts = (search = "") => (dispatch, getState) => {
  // User Loading
  dispatch({ type: POSTS_FETCH });

  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/posts/?search=${search}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: POSTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: POSTS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchPostsPagination = (url) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: POSTS_FETCH });

  axios
    .get(url, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: POSTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: POSTS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchPostsIncrease = (limit, search = "") => (
  dispatch,
  getState
) => {
  // User Loading
  dispatch({ type: POSTS_FETCH });

  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/posts/?search=${search}&limit=${limit}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: POSTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: POSTS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const editPost = (post) => (dispatch, getState) => {
  dispatch({
    type: EDIT_POST,
  });
  console.log(post);

  axios
    .patch(
      `/api/programs/${getState().programReducer.program.code}/posts/${
        post.id
      }/`,
      post,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: EDIT_POST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: EDIT_POST_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const createPost = (post) => (dispatch, getState) => {
  dispatch({
    type: CREATE_POST,
  });

  axios
    .post(
      `/api/programs/${getState().programReducer.program.code}/posts/`,
      post,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log("res", res);

      dispatch({
        type: CREATE_POST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("error", err.response);
      dispatch({
        type: CREATE_POST_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const deletePost = (id, push) => (dispatch, getState) => {
  dispatch({
    type: DELETE_POST,
    payload: id,
  });

  axios
    .delete(
      `/api/programs/${getState().programReducer.program.code}/posts/${id}`,
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: DELETE_POST_SUCCESS,
      });
      push(`/academy/${getState().programReducer.program.code}/forum/`);
      Swal.fire({
        title: "Eliminado!",
        icon: "success",
        confirmButtonText: "Ok",
      });
    })
    .catch((err) => {
      dispatch({
        type: DELETE_POST_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
