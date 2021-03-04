import {
  PLAYLISTS_ADMIN_FETCH,
  PLAYLISTS_ADMIN_SUCCESS,
  PLAYLISTS_ADMIN_FAIL,
  SET_PLAYLIST_ADMIN_EDIT,
  DELETE_PLAYLIST_ADMIN_EDIT,
  EDIT_PLAYLIST_ADMIN,
  EDIT_PLAYLIST_ADMIN_FAIL,
  EDIT_PLAYLIST_ADMIN_SUCCESS,
  CREATE_PLAYLIST_ADMIN,
  CREATE_PLAYLIST_ADMIN_FAIL,
  CREATE_PLAYLIST_ADMIN_SUCCESS,
  DELETE_PLAYLIST_ADMIN,
  DELETE_PLAYLIST_ADMIN_FAIL,
  DELETE_PLAYLIST_ADMIN_SUCCESS,
} from "../types";

const initialState = {
  isLoading: false,
  playlists: {
    results: [],
  },
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
    case PLAYLISTS_ADMIN_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case PLAYLISTS_ADMIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        playlists: action.payload,
      };

    case PLAYLISTS_ADMIN_FAIL:
      return {
        ...state,
        playlists: null,
        isLoading: false,
        error: action.payload,
      };
    case SET_PLAYLIST_ADMIN_EDIT:
      return {
        ...state,
        playlist_edit: action.payload,
      };
    case DELETE_PLAYLIST_ADMIN_EDIT:
      return {
        ...state,
        playlist_edit: null,
      };
    case EDIT_PLAYLIST_ADMIN:
      return {
        ...state,
        playlist_editing: true,
      };
    case EDIT_PLAYLIST_ADMIN_SUCCESS:
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

    case EDIT_PLAYLIST_ADMIN_FAIL:
      return {
        ...state,
        playlist_editing: false,
        playlist_edit_error: action.payload,
      };
    case CREATE_PLAYLIST_ADMIN:
      return {
        ...state,
        playlist_creating: true,
      };
    case CREATE_PLAYLIST_ADMIN_SUCCESS:
      return {
        ...state,
        playlist_creating: false,
        playlists: {
          ...state.playlists,
          results: [action.payload, ...state.playlists.results],
        },
      };

    case CREATE_PLAYLIST_ADMIN_FAIL:
      return {
        ...state,
        playlist_creating: false,
        playlist_create_error: action.payload,
      };
    case DELETE_PLAYLIST_ADMIN:
      return {
        ...state,
        playlist_delete: action.payload,
        playlist_deleting: true,
      };
    case DELETE_PLAYLIST_ADMIN_SUCCESS:
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

    case DELETE_PLAYLIST_ADMIN_FAIL:
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
