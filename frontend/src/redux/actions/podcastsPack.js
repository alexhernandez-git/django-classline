import axios from "axios";
import Swal from "sweetalert2";

import {
  STUDENT_PODCASTS_PACK_FETCH,
  STUDENT_PODCASTS_PACK_SUCCESS,
  STUDENT_PODCASTS_PACK_FAIL,
  PLAY_STUDENT_PODCAST_PACK,
  STOP_STUDENT_PODCAST_PACK,

} from "../types";

import { tokenConfig } from "./auth";

export const fetchPodcasts = (search = "") => (dispatch, getState) => {
  dispatch({ type: STUDENT_PODCASTS_PACK_FETCH });

  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/packs/${getState().studentPackReducer.pack.code}/podcasts-pack?search=${search}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: STUDENT_PODCASTS_PACK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: STUDENT_PODCASTS_PACK_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const fetchPodcastsPagination = (url) => (dispatch, getState) => {
  dispatch({ type: STUDENT_PODCASTS_PACK_FETCH });

  axios
    .get(url, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: STUDENT_PODCASTS_PACK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: STUDENT_PODCASTS_PACK_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchPodcastsIncrease = (limit, search = "") => (
  dispatch,
  getState
) => {
  // User Loading
  dispatch({ type: STUDENT_PODCASTS_PACK_FETCH });

  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/packs/${getState().studentPackReducer.pack.code}/podcasts-pack?search=${search}&limit=${limit}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: STUDENT_PODCASTS_PACK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: STUDENT_PODCASTS_PACK_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const playPodcast = (podcast) => (dispatch) => {
  dispatch({
    type: PLAY_STUDENT_PODCAST_PACK,
    payload: podcast,
  });
};

export const stopPodcast = () => (dispatch) => {
  dispatch({
    type: STOP_STUDENT_PODCAST_PACK,
  });
};