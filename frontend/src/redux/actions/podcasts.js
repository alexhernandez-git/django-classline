import axios from "axios";
import Swal from "sweetalert2";

import {
  PODCASTS_FETCH,
  PODCASTS_SUCCESS,
  PODCASTS_FAIL,
  PLAY_PODCAST,
  STOP_PODCAST,
  SET_PODCAST_EDIT,
  DELETE_PODCAST_EDIT,
  EDIT_PODCAST,
  EDIT_PODCAST_FAIL,
  EDIT_PODCAST_SUCCESS,
  CREATE_PODCAST,
  CREATE_PODCAST_FAIL,
  CREATE_PODCAST_SUCCESS,
  DELETE_PODCAST,
  DELETE_PODCAST_FAIL,
  DELETE_PODCAST_SUCCESS,
} from "../types";

import { tokenConfig } from "./auth";

export const fetchPodcasts = (search = "") => (dispatch, getState) => {
  dispatch({ type: PODCASTS_FETCH });

  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/podcasts/?search=${search}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: PODCASTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PODCASTS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const fetchPodcastsPagination = (url) => (dispatch, getState) => {
  dispatch({ type: PODCASTS_FETCH });

  axios
    .get(url, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: PODCASTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PODCASTS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const playPodcast = (podcast) => (dispatch) => {
  dispatch({
    type: PLAY_PODCAST,
    payload: podcast,
  });
};

export const stopPodcast = () => (dispatch) => {
  dispatch({
    type: STOP_PODCAST,
  });
};
export const setPodcastEdit = (podcast) => (dispatch) => {
  dispatch({
    type: SET_PODCAST_EDIT,
    payload: podcast,
  });
};

export const deletePodcastEdit = () => (dispatch) => {
  dispatch({
    type: DELETE_PODCAST_EDIT,
  });
};

export const editPodcast = (podcast) => (dispatch, getState) => {
  dispatch({
    type: EDIT_PODCAST,
  });
  const fd = new FormData();
  fd.append("title", podcast.title);

  fd.append("description", podcast.description);
  fd.append("duration", podcast.duration);

  if (podcast.picture && podcast.picture.name !== undefined) {
    fd.append("picture", podcast.picture, podcast.picture.name);
  }
  if (podcast.audio && podcast.audio.name !== undefined) {
    fd.append("audio", podcast.audio, podcast.audio.name);
  }
  axios
    .patch(
      `/api/programs/${getState().programReducer.program.code}/podcasts/${
        podcast.id
      }/`,
      fd,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: EDIT_PODCAST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: EDIT_PODCAST_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const createPodcast = (podcast) => (dispatch, getState) => {
  dispatch({
    type: CREATE_PODCAST,
  });
  const fd = new FormData();
  fd.append("title", podcast.title);
  fd.append("description", podcast.description);
  if (podcast.picture && podcast.picture.name !== undefined) {
    fd.append("picture", podcast.picture, podcast.picture.name);
  }
  fd.append("audio", podcast.audio, podcast.audio.name);
  fd.append("duration", podcast.duration);
  for (var pair of fd.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }
  axios
    .post(
      `/api/programs/${getState().programReducer.program.code}/podcasts/`,
      fd,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: CREATE_PODCAST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: CREATE_PODCAST_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const deletePodcast = (id) => (dispatch, getState) => {
  dispatch({
    type: DELETE_PODCAST,
    payload: id,
  });

  axios
    .delete(
      `/api/programs/${getState().programReducer.program.code}/podcasts/${id}`,
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: DELETE_PODCAST_SUCCESS,
      });
      Swal.fire({
        title: "Eliminado!",
        icon: "success",
        confirmButtonText: "Ok",
      });
    })
    .catch((err) => {
      dispatch({
        type: DELETE_PODCAST_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
