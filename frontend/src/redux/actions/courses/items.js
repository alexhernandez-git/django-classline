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
  UPLOAD_ITEM_FILE,
  UPLOAD_ITEM_FILE_SUCCESS,
  UPLOAD_ITEM_FILE_FAIL,
  UPDATE_ITEM_FILE,
  UPDATE_ITEM_FILE_SUCCESS,
  UPDATE_ITEM_FILE_FAIL,
  UPDATE_ITEM_CONTENT,
  UPDATE_ITEM_CONTENT_SUCCESS,
  UPDATE_ITEM_CONTENT_FAIL,
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

export const uploadItemFile = (content, item) => (dispatch, getState) => {
  dispatch({
    type: UPLOAD_ITEM_FILE,
  });
  const fd = new FormData();
  fd.append("type_choices", content.type_choices);

  if (content.type_choices == "VI") {
    fd.append(
      "video",
      content.video,
      Math.random().toString(36) + content.video.name
    );
    fd.append("name", content.video.name);
  } else if (content.type_choices == "MA") {
    fd.append(
      "file",
      content.file,
      Math.random().toString(36) + content.file.name
    );
    fd.append("name", content.file.name);
  }
  axios
    .post(
      `/api/programs/${getState().programReducer.program.code}/courses/${
        getState().courseReducer.course.code
      }/items/${item}/contents/`,
      fd,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: UPLOAD_ITEM_FILE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("error", err.response);
      dispatch({
        type: UPLOAD_ITEM_FILE_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const updateItemFile = (content, item, content_id) => (
  dispatch,
  getState
) => {
  dispatch({
    type: UPDATE_ITEM_FILE,
  });
  const fd = new FormData();
  if (content.type_choices == "VI") {
    fd.append(
      "video",
      content.video,
      Math.random().toString(36) + content.video.name
    );
    fd.append("name", content.video.name);
  } else if (content.type_choices == "MA") {
    fd.append(
      "file",
      content.file,
      Math.random().toString(36) + content.file.name
    );
    fd.append("name", content.file.name);
  }
  axios
    .patch(
      `/api/programs/${getState().programReducer.program.code}/courses/${
        getState().courseReducer.course.code
      }/items/${item}/contents/${content_id}/`,
      fd,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: UPDATE_ITEM_FILE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("error", err.response);
      dispatch({
        type: UPDATE_ITEM_FILE_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const updateContentDescription = (descripiton, item, content_id) => (
  dispatch,
  getState
) => {
  dispatch({
    type: UPDATE_ITEM_CONTENT,
  });
  axios
    .patch(
      `/api/programs/${getState().programReducer.program.code}/courses/${
        getState().courseReducer.course.code
      }/items/${item}/contents/${content_id}/`,
      { description: descripiton },
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: UPDATE_ITEM_CONTENT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: UPDATE_ITEM_CONTENT_FAIL,
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
