import axios from "axios";
import Swal from "sweetalert2";

import {
  SHARED_FOLDERS_FETCH,
  SHARED_FOLDERS_SUCCESS,
  SHARED_FOLDERS_FAIL,
  SET_CURRENT_SHARED_FOLDER,
  REMOVE_CURRENT_SHARED_FOLDER,
} from "../types";

import { tokenConfig } from "./auth";

// CHECK TOKEN & LOAD USER
export const fetchFolders = (search = "") => (dispatch, getState) => {
  // User Loading
  dispatch({ type: SHARED_FOLDERS_FETCH });
  let current_folder = "";
  if (getState().sharedFoldersReducer.current_folders.length > 0) {
    current_folder = getState().sharedFoldersReducer.current_folders[
      getState().sharedFoldersReducer.current_folders.length - 1
    ];
  }
  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/shared-folders/?search=${search}&top_folder=${current_folder}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: SHARED_FOLDERS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SHARED_FOLDERS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const setCurrentFolder = (id) => (dispatch, getState) => {
  dispatch({
    type: SET_CURRENT_SHARED_FOLDER,
    payload: id,
  });
};
export const removeCurrentFolder = () => (dispatch, getState) => {
  dispatch({
    type: REMOVE_CURRENT_SHARED_FOLDER,
  });
};
