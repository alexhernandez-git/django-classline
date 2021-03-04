import {
  STUDENT_VIDEOS_PACK_FETCH,
  STUDENT_VIDEOS_PACK_SUCCESS,
  STUDENT_VIDEOS_PACK_FAIL,
} from "../../types";

const initialState = {
  isLoading: true,
  videos: null,
  error: null,

};

export default function (state = initialState, action) {
  switch (action.type) {
    case STUDENT_VIDEOS_PACK_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case STUDENT_VIDEOS_PACK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        videos: action.payload,
      };

    case STUDENT_VIDEOS_PACK_FAIL:
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
