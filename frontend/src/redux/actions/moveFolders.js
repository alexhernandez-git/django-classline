import axios from "axios";

import {
  MOVE_FOLDERS_FETCH,
  MOVE_FOLDERS_SUCCESS,
  MOVE_FOLDERS_FAIL,
  SET_CURRENT_MOVE_FOLDER,
  REMOVE_CURRENT_MOVE_FOLDER,
  MOVE_FOLDER,
  MOVE_FOLDER_SUCCESS,
  MOVE_FOLDER_FAIL,
  MOVE_FILE,
  MOVE_FILE_SUCCESS,
  MOVE_FILE_FAIL,
} from "../types";

import { tokenConfig } from "./auth";
import { fetchFiles as fetchAdminFiles } from "./files";
import { fetchFolders as fetchAdminFolders } from "./folders";

// CHECK TOKEN & LOAD USER
export const fetchFolders = (search = "") => (dispatch, getState) => {
  // User Loading
  dispatch({ type: MOVE_FOLDERS_FETCH });
  let current_folder = "";
  if (getState().moveFoldersReducer.current_folders.length > 0) {
    current_folder = getState().moveFoldersReducer.current_folders[
      getState().moveFoldersReducer.current_folders.length - 1
    ];
  }
  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/folders/?search=${search}&top_folder=${current_folder}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: MOVE_FOLDERS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: MOVE_FOLDERS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const setCurrentFolder = (id) => (dispatch, getState) => {
  dispatch({
    type: SET_CURRENT_MOVE_FOLDER,
    payload: id,
  });
};
export const removeCurrentFolder = () => (dispatch, getState) => {
  dispatch({
    type: REMOVE_CURRENT_MOVE_FOLDER,
  });
};

export const moveFolder = (folder) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: MOVE_FOLDER });

  axios
    .patch(
      `/api/programs/${getState().programReducer.program.code}/folders/${
        folder.id
      }/update_top_folder/`,
      folder,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch(fetchAdminFolders());
      dispatch(fetchAdminFiles());
      dispatch({
        type: MOVE_FOLDER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: MOVE_FOLDER_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const moveFile = (file) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: MOVE_FILE });

  axios
    .patch(
      `/api/programs/${getState().programReducer.program.code}/files/${
        file.id
      }/update_top_folder/`,
      file,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch(fetchAdminFolders());
      dispatch(fetchAdminFiles());
      dispatch({
        type: MOVE_FILE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: MOVE_FILE_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
