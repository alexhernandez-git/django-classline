import axios from "axios";
import Swal from "sweetalert2";
import {
  PROGRAM_FETCH,
  PROGRAM_SUCCESS,
  PROGRAM_FAIL,
  PROGRAM_PICTURE_UPLOAD,
  PROGRAM_PICTURE_SUCCESS,
  PROGRAM_PICTURE_FAIL,
  PROGRAM_SAVE,
  PROGRAM_SAVE_SUCCESS,
  PROGRAM_SAVE_FAIL,
  PROGRAM_VIDEO_UPLOAD,
  PROGRAM_VIDEO_SUCCESS,
  PROGRAM_VIDEO_FAIL,
  PROGRAM_ACTIVE,
  PROGRAM_ACTIVE_SUCCESS,
  PROGRAM_ACTIVE_FAIL,
  PROGRAM_CANCEL_ACTIVE,
  PROGRAM_CANCEL_ACTIVE_SUCCESS,
  PROGRAM_CANCEL_ACTIVE_FAIL,
  PROGRAM_PUBLISH,
  PROGRAM_PUBLISH_SUCCESS,
  PROGRAM_PUBLISH_FAIL,
  PROGRAM_CANCEL_PUBLISH,
  PROGRAM_CANCEL_PUBLISH_SUCCESS,
  PROGRAM_CANCEL_PUBLISH_FAIL,
  REMOVE_PROGRAM,
  REMOVE_PROGRAM_SUCCESS,
  REMOVE_PROGRAM_FAIL,
  ACQUIRE_ACCOUNTS,
  ACQUIRE_ACCOUNTS_SUCCESS,
  ACQUIRE_ACCOUNTS_FAIL,
  CANECEL_ACCOUNTS,
  CANECEL_ACCOUNTS_SUCCESS,
  CANECEL_ACCOUNTS_FAIL,
  SET_STRIPE_CUSTOMER_DATA,
  SET_TEACHER_DISCOUNT,
  REMOVE_TEACHER_DISCOUNT,
} from "../types";

import { tokenConfig } from "./auth";
// CHECK TOKEN & LOAD USER
export const fetchProgram = (id) => (dispatch) => {
  // User Loading
  dispatch({ type: PROGRAM_FETCH });

  axios
    .get(`/api/programs/${id}`)
    .then((res) => {
      console.log(res);

      dispatch({
        type: PROGRAM_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PROGRAM_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
      // if (process.browser) {
      //     document.location.href = `https://classlineacademy.com`
      // }
    });
};
export const saveProgram = (program) => (dispatch, getState) => {
  dispatch({ type: PROGRAM_SAVE });
  // dispatch({
  //     type: PROGRAM_PICTURE_SUCCESS,
  //     payload: '/static/img/taichi.jpg'
  // })
  axios
    .patch(
      `/api/programs/${getState().programReducer.program.code}/`,
      program,
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
        type: PROGRAM_SAVE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PROGRAM_SAVE_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const uploadPicture = (picture) => (dispatch, getState) => {
  dispatch({ type: PROGRAM_PICTURE_UPLOAD });
  // dispatch({
  //     type: PROGRAM_PICTURE_SUCCESS,
  //     payload: '/static/img/taichi.jpg'
  // })
  const fd = new FormData();
  fd.append("picture", picture, picture.name);
  axios
    .patch(
      `/api/programs/${getState().programReducer.program.code}/`,
      fd,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: PROGRAM_PICTURE_SUCCESS,
        payload: res.data.picture,
      });
    })
    .catch((err) => {
      dispatch({
        type: PROGRAM_PICTURE_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const uploadVideo = (video_presentation) => (dispatch, getState) => {
  dispatch({ type: PROGRAM_VIDEO_UPLOAD });
  const fd = new FormData();
  fd.append("video_presentation", video_presentation, video_presentation.name);
  axios
    .patch(
      `/api/programs/${getState().programReducer.program.code}/`,
      fd,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: PROGRAM_VIDEO_SUCCESS,
        payload: res.data.video_presentation,
      });
    })
    .catch((err) => {
      dispatch({
        type: PROGRAM_VIDEO_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const activeProgram = () => (dispatch, getState) => {
  dispatch({ type: PROGRAM_ACTIVE });
  axios
    .patch(
      `/api/programs/${getState().programReducer.program.code}/active/`,
      {},
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res);
      Swal.fire({
        title: "Activado!",
        icon: "success",
        confirmButtonText: "Ok",
      });
      dispatch({
        type: PROGRAM_ACTIVE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PROGRAM_ACTIVE_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const cancelActivedProgram = () => (dispatch, getState) => {
  dispatch({ type: PROGRAM_CANCEL_ACTIVE });

  axios
    .patch(
      `/api/programs/${getState().programReducer.program.code}/cancel_active/`,
      {},
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: PROGRAM_CANCEL_ACTIVE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PROGRAM_CANCEL_ACTIVE_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const publishProgram = () => (dispatch, getState) => {
  dispatch({ type: PROGRAM_PUBLISH });
  axios
    .patch(
      `/api/programs/${getState().programReducer.program.code}/publish/`,
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
        type: PROGRAM_PUBLISH_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PROGRAM_PUBLISH_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const cancelPublishedProgram = () => (dispatch, getState) => {
  dispatch({ type: PROGRAM_CANCEL_PUBLISH });

  axios
    .patch(
      `/api/programs/${getState().programReducer.program.code}/cancel_publish/`,
      {},
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: PROGRAM_CANCEL_PUBLISH_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PROGRAM_CANCEL_PUBLISH_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const removeProgram = () => (dispatch, getState) => {
  dispatch({ type: REMOVE_PROGRAM });
  axios
    .delete(
      `/api/programs/${getState().programReducer.program.code}/`,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res);
      window.location.href = "/";
      dispatch({
        type: REMOVE_PROGRAM_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: REMOVE_PROGRAM_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const addAcquireAccounts = (
  accounts_acquired,
  paymentMethodId = null,
  promotion_code = null
) => (dispatch, getState) => {
  const data = {
    accounts_acquired: accounts_acquired,
    payment_method_id: paymentMethodId,
  };
  console.log("promcode", promotion_code);
  if (promotion_code) {
    if (promotion_code.is_discount) {
      data.discount = promotion_code;
    } else {
      data.promotion_code = promotion_code;
    }
  }
  console.log("data", data);
  dispatch({ type: ACQUIRE_ACCOUNTS, payload: accounts_acquired });

  axios
    .patch(
      `/api/programs/${getState().programReducer.program.code}/add_accounts/`,
      data,
      tokenConfig(getState)
    )
    .then((res) => {
      const { discount, customer_id, payment_methods, program } = res.data;

      dispatch({
        type: ACQUIRE_ACCOUNTS_SUCCESS,
        payload: program,
      });
      if (discount) {
        dispatch({
          type: SET_TEACHER_DISCOUNT,
          payload: discount,
        });
      }
      if (customer_id && payment_methods) {
        dispatch({
          type: SET_STRIPE_CUSTOMER_DATA,
          payload: res.data,
        });
      }
      Swal.fire({
        title: "Cuentas adquiridas!",
        icon: "success",
        confirmButtonText: "Ok",
      });
    })
    .catch((err) => {
      dispatch({
        type: ACQUIRE_ACCOUNTS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const cancelAcquireAccounts = () => (dispatch, getState) => {
  dispatch({ type: CANECEL_ACCOUNTS });
  axios
    .patch(
      `/api/programs/${
        getState().programReducer.program.code
      }/cancel_accounts/`,
      {},
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: CANECEL_ACCOUNTS_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: REMOVE_TEACHER_DISCOUNT,
      });
      Swal.fire({
        title: "Cuentas canceladas",
        icon: "success",
        confirmButtonText: "Ok",
      });
    })
    .catch((err) => {
      dispatch({
        type: CANECEL_ACCOUNTS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
