import axios from "axios";
import Swal from "sweetalert2";
import {
  BLOCK_FETCH,
  BLOCK_SUCCESS,
  BLOCK_FAIL,
  BLOCK_PICTURE_UPLOAD,
  BLOCK_PICTURE_SUCCESS,
  BLOCK_PICTURE_FAIL,
  BLOCK_SAVE,
  BLOCK_SAVE_SUCCESS,
  BLOCK_SAVE_FAIL,
  REMOVE_BLOCK,
  REMOVE_BLOCK_SUCCESS,
  REMOVE_BLOCK_FAIL,
  RESET_BLOCKS_ERRORS,
} from "../../types";

import { tokenConfig } from "../auth";
// CHECK TOKEN & LOAD USER
export const fetchBlock = (id) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: BLOCK_FETCH });
  console.log(
    `/api/programs/${getState().programReducer.program.code}/courses/${
      getState().courseReducer.course.code
    }/blocks/${id}/`
  );
  axios
    .get(
      `/api/programs/${getState().programReducer.program.code}/courses/${
        getState().courseReducer.course.code
      }/blocks/${id}/`
    )
    .then((res) => {
      console.log(res);

      dispatch({
        type: BLOCK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: BLOCK_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
      // if (process.browser) {
      //     document.location.href = `https://classlineacademy.com`
      // }
    });
};
export const saveBlock = (course) => (dispatch, getState) => {
  dispatch({ type: BLOCK_SAVE });
  // dispatch({
  //     type: BLOCK_PICTURE_SUCCESS,
  //     payload: '/static/img/taichi.jpg'
  // })
  console.log(getState().courseReducer);
  axios
    .patch(
      `/api/programs/${getState().programReducer.program.code}/courses/${
        getState().courseReducer.course.code
      }/blocks/${getState().blockReducer.block.code}/`,
      course,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res);
      Swal.fire({
        title: "Guardado!",
        icon: "success",
        confirmButtonText: "Ok",
      });
      dispatch({
        type: BLOCK_SAVE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: BLOCK_SAVE_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const uploadPicture = (picture) => (dispatch, getState) => {
  dispatch({ type: BLOCK_PICTURE_UPLOAD });
  // dispatch({
  //     type: BLOCK_PICTURE_SUCCESS,
  //     payload: '/static/img/taichi.jpg'
  // })
  const fd = new FormData();
  fd.append("picture", picture, picture.name);
  axios
    .patch(
      `/api/programs/${getState().programReducer.program.code}/courses/${
        getState().courseReducer.course.code
      }/blocks/${getState().blockReducer.block.code}/`,
      fd,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: BLOCK_PICTURE_SUCCESS,
        payload: res.data.picture,
      });
    })
    .catch((err) => {
      dispatch({
        type: BLOCK_PICTURE_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const removeBlock = (history) => (dispatch, getState) => {
  dispatch({ type: REMOVE_BLOCK });
  axios
    .delete(
      `/api/programs/${getState().programReducer.program.code}/courses/${
        getState().courseReducer.course.code
      }/blocks/${getState().blockReducer.block.code}/`,
      tokenConfig(getState)
    )
    .then((res) => {
      history.back();
      dispatch({
        type: REMOVE_BLOCK_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: REMOVE_BLOCK_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const resetBlocksErrors = () => (dispatch) => {
  dispatch({
    type: RESET_BLOCKS_ERRORS,
  });
};
