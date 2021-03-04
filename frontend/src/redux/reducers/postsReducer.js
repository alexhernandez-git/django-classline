import {
  POSTS_FETCH,
  POSTS_SUCCESS,
  POSTS_FAIL,
  EDIT_POST,
  EDIT_POST_FAIL,
  EDIT_POST_SUCCESS,
  CREATE_POST,
  CREATE_POST_FAIL,
  CREATE_POST_SUCCESS,
  DELETE_POST,
  DELETE_POST_FAIL,
  DELETE_POST_SUCCESS,
} from "../types";

const initialState = {
  isLoading: true,
  posts: null,
  error: null,
  post_edit: null,
  post_editing: false,
  post_edit_error: null,
  post_creating: false,
  post_create_error: null,
  post_delete: null,
  post_deleting: false,
  post_delete_error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case POSTS_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case POSTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: action.payload,
      };

    case POSTS_FAIL:
      return {
        ...state,
        posts: null,
        isLoading: false,
        error: action.payload,
      };

    case EDIT_POST:
      return {
        ...state,
        post_editing: true,
      };
    case EDIT_POST_SUCCESS:
      return {
        ...state,
        post_editing: false,
        posts: {
          ...state.posts,
          results: state.posts.results.map((post) =>
            post.id === action.payload.id ? (post = action.payload) : post
          ),
        },
      };

    case EDIT_POST_FAIL:
      return {
        ...state,
        post_editing: false,
        post_edit_error: action.payload,
      };
    case CREATE_POST:
      return {
        ...state,
        post_creating: true,
      };
    case CREATE_POST_SUCCESS:
      console.log("action.payload", action.payload);

      return {
        ...state,
        post_creating: false,
        posts: {
          ...state.posts,
          results: [action.payload, ...state.posts.results],
        },
      };

    case CREATE_POST_FAIL:
      return {
        ...state,
        post_creating: false,
        post_create_error: action.payload,
      };
    case DELETE_POST:
      return {
        ...state,
        post_delete: action.payload,
        post_deleting: true,
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        post_deleting: false,
        posts: {
          ...state.posts,
          results: state.posts.results.filter(
            (post) => post.code !== state.post_delete
          ),
        },
        post_delete: null,
      };

    case DELETE_POST_FAIL:
      return {
        ...state,
        post_deleting: false,
        post_delete: null,
        post_delete_error: action.payload,
      };
    default:
      return state;
  }
}
