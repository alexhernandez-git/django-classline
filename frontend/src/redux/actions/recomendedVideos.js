import axios from "axios";

import {
  RECOMENDED_VIDEOS_FETCH,
  RECOMENDED_VIDEOS_SUCCESS,
  RECOMENDED_VIDEOS_FAIL,
} from "../types";
import { tokenConfig } from "./auth";

// CHECK TOKEN & LOAD USER
export const fetchRecomendedVideos = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: RECOMENDED_VIDEOS_FETCH });

  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/videos/get_popular_videos/`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: RECOMENDED_VIDEOS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: RECOMENDED_VIDEOS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
