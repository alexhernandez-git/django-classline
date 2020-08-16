import axios from "axios";

import {
  MEETUPS_FETCH,
  MEETUPS_SUCCESS,
  MEETUPS_FAIL,
  EDIT_MEETUP,
  EDIT_MEETUP_FAIL,
  EDIT_MEETUP_SUCCESS,
  CREATE_MEETUP,
  CREATE_MEETUP_FAIL,
  CREATE_MEETUP_SUCCESS,
  DELETE_MEETUP,
  DELETE_MEETUP_FAIL,
  DELETE_MEETUP_SUCCESS,
} from "../types";

import { tokenConfig } from "./auth";

// CHECK TOKEN & LOAD USER
export const fetchMeetups = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: MEETUPS_FETCH });

  axios
    .get(
      `/api/programs/${getState().programReducer.program.code}/events/`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: MEETUPS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: MEETUPS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const editMeetup = (meetup) => (dispatch, getState) => {
  dispatch({
    type: EDIT_MEETUP,
    payload: meetup,
  });
  axios
    .patch(
      `/api/programs/${getState().programReducer.program.code}/events/${
        meetup.id
      }/`,
      meetup,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: EDIT_MEETUP_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: EDIT_MEETUP_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const createMeetup = (meetup) => (dispatch, getState) => {
  dispatch({
    type: CREATE_MEETUP,
  });

  axios
    .post(
      `/api/programs/${getState().programReducer.program.code}/events/`,
      meetup,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: CREATE_MEETUP_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: CREATE_MEETUP_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const deleteMeetup = (id) => (dispatch, getState) => {
  dispatch({
    type: DELETE_MEETUP,
    payload: id,
  });

  axios
    .delete(
      `/api/programs/${getState().programReducer.program.code}/events/${id}/`,
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: DELETE_MEETUP_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: DELETE_MEETUP_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
