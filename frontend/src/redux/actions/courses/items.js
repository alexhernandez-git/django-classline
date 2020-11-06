import axios from "axios";
import Swal from "sweetalert2";

import {
  ITEMS_FETCH,
  ITEMS_SUCCESS,
  ITEMS_FAIL,
  CREATE_ITEM,
  CREATE_ITEM_FAIL,
  CREATE_ITEM_SUCCESS,
  REMOVE_ITEM,
  REMOVE_ITEM_FAIL,
  REMOVE_ITEM_SUCCESS,
  ITEM_SAVE,
  ITEM_SAVE_SUCCESS,
  ITEM_SAVE_FAIL,
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

export const removeItem = (item) => (dispatch, getState) => {
  dispatch({ type: REMOVE_ITEM, payload: item });
  axios
    .delete(
      `/api/programs/${getState().programReducer.program.code}/courses/${
        getState().courseReducer.course.code
      }/blocks/${getState().blockReducer.block.code}/items/${item}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: REMOVE_ITEM_SUCCESS,
      });
      Swal.fire({
        title: "Eliminado!",
        icon: "success",
        confirmButtonText: "Ok",
      });
    })
    .catch((err) => {
      dispatch({
        type: REMOVE_ITEM_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const saveItem = (id, name) => (dispatch, getState) => {
  dispatch({ type: ITEM_SAVE });

  axios
    .patch(
      `/api/programs/${getState().programReducer.program.code}/courses/${
        getState().courseReducer.course.code
      }/blocks/${getState().blockReducer.block.code}/items/${id}/`,
      { name: name },
      tokenConfig(getState)
    )
    .then((res) => {
      Swal.fire({
        title: "Guardado!",
        icon: "success",
        confirmButtonText: "Ok",
      });
      dispatch({
        type: ITEM_SAVE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ITEM_SAVE_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
