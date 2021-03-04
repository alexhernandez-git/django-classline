import axios from "axios";
import Swal from "sweetalert2";

import {
  PUBLIC_FILES_FETCH,
  PUBLIC_FILES_SUCCESS,
  PUBLIC_FILES_FAIL,
} from "../types";

import { tokenConfig } from "./auth";

// CHECK TOKEN & LOAD USER
export const fetchFiles = (search = "") => (dispatch, getState) => {
  // User Loading
  dispatch({ type: PUBLIC_FILES_FETCH });
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
      }/public-files/?search=${search}&top_folder=${current_folder}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: PUBLIC_FILES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PUBLIC_FILES_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
