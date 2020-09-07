import axios from "axios";
import Swal from "sweetalert2";

import {
  MOVE_FOLDERS_FETCH,
  MOVE_FOLDERS_SUCCESS,
  MOVE_FOLDERS_FAIL,
  SET_CURRENT_MOVE_FOLDER,
  REMOVE_CURRENT_MOVE_FOLDER,
} from "../types";

import { tokenConfig } from "./auth";

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
