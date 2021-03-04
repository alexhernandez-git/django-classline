import {
  POPULAR_PLAYLISTS_FETCH,
  POPULAR_PLAYLISTS_SUCCESS,
  POPULAR_PLAYLISTS_FAIL,
} from "../types";

const initialState = {
  isLoading: true,
  playlists: null,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case POPULAR_PLAYLISTS_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case POPULAR_PLAYLISTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        playlists: action.payload,
      };

    case POPULAR_PLAYLISTS_FAIL:
      return {
        ...state,
        playlists: null,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
