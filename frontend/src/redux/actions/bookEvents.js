import axios from "axios";
import Swal from "sweetalert2";

import {
  SET_SELECTED_EVENT,
  BOOK_EVENT,
  BOOK_EVENT_FAIL,
  BOOK_EVENT_SUCCESS,
} from "../types";

import { tokenConfig } from "./auth";

export const setSelectedEvent = (event) => (dispatch, getState) => {
  dispatch({ type: SET_SELECTED_EVENT, payload: event });
};
export const bookEvent = (
  event,
  paymentMethodId = null,
  promotion_code = null
) => (dispatch, getState) => {
  const data = {
    event: event,
    payment_method: paymentMethodId,
  };
  if (promotion_code) {
    data.promotion_code = promotion_code;
  }
  dispatch({ type: BOOK_EVENT });

  axios
    .patch(
      `/api/programs/${getState().programReducer.program.code}/events/${
        event.id
      }/purchase_event/`,
      data,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log("res-data", res.data);

      dispatch({
        type: BOOK_EVENT_SUCCESS,
        payload: res.data,
      });

      Swal.fire({
        title: "Clase adquirida!",
        icon: "success",
        confirmButtonText: "Ok",
      });
    })
    .catch((err) => {
      dispatch({
        type: BOOK_EVENT_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
