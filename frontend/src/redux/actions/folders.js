import axios from "axios";
import Swal from "sweetalert2";

import {
  FOLDERS_FETCH,
  FOLDERS_SUCCESS,
  FOLDERS_FAIL,
  EDIT_FOLDER,
  EDIT_FOLDER_FAIL,
  EDIT_FOLDER_SUCCESS,
  CREATE_FOLDER,
  CREATE_FOLDER_FAIL,
  CREATE_FOLDER_SUCCESS,
  DELETE_FOLDER,
  DELETE_FOLDER_FAIL,
  DELETE_FOLDER_SUCCESS,
  SET_TOP_FOLDER,
} from "../types";

import { tokenConfig } from "./auth";

// CHECK TOKEN & LOAD USER
export const fetchFolders = (search = "") => (dispatch, getState) => {
  // User Loading
  dispatch({ type: FOLDERS_FETCH });
  let top_folder = "";
  if (getState().foldersReducer.top_folder) {
    top_folder = getState().foldersReducer.top_folder;
  }
  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/folders/?search=${search}&top_folder=${top_folder}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: FOLDERS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: FOLDERS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const editFolder = (folder) => (dispatch, getState) => {
  dispatch({
    type: EDIT_FOLDER,
  });
  axios
    .patch(
      `/api/programs/${getState().programReducer.program.code}/folders/${
        folder.id
      }/`,
      folder,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log("res", res);

      dispatch({
        type: EDIT_FOLDER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: EDIT_FOLDER_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const createFolder = () => (dispatch, getState) => {
  dispatch({
    type: CREATE_FOLDER,
  });
  let folder = {
    name: "Nueva Carpeta",
  };
  if (getState().foldersReducer.top_folder) {
    folder.top_folder = getState().foldersReducer.top_folder;
  }
  axios
    .post(
      `/api/programs/${getState().programReducer.program.code}/folders/`,
      folder,
      tokenConfig(getState)
    )
    .then((res) => {
      res.data.is_editing = true;
      console.log("res.data", res.data);
      dispatch({
        type: CREATE_FOLDER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: CREATE_FOLDER_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const deleteFolders = (id) => (dispatch, getState) => {
  dispatch({
    type: DELETE_FOLDER,
    payload: id,
  });

  axios
    .delete(
      `/api/programs/${getState().programReducer.program.code}/folders/${id}`,
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: DELETE_FOLDER_SUCCESS,
      });
      Swal.fire({
        title: "Eliminado!",
        icon: "success",
        confirmButtonText: "Ok",
      });
    })
    .catch((err) => {
      dispatch({
        type: DELETE_FOLDER_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const setTopFolder = (id) => (dispatch, getState) => {
  dispatch({
    type: SET_TOP_FOLDER,
    payload: id,
  });
};
