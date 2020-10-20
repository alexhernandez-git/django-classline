import axios from "axios";
import Swal from "sweetalert2";

import {
  SET_SELECTED_PACK,
  BUY_PACK,
  BUY_PACK_FAIL,
  BUY_PACK_SUCCESS,
  FETCH_PUBLISHED_PACKS,
  FETCH_PUBLISHED_PACKS_SUCCESS,
  FETCH_PUBLISHED_PACKS_FAIL,
  FETCH_MY_PACKS,
  FETCH_MY_PACKS_SUCCESS,
  FETCH_MY_PACKS_FAIL,
  CANCEL_PACK,
  CANCEL_PACK_FAIL,
  CANCEL_PACK_SUCCESS,
} from "../types";

import { tokenConfig } from "./auth";

export const setSelectedPack = (pack) => (dispatch, getState) => {
  dispatch({ type: SET_SELECTED_PACK, payload: pack });
};


export const buyPack = (
  pack,
  paymentMethodId = null,
  promotion_code = null
) => (dispatch, getState) => {
  const data = {
    payment_method: paymentMethodId,
  };
  if (promotion_code) {
    data.promotion_code = promotion_code;
  }
  dispatch({ type: BUY_PACK });

  axios
    .patch(
      `/api/programs/${getState().programReducer.program.code}/packs/${
        pack.code
      }/buy_pack/`,
      data,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log("res-data", res.data);

      dispatch({
        type: BUY_PACK_SUCCESS,
        payload: res.data,
      });

      Swal.fire({
        title: "Pack Adquirido!",
        icon: "success",
        confirmButtonText: "Ok",
      });
    })
    .catch((err) => {
      dispatch({
        type: BUY_PACK_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

// CHECK TOKEN & LOAD USER
export const fetchPublishedPacks = (setShowMyPacks = false) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: FETCH_PUBLISHED_PACKS });

  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/packs/`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: FETCH_PUBLISHED_PACKS_SUCCESS,
        payload: res.data,
      });
      if (setShowMyPacks) {
        setShowMyPacks(false)
      }
    })
    .catch((err) => {
      dispatch({
        type: FETCH_PUBLISHED_PACKS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const fetchBuyPacksPagination = (url, showMyPacks) => (dispatch, getState) => {
  // User Loading
  dispatch({ type:showMyPacks? FETCH_MY_PACKS: FETCH_PUBLISHED_PACKS });

  axios
    .get(url, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: showMyPacks ? FETCH_MY_PACKS_SUCCESS: FETCH_PUBLISHED_PACKS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: showMyPacks ?FETCH_MY_PACKS_FAIL : FETCH_PUBLISHED_PACKS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchMyPacks = (setShowMyPacks=false) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: FETCH_MY_PACKS,
  payload: getState().authReducer.user.id });
  if (setShowMyPacks) {
      setShowMyPacks(true)
  }
  // axios
  //   .get(
  //     `/api/programs/${
  //       getState().programReducer.program.code
  //     }/packs/list_my_packs/`,
  //     tokenConfig(getState)
  //   )
  //   .then((res) => {
  //     dispatch({
  //       type: FETCH_MY_PACKS_SUCCESS,
  //       payload: res.data,
  //     });
  //  
  //   })
  //   .catch((err) => {
  //     dispatch({
  //       type: FETCH_MY_PACKS_FAIL,
  //       payload: { data: err.response.data, status: err.response.status },
  //     });
  //   });
};


export const cancelEvent = (id) => (dispatch, getState) => {
  dispatch({ type: CANCEL_PACK, payload: id });
  console.log(id);
  axios
    .delete(
      `/api/programs/${
        getState().programReducer.program.code
      }/events/${id}/cancel_event_purchase/`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: CANCEL_PACK_SUCCESS,
        payload: res.data,
      });

      Swal.fire({
        title: "Clase cancelada!",
        text: "En los próximos dias recibirás tu reembolso",
        icon: "success",
        confirmButtonText: "Ok",
      });
    })
    .catch((err) => {
      dispatch({
        type: CANCEL_PACK_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
