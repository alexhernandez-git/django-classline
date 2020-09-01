import {
  COURSES_FETCH,
  COURSES_SUCCESS,
  COURSES_FAIL,
  SET_COURSE_EDIT,
  DELETE_COURSE_EDIT,
  EDIT_COURSE,
  EDIT_COURSE_FAIL,
  EDIT_COURSE_SUCCESS,
  CREATE_COURSE,
  CREATE_COURSE_FAIL,
  CREATE_COURSE_SUCCESS,
  DELETE_COURSE,
  DELETE_COURSE_FAIL,
  DELETE_COURSE_SUCCESS,
} from "../types";

const initialState = {
  isLoading: false,
  playlists: null,
  error: null,
  playlist_edit: null,
  playlist_editing: false,
  playlist_edit_error: null,
  playlist_creating: false,
  playlist_create_error: null,
  playlist_delete: null,
  playlist_deleting: false,
  playlist_delete_error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COURSES_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case COURSES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        playlists: action.payload,
      };

    case COURSES_FAIL:
      return {
        ...state,
        playlists: null,
        isLoading: false,
        error: action.payload,
      };
    case SET_COURSE_EDIT:
      return {
        ...state,
        playlist_edit: action.payload,
      };
    case DELETE_COURSE_EDIT:
      return {
        ...state,
        playlist_edit: null,
      };
    case EDIT_COURSE:
      return {
        ...state,
        playlist_editing: true,
      };
    case EDIT_COURSE_SUCCESS:
      return {
        ...state,
        playlist_editing: false,
        playlists: {
          ...state.playlists,
          results: state.playlists.results.map((playlist) =>
            playlist.id === action.payload.id
              ? (playlist = action.payload)
              : playlist
          ),
        },
      };

    case EDIT_COURSE_FAIL:
      return {
        ...state,
        playlist_editing: false,
        playlist_edit_error: action.payload,
      };
    case CREATE_COURSE:
      return {
        ...state,
        playlist_creating: true,
      };
    case CREATE_COURSE_SUCCESS:
      return {
        ...state,
        playlist_creating: false,
        playlists: {
          ...state.playlists,
          results: [action.payload, ...state.playlists.results],
        },
      };

    case CREATE_COURSE_FAIL:
      return {
        ...state,
        playlist_creating: false,
        playlist_create_error: action.payload,
      };
    case DELETE_COURSE:
      return {
        ...state,
        playlist_delete: action.payload,
        playlist_deleting: true,
      };
    case DELETE_COURSE_SUCCESS:
      return {
        ...state,
        playlist_deleting: false,
        playlists: {
          ...state.playlists,
          results: state.playlists.results.filter(
            (playlist) => playlist.id !== state.playlist_delete
          ),
        },
        playlist_delete: null,
      };

    case DELETE_COURSE_FAIL:
      return {
        ...state,
        playlist_deleting: false,
        playlist_delete: null,
        playlist_delete_error: action.payload,
      };
    default:
      return state;
  }
}
