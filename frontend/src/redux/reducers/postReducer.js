import {
  POST_FETCH,
  POST_SUCCESS,
  POST_FAIL,
  INCREASE_COMMENT,
} from "../types";

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
    case INCREASE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: ++state.post.comments,
        },
      };
    default:
      return state;
  }
}
