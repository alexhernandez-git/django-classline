import { COURSE_FETCH, COURSE_SUCCESS, COURSE_FAIL } from "../types";

const initialState = {
  isLoading: false,
  playlist: {
    tracks: [],
  },
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COURSE_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case COURSE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        playlist: action.payload,
      };

    case COURSE_FAIL:
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
