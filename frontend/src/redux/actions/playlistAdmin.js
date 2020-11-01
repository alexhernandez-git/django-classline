import axios from "axios";

import {
  PLAYLIST_ADMIN_FETCH,
  PLAYLIST_ADMIN_SUCCESS,
  PLAYLIST_ADMIN_FAIL,
} from "../types";

import { tokenConfig } from "./auth";
// CHECK TOKEN & LOAD USER
export const fetchPlaylist = (id) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: PLAYLIST_ADMIN_FETCH });

  axios
    .get(
      `/api/programs/${getState().programReducer.program.code}/courses/${id}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: PLAYLIST_ADMIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PLAYLIST_ADMIN_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
