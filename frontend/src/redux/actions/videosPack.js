import axios from "axios";
import Swal from "sweetalert2";

import {
  STUDENT_VIDEOS_PACK_FETCH,
  STUDENT_VIDEOS_PACK_SUCCESS,
  STUDENT_VIDEOS_PACK_FAIL,
} from "../types";

import { tokenConfig } from "./auth";

// CHECK TOKEN & LOAD USER
export const fetchVideos = (search = "") => (dispatch, getState) => {
  // User Loading
  dispatch({ type: STUDENT_VIDEOS_PACK_FETCH });

  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/packs/${getState().studentPackReducer.pack.code}/videos-pack?search=${search}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: STUDENT_VIDEOS_PACK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: STUDENT_VIDEOS_PACK_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchVideosPagination = (url) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: STUDENT_VIDEOS_PACK_FETCH });

  axios
    .get(url, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: STUDENT_VIDEOS_PACK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: STUDENT_VIDEOS_PACK_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchVideosIncrease = (limit, search = "") => (
  dispatch,
  getState
) => {
  // User Loading
  dispatch({ type: STUDENT_VIDEOS_PACK_FETCH });

  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/packs/${getState().studentPackReducer.pack.code}/videos-pack?search=${search}&limit=${limit}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: STUDENT_VIDEOS_PACK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: STUDENT_VIDEOS_PACK_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const playVideo = (video) => (dispatch) => {
  dispatch({
    type: PLAY_STUDENT_VIDEO_PACK,
    payload: video,
  });
};

export const stopVideo = () => (dispatch) => {
  dispatch({
    type: STOP_STUDENT_VIDEO_PACK,
  });
};