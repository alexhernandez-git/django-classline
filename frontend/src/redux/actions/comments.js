import axios from "axios";
import Swal from "sweetalert2";

import {
  COMMENTS_FETCH,
  COMMENTS_SUCCESS,
  COMMENTS_FAIL,
  SET_COMMENT_EDIT,
  DELETE_COMMENT_EDIT,
  EDIT_COMMENT,
  EDIT_COMMENT_FAIL,
  EDIT_COMMENT_SUCCESS,
  CREATE_COMMENT,
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_SUCCESS,
  DELETE_COMMENT,
  DELETE_COMMENT_FAIL,
  DELETE_COMMENT_SUCCESS,
  INCREASE_COMMENT,
} from "../types";

import { tokenConfig } from "./auth";

// CHECK TOKEN & LOAD USER
export const fetchComments = (post, search = "") => (dispatch, getState) => {
  // User Loading
  dispatch({ type: COMMENTS_FETCH });

  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/posts/${post}/comments?search=${search}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: COMMENTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: COMMENTS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchCommentsPagination = (url) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: COMMENTS_FETCH });

  axios
    .get(url, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: COMMENTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: COMMENTS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchCommentsIncrease = (post, limit, search = "") => (
  dispatch,
  getState
) => {
  // User Loading
  dispatch({ type: COMMENTS_FETCH });

  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/posts/${post}/comments?search=${search}&limit=${limit}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: COMMENTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: COMMENTS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const setCommentEdit = (post) => (dispatch) => {
  // User Loading

  dispatch({
    type: SET_COMMENT_EDIT,
    payload: post,
  });
};

export const deleteCommentEdit = () => (dispatch) => {
  // User Loading

  dispatch({
    type: DELETE_COMMENT_EDIT,
  });
};

export const editComment = (comment) => (dispatch, getState) => {
  dispatch({
    type: EDIT_COMMENT,
  });
  console.log(comment);

  axios
    .patch(
      `/api/programs/${getState().programReducer.program.code}/comments/${
        comment.id
      }/`,
      fd,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: EDIT_COMMENT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: EDIT_COMMENT_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const createComment = (post, comment) => (dispatch, getState) => {
  dispatch({
    type: CREATE_COMMENT,
  });

  axios
    .post(
      `/api/programs/${
        getState().programReducer.program.code
      }/posts/${post}/users/${getState().authReducer.user.code}/comments/`,
      comment,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log("res", res);

      dispatch({
        type: CREATE_COMMENT_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: INCREASE_COMMENT,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("error", err.response);
      dispatch({
        type: CREATE_COMMENT_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const deleteComment = (id) => (dispatch, getState) => {
  dispatch({
    type: DELETE_COMMENT,
    payload: id,
  });

  axios
    .delete(
      `/api/programs/${getState().programReducer.program.code}/comments/${id}`,
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: DELETE_COMMENT_SUCCESS,
      });
      Swal.fire({
        title: "Eliminado!",
        icon: "success",
        confirmButtonText: "Ok",
      });
    })
    .catch((err) => {
      dispatch({
        type: DELETE_COMMENT_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
