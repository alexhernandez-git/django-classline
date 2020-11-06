import axios from "axios";

import {
  ITEMS_FETCH,
  ITEMS_SUCCESS,
  ITEMS_FAIL,
  CREATE_ITEM,
  CREATE_ITEM_FAIL,
  CREATE_ITEM_SUCCESS,
  UPDATE_ITEMS_ORDER,
  UPDATE_ITEMS_ORDER_SUCCESS,
  UPDATE_ITEMS_ORDER_FAIL,
} from "../../types";

import { tokenConfig } from "../auth";

// CHECK TOKEN & LOAD USER
export const fetchItems = (search = "") => (dispatch, getState) => {
  // User Loading
  dispatch({ type: ITEMS_FETCH });

  axios
    .get(
      `/api/programs/${getState().programReducer.program.code}/courses/${
        getState().courseReducer.course.code
      }/blocks/${
        getState().blockReducer.block.code
      }/item-tracks/?search=${search}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: ITEMS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ITEMS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchItemsPagination = (url) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: ITEMS_FETCH });

  axios
    .get(url, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ITEMS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ITEMS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchItemsIncrease = (limit, search = "") => (
  dispatch,
  getState
) => {
  // User Loading
  dispatch({ type: ITEMS_FETCH });

  axios
    .get(
      `/api/programs/${getState().programReducer.program.code}/courses/${
        getState().courseReducer.course.code
      }/blocks/${
        getState().blockReducer.block.code
      }/item-tracks/?search=${search}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: ITEMS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ITEMS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const createItem = (item) => (dispatch, getState) => {
  dispatch({
    type: CREATE_ITEM,
  });
  console.log("item".item);
  axios
    .post(
      `/api/programs/${getState().programReducer.program.code}/courses/${
        getState().courseReducer.course.code
      }/blocks/${getState().blockReducer.block.code}/item-tracks/`,
      item,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log("res", res);

      dispatch({
        type: CREATE_ITEM_SUCCESS,
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
        type: CREATE_ITEM_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const updateItemsOrder = () => (dispatch, getState) => {
  dispatch({
    type: UPDATE_ITEMS_ORDER,
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
        type: UPDATE_ITEMS_ORDER_SUCCESS,
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
        type: UPDATE_ITEMS_ORDER_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
