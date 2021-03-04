import axios from "axios";
import Swal from "sweetalert2";

import {
  SET_SELECTED_EVENT,
  BOOK_EVENT,
  BOOK_EVENT_FAIL,
  BOOK_EVENT_SUCCESS,
  FETCH_EVENTS_BOOKED,
  FETCH_EVENTS_BOOKED_SUCCESS,
  FETCH_EVENTS_BOOKED_FAIL,
  CANCEL_EVENT,
  CANCEL_EVENT_FAIL,
  CANCEL_EVENT_SUCCESS,
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

// CHECK TOKEN & LOAD USER
export const fetchEventsBooked = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: FETCH_EVENTS_BOOKED });

  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/events/list_events_booked/`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: FETCH_EVENTS_BOOKED_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: FETCH_EVENTS_BOOKED_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const cancelEvent = (id) => (dispatch, getState) => {
  dispatch({ type: CANCEL_EVENT, payload: id });
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
        type: CANCEL_EVENT_SUCCESS,
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
        type: CANCEL_EVENT_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
