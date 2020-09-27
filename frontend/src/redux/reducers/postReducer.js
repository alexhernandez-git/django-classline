import { POST_FETCH, POST_SUCCESS, POST_FAIL } from "../types";

const initialState = {
  isLoading: true,
  post: null,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case POST_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        post: action.payload,
      };

    case POST_FAIL:
      return {
        ...state,
        post: null,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
