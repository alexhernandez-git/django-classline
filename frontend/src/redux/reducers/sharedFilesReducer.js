import {
  SHARED_FILES_FETCH,
  SHARED_FILES_SUCCESS,
  SHARED_FILES_FAIL,
} from "../types";

const initialState = {
  isLoading: false,
  files: [],
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SHARED_FILES_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case SHARED_FILES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        files: action.payload,
      };

    case SHARED_FILES_FAIL:
      return {
        ...state,
        files: null,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
