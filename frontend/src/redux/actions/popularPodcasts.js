import axios from "axios";

import {
  POPULAR_PODCASTS_FETCH,
  POPULAR_PODCASTS_SUCCESS,
  POPULAR_PODCASTS_FAIL,
} from "../types";

import { tokenConfig } from "./auth";

// CHECK TOKEN & LOAD USER
export const fetchPopularPodcasts = (id) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: POPULAR_PODCASTS_FETCH });
  console.log(id);
  console.log(
    `/api/programs/${
      getState().programReducer.program.code
    }/videos/get_popular_podcasts/`
  );
  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/podcasts/get_popular_podcasts/`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: POPULAR_PODCASTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: POPULAR_PODCASTS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
