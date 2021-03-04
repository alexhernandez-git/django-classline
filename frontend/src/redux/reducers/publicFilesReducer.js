import {
  PUBLIC_FILES_FETCH,
  PUBLIC_FILES_SUCCESS,
  PUBLIC_FILES_FAIL,
} from "../types";

const initialState = {
  isLoading: false,
  files: [],
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PUBLIC_FILES_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case PUBLIC_FILES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        files: action.payload,
      };

    case PUBLIC_FILES_FAIL:
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
