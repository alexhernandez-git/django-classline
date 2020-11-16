import axios from "axios";
import Swal from "sweetalert2";

import {
  SET_QUESTION,
  REMOVE_QUESTION,
  ANSWERS_FETCH,
  ANSWERS_SUCCESS,
  ANSWERS_FAIL,
  SET_ANSWER_EDIT,
  DELETE_ANSWER_EDIT,
  EDIT_ANSWER,
  EDIT_ANSWER_FAIL,
  EDIT_ANSWER_SUCCESS,
  CREATE_ANSWER,
  CREATE_ANSWER_FAIL,
  CREATE_ANSWER_SUCCESS,
  DELETE_ANSWER,
  DELETE_ANSWER_FAIL,
  DELETE_ANSWER_SUCCESS,
  INCREASE_ANSWER,
} from "../../types";

import { tokenConfig } from "../auth";

// CHECK TOKEN & LOAD USER
export const fetchAnswers = (question, search = "") => (dispatch, getState) => {
  // User Loading
  dispatch({ type: ANSWERS_FETCH });

  axios
    .get(
      `/api/programs/${getState().programReducer.program.code}/questions/${
        question.code
      }/answers/?search=${search}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: ANSWERS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ANSWERS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchAnswersPagination = (url) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: ANSWERS_FETCH });

  axios
    .get(url, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ANSWERS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ANSWERS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchAnswersIncrease = (question, limit, search = "") => (
  dispatch,
  getState
) => {
  // User Loading
  dispatch({ type: ANSWERS_FETCH });

  axios
    .get(
      `/api/programs/${getState().programReducer.program.code}/questions/${
        question.code
      }/answers/?search=${search}&limit=${limit}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: ANSWERS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ANSWERS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const setCommentEdit = (post) => (dispatch) => {
  // User Loading

  dispatch({
    type: SET_ANSWER_EDIT,
    payload: post,
  });
};

export const deleteCommentEdit = () => (dispatch) => {
  // User Loading

  dispatch({
    type: DELETE_ANSWER_EDIT,
  });
};

export const editComment = (comment) => (dispatch, getState) => {
  dispatch({
    type: EDIT_ANSWER,
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
        type: EDIT_ANSWER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: EDIT_ANSWER_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const createAnswer = (answer, comment) => (dispatch, getState) => {
  dispatch({
    type: CREATE_ANSWER,
  });

  axios
    .post(
      `/api/programs/${getState().programReducer.program.code}/questions/${
        getState().answersReducer.question.code
      }/answers/`,
      answer,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log("res", res);

      dispatch({
        type: CREATE_ANSWER_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: INCREASE_ANSWER,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("error", err.response);
      dispatch({
        type: CREATE_ANSWER_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const deleteComment = (id) => (dispatch, getState) => {
  dispatch({
    type: DELETE_ANSWER,
    payload: id,
  });

  axios
    .delete(
      `/api/programs/${getState().programReducer.program.code}/comments/${id}`,
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: DELETE_ANSWER_SUCCESS,
      });
      Swal.fire({
        title: "Eliminado!",
        icon: "success",
        confirmButtonText: "Ok",
      });
    })
    .catch((err) => {
      dispatch({
        type: DELETE_ANSWER_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const setQuestion = (question) => (dispatch, getState) => {
  dispatch({
    type: SET_QUESTION,
    payload: question,
  });
};
export const removeQuestion = () => (dispatch, getState) => {
  dispatch({
    type: REMOVE_QUESTION,
  });
};
