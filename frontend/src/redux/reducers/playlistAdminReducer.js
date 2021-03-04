import {
  PLAYLIST_ADMIN_FETCH,
  PLAYLIST_ADMIN_SUCCESS,
  PLAYLIST_ADMIN_FAIL,
} from "../types";

const initialState = {
  isLoading: false,
  playlist: {
    tracks: [],
  },
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PLAYLIST_ADMIN_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case PLAYLIST_ADMIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        playlist: action.payload,
      };

    case PLAYLIST_ADMIN_FAIL:
      return {
        ...state,
        playlist: null,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
