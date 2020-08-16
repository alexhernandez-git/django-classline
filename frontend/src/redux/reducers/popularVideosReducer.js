import {
  POPULAR_VIDEOS_FETCH,
  POPULAR_VIDEOS_SUCCESS,
  POPULAR_VIDEOS_FAIL,
} from "../types";

const initialState = {
  isLoading: true,
  videos: null,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case POPULAR_VIDEOS_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case POPULAR_VIDEOS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        videos: action.payload,
      };

    case POPULAR_VIDEOS_FAIL:
      return {
        ...state,
        videos: null,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
