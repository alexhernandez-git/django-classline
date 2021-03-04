import axios from "axios";

import {
  BLOCKS_FETCH,
  BLOCKS_SUCCESS,
  BLOCKS_FAIL,
  CREATE_BLOCK,
  CREATE_BLOCK_FAIL,
  CREATE_BLOCK_SUCCESS,
  UPDATE_BLOCKS_ORDER,
  UPDATE_BLOCKS_ORDER_SUCCESS,
  UPDATE_BLOCKS_ORDER_FAIL,
} from "../../types";

import { tokenConfig } from "../auth";

// CHECK TOKEN & LOAD USER
export const fetchBlocks = (search = "") => (dispatch, getState) => {
  // User Loading
  dispatch({ type: BLOCKS_FETCH });

  axios
    .get(
      `/api/programs/${getState().programReducer.program.code}/courses/${
        getState().courseReducer.course.code
      }/block-tracks/?search=${search}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: BLOCKS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: BLOCKS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchBlocksPagination = (url) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: BLOCKS_FETCH });

  axios
    .get(url, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: BLOCKS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: BLOCKS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchBlocksIncrease = (limit, search = "") => (
  dispatch,
  getState
) => {
  // User Loading
  dispatch({ type: BLOCKS_FETCH });

  axios
    .get(
      `/api/programs/${getState().programReducer.program.code}/courses/${
        getState().courseReducer.course.code
      }/block-tracks/?search=${search}&limit=${limit}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: BLOCKS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: BLOCKS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const createBlock = (history) => (dispatch, getState) => {
  dispatch({
    type: CREATE_BLOCK,
  });
  axios
    .post(
      `/api/programs/${getState().programReducer.program.code}/courses/${
        getState().courseReducer.course.code
      }/block-tracks/`,
      {},
      tokenConfig(getState)
    )
    .then((res) => {
      console.log("res", res);

      dispatch({
        type: CREATE_BLOCK_SUCCESS,
        payload: res.data,
      });
      // history.push(
      //   `/academy/${getState().programReducer.program.code}/admin/course/${
      //     res.data.code
      //   }`
      // );
    })
    .catch((err) => {
      console.log("error", err.response);
      dispatch({
        type: CREATE_BLOCK_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const updateBlocksOrder = () => (dispatch, getState) => {
  dispatch({
    type: UPDATE_BLOCKS_ORDER,
  });
  axios
    .patch(
      `/api/programs/${getState().programReducer.program.code}/courses/${
        getState().courseReducer.course.code
      }/update_blocks/`,
      { tracks: getState().blocksReducer.blocks },
      tokenConfig(getState)
    )
    .then((res) => {
      console.log("res", res);

      dispatch({
        type: UPDATE_BLOCKS_ORDER_SUCCESS,
        payload: res.data,
      });
      // history.push(
      //   `/academy/${getState().programReducer.program.code}/admin/course/${
      //     res.data.code
      //   }`
      // );
    })
    .catch((err) => {
      console.log("error", err.response);
      dispatch({
        type: UPDATE_BLOCKS_ORDER_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
