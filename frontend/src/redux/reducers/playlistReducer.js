import { PLAYLIST_FETCH, PLAYLIST_SUCCESS, PLAYLIST_FAIL } from "../types";

const initialState = {
  isLoading: false,
  playlist: {
    tracks: [],
  },
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PLAYLIST_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case PLAYLIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        playlist: action.payload,
      };

    case PLAYLIST_FAIL:
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
