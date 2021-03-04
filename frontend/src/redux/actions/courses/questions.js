import axios from "axios";
import Swal from "sweetalert2";

import {
  QUESTIONS_FETCH,
  QUESTIONS_SUCCESS,
  QUESTIONS_FAIL,
  EDIT_QUESTION,
  EDIT_QUESTION_FAIL,
  EDIT_QUESTION_SUCCESS,
  CREATE_QUESTION,
  CREATE_QUESTION_FAIL,
  CREATE_QUESTION_SUCCESS,
  DELETE_QUESTION,
  DELETE_QUESTION_FAIL,
  DELETE_QUESTION_SUCCESS,
} from "../../types";

import { tokenConfig } from "../auth";

// CHECK TOKEN & LOAD USER
export const fetchQuestions = (item_id, search = "") => (
  dispatch,
  getState
) => {
  // User Loading
  dispatch({ type: QUESTIONS_FETCH });

  axios
    .get(
      `/api/programs/${getState().programReducer.program.code}/courses/${
        getState().playingCourseReducer.course.code
      }/items/${item_id}/questions/?search=${search}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: QUESTIONS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: QUESTIONS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchQuestionsPagination = (url) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: QUESTIONS_FETCH });

  axios
    .get(url, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: QUESTIONS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: QUESTIONS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchQuestionsIncrease = (item_id, limit, search = "") => (
  dispatch,
  getState
) => {
  // User Loading
  dispatch({ type: QUESTIONS_FETCH });

  axios
    .get(
      `/api/programs/${getState().programReducer.program.code}/courses/${
        getState().playingCourseReducer.course.code
      }/items/${item_id}/questions/?limit=${limit}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: QUESTIONS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: QUESTIONS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const editQuestion = (question) => (dispatch, getState) => {
  dispatch({
    type: EDIT_QUESTION,
  });
  console.log(question);

  axios
    .patch(
      `/api/programs/${getState().programReducer.program.code}/courses/${
        getState().playingCourseReducer.course.code
      }/items/${item_id}/questions/${question_id}/`,
      question,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: EDIT_QUESTION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: EDIT_QUESTION_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const createQuestion = (item_id, question) => (dispatch, getState) => {
  dispatch({
    type: CREATE_QUESTION,
  });

  axios
    .post(
      `/api/programs/${getState().programReducer.program.code}/courses/${
        getState().playingCourseReducer.course.code
      }/items/${item_id}/questions/`,
      question,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log("res", res);

      dispatch({
        type: CREATE_QUESTION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("error", err.response);
      dispatch({
        type: CREATE_QUESTION_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const deleteQuestion = (id) => (dispatch, getState) => {
  dispatch({
    type: DELETE_QUESTION,
    payload: id,
  });

  axios
    .delete(
      `/api/programs/${getState().programReducer.program.code}/courses/${
        getState().playingCourseReducer.course.code
      }/items/${item_id}/questions/${question_id}/`,
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: DELETE_QUESTION_SUCCESS,
      });
      Swal.fire({
        title: "Eliminado!",
        icon: "success",
        confirmButtonText: "Ok",
      });
    })
    .catch((err) => {
      dispatch({
        type: DELETE_QUESTION_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
