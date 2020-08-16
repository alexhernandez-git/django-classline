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

const initialState = {
  isLoading: true,
  podcasts: null,
  error: null,
  podcast_playing: null,
  podcast_edit: null,
  podcast_editing: false,
  podcast_edit_error: null,
  podcast_creating: false,
  podcast_create_error: null,
  podcast_delete: null,
  podcast_deleting: false,
  podcast_delete_error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PODCASTS_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case PODCASTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        podcasts: action.payload,
      };

    case PODCASTS_FAIL:
      return {
        ...state,
        podcasts: null,
        isLoading: false,
        error: action.payload,
      };
    case PLAY_PODCAST:
      return {
        ...state,
        podcast_playing: action.payload,
      };
    case STOP_PODCAST:
      return {
        ...state,
        podcast_playing: null,
      };
    case SET_PODCAST_EDIT:
      return {
        ...state,
        podcast_edit: action.payload,
      };
    case DELETE_PODCAST_EDIT:
      return {
        ...state,
        podcast_edit: null,
      };
    case EDIT_PODCAST:
      return {
        ...state,
        podcast_editing: true,
      };
    case EDIT_PODCAST_SUCCESS:
      return {
        ...state,
        podcast_editing: false,
        podcasts: {
          ...state.podcasts,
          results: state.podcasts.results.map((podcast) =>
            podcast.id === action.payload.id
              ? (podcast = action.payload)
              : podcast
          ),
        },
      };

    case EDIT_PODCAST_FAIL:
      return {
        ...state,
        podcast_editing: false,
        podcast_edit_error: action.payload,
      };
    case CREATE_PODCAST:
      return {
        ...state,
        podcast_creating: true,
      };
    case CREATE_PODCAST_SUCCESS:
      return {
        ...state,
        podcast_creating: false,
        podcasts: {
          ...state.podcasts,
          results: [action.payload, ...state.podcasts.results],
        },
      };

    case CREATE_PODCAST_FAIL:
      return {
        ...state,
        podcast_creating: false,
        podcast_create_error: action.payload,
      };
    case DELETE_PODCAST:
      return {
        ...state,
        podcast_delete: action.payload,
        podcast_deleting: true,
      };
    case DELETE_PODCAST_SUCCESS:
      return {
        ...state,
        podcast_deleting: false,
        podcasts: {
          ...state.podcasts,
          results: state.podcasts.results.filter(
            (podcast) => podcast.id !== state.podcast_delete
          ),
        },
        podcast_delete: null,
      };

    case DELETE_PODCAST_FAIL:
      return {
        ...state,
        podcast_deleting: false,
        podcast_delete: null,
        podcast_delete_error: action.payload,
      };
    default:
      return state;
  }
}
