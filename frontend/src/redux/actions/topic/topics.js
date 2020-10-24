
import axios from "axios";
import Swal from "sweetalert2";
import {
  TOPICS_FETCH,
  TOPICS_SUCCESS,
  TOPICS_FAIL,
  CREATE_TOPIC,
  CREATE_TOPIC_FAIL,
  CREATE_TOPIC_SUCCESS,
} from "../../types";

import { tokenConfig } from "../auth";
// CHECK TOKEN & LOAD USER

// CHECK TOKEN & LOAD USER
export const fetchTopics = (search = "") => (dispatch, getState) => {
  // User Loading
  dispatch({ type: TOPICS_FETCH });

  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/topics/?search=${search}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: TOPICS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: TOPICS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchTopicsPagination = (url) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: TOPICS_FETCH });

  axios
    .get(url, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: TOPICS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: TOPICS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchTopicsIncrease = (limit, search = "") => (
  dispatch,
  getState
) => {
  // User Loading
  dispatch({ type: TOPICS_FETCH });

  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/topics/?search=${search}&limit=${limit}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: TOPICS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: TOPICS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const createTopic = (history) => (dispatch, getState) => {
  dispatch({
    type: CREATE_TOPIC,
  });
  axios
    .post(
      `/api/programs/${getState().programReducer.program.code}/topics/`,
      {},
      tokenConfig(getState)
    )
    .then((res) => {
      console.log("res", res);

      dispatch({
        type: CREATE_TOPIC_SUCCESS,
        payload: res.data,
      });
      history.push(`/academy/${getState().programReducer.program.code}/admin/topic/${res.data.code}`);

    })
    .catch((err) => {
      console.log("error", err.response);
      dispatch({
        type: CREATE_TOPIC_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

