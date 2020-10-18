import axios from "axios";
import Swal from "sweetalert2";
import {
  PACK_FETCH,
  PACK_SUCCESS,
  PACK_FAIL,
  PACK_PICTURE_UPLOAD,
  PACK_PICTURE_SUCCESS,
  PACK_PICTURE_FAIL,
  PACK_SAVE,
  PACK_SAVE_SUCCESS,
  PACK_SAVE_FAIL,
  PACK_PUBLISH,
  PACK_PUBLISH_SUCCESS,
  PACK_PUBLISH_FAIL,
  PACK_CANCEL_PUBLISH,
  PACK_CANCEL_PUBLISH_SUCCESS,
  PACK_CANCEL_PUBLISH_FAIL,
  REMOVE_PACK,
  REMOVE_PACK_SUCCESS,
  REMOVE_PACK_FAIL,
} from "../types";

import { tokenConfig } from "./auth";
// CHECK TOKEN & LOAD USER
export const fetchPack = (id) => (dispatch) => {
  // User Loading
  dispatch({ type: PACK_FETCH });

  axios
    .get(`/api/programs/${
      getState().programReducer.program.code
    }/pack/${id}`)
    .then((res) => {
      console.log(res);

      dispatch({
        type: PACK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PACK_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
      // if (process.browser) {
      //     document.location.href = `https://classlineacademy.com`
      // }
    });
};
export const savePack = (pack) => (dispatch, getState) => {
  dispatch({ type: PACK_SAVE });
  // dispatch({
  //     type: PACK_PICTURE_SUCCESS,
  //     payload: '/static/img/taichi.jpg'
  // })
  axios
    .patch(
      `/api/programs/${getState().programReducer.program.code}/pack/${getState().packReducer.pack.code}/`,
      pack,
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
        type: PACK_SAVE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PACK_SAVE_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const uploadPicture = (picture) => (dispatch, getState) => {
  dispatch({ type: PACK_PICTURE_UPLOAD });
  // dispatch({
  //     type: PACK_PICTURE_SUCCESS,
  //     payload: '/static/img/taichi.jpg'
  // })
  const fd = new FormData();
  fd.append("picture", picture, picture.name);
  axios
    .patch(
      `/api/programs/${getState().programReducer.program.code}/pack/${getState().packReducer.pack.code}/`,
      fd,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: PACK_PICTURE_SUCCESS,
        payload: res.data.picture,
      });
    })
    .catch((err) => {
      dispatch({
        type: PACK_PICTURE_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};


export const publishPack = () => (dispatch, getState) => {
  dispatch({ type: PACK_PUBLISH });
  axios
    .patch(
      `/api/programs/${getState().programReducer.program.code}/pack/${getState().packReducer.pack.code}/publish/`,
      {},
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res);
      Swal.fire({
        title: "Publicado!",
        icon: "success",
        confirmButtonText: "Ok",
      });
      dispatch({
        type: PACK_PUBLISH_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PACK_PUBLISH_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const cancelPublishedPack = () => (dispatch, getState) => {
  dispatch({ type: PACK_CANCEL_PUBLISH });

  axios
    .patch(
      `/api/programs/${getState().programReducer.program.code}/pack/${getState().packReducer.pack.code}/cancel_publish/`,
      {},
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: PACK_CANCEL_PUBLISH_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PACK_CANCEL_PUBLISH_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const removePack = () => (dispatch, getState) => {
  dispatch({ type: REMOVE_PACK });
  axios
    .delete(
      `/api/programs/${getState().programReducer.program.code}/pack/${getState().packReducer.pack.code}/`,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res);
      window.location.href = `/academy/${getState().programReducer.program.code}/admin/packs`;
      dispatch({
        type: REMOVE_PACK_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: REMOVE_PACK_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
