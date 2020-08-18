import axios from "axios";

import {
  POPULAR_PLAYLISTS_FETCH,
  POPULAR_PLAYLISTS_SUCCESS,
  POPULAR_PLAYLISTS_FAIL,
} from "../types";

import { tokenConfig } from "./auth";

// CHECK TOKEN & LOAD USER
export const fetchPopularPlaylists = (id) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: POPULAR_PLAYLISTS_FETCH });
  console.log(id);
  console.log(
    `/api/programs/${
      getState().programReducer.program.code
    }/videos/get_popular_playlists/`
  );
  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/playlists/get_popular_playlists/`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: POPULAR_PLAYLISTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: POPULAR_PLAYLISTS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
