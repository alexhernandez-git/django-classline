import {
  PLAYING_COURSE_FETCH,
  PLAYING_COURSE_SUCCESS,
  PLAYING_COURSE_FAIL,
} from "../../types";

const initialState = {
  isLoading: true,
  course: {
    blocks: [],
    items: [],
  },
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PLAYING_COURSE_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case PLAYING_COURSE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        course: action.payload,
      };

    case PLAYING_COURSE_FAIL:
      return {
        ...state,
        course: null,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
