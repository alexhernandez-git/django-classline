import axios from "axios";
import Swal from "sweetalert2";

import {
  PUBLIC_FOLDERS_FETCH,
  PUBLIC_FOLDERS_SUCCESS,
  PUBLIC_FOLDERS_FAIL,
  SET_CURRENT_PUBLIC_FOLDER,
  REMOVE_CURRENT_PUBLIC_FOLDER,
} from "../types";

import { tokenConfig } from "./auth";

// CHECK TOKEN & LOAD USER
export const fetchFolders = (search = "") => (dispatch, getState) => {
  // User Loading
  dispatch({ type: PUBLIC_FOLDERS_FETCH });
  let current_folder = "";
  if (getState().publicFoldersReducer.current_folders.length > 0) {
    current_folder = getState().publicFoldersReducer.current_folders[
      getState().publicFoldersReducer.current_folders.length - 1
    ];
  }
  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/public-folders/?search=${search}&top_folder=${current_folder}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: PUBLIC_FOLDERS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PUBLIC_FOLDERS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const setCurrentFolder = (id) => (dispatch, getState) => {
  dispatch({
    type: SET_CURRENT_PUBLIC_FOLDER,
    payload: id,
  });
};
export const removeCurrentFolder = () => (dispatch, getState) => {
  dispatch({
    type: REMOVE_CURRENT_PUBLIC_FOLDER,
  });
};
