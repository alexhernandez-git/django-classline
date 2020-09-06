import axios from "axios";
import Swal from "sweetalert2";

import {
  SHARED_FILES_FETCH,
  SHARED_FILES_SUCCESS,
  SHARED_FILES_FAIL,
} from "../types";

import { tokenConfig } from "./auth";

// CHECK TOKEN & LOAD USER
export const fetchFiles = (search = "") => (dispatch, getState) => {
  // User Loading
  dispatch({ type: SHARED_FILES_FETCH });
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
      }/shared-files/?search=${search}&top_folder=${current_folder}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: SHARED_FILES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SHARED_FILES_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
