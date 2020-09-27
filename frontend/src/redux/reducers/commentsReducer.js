import {
  COMMENTS_FETCH,
  COMMENTS_SUCCESS,
  COMMENTS_FAIL,
  SET_COMMENT_EDIT,
  DELETE_COMMENT_EDIT,
  EDIT_COMMENT,
  EDIT_COMMENT_FAIL,
  EDIT_COMMENT_SUCCESS,
  CREATE_COMMENT,
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_SUCCESS,
  DELETE_COMMENT,
  DELETE_COMMENT_FAIL,
  DELETE_COMMENT_SUCCESS,
} from "../types";

const initialState = {
  isLoading: true,
  comments: null,
  error: null,
  comment_edit: null,
  comment_editing: false,
  comment_edit_error: null,
  comment_creating: false,
  comment_create_error: null,
  comment_delete: null,
  comment_deleting: false,
  comment_delete_error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COMMENTS_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case COMMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        comments: action.payload,
      };

    case COMMENTS_FAIL:
      return {
        ...state,
        comments: null,
        isLoading: false,
        error: action.payload,
      };
    case SET_COMMENT_EDIT:
      return {
        ...state,
        comment_edit: action.payload,
      };
    case DELETE_COMMENT_EDIT:
      return {
        ...state,
        comment_edit: null,
      };
    case EDIT_COMMENT:
      return {
        ...state,
        comment_editing: true,
      };
    case EDIT_COMMENT_SUCCESS:
      return {
        ...state,
        comment_editing: false,
        comments: {
          ...state.comments,
          results: state.comments.results.map((comment) =>
            comment.id === action.payload.id
              ? (comment = action.payload)
              : comment
          ),
        },
      };

    case EDIT_COMMENT_FAIL:
      return {
        ...state,
        comment_editing: false,
        comment_edit_error: action.payload,
      };
    case CREATE_COMMENT:
      return {
        ...state,
        comment_creating: true,
      };
    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        comment_creating: false,
        comments: {
          ...state.comments,
          results: [action.payload, ...state.comments.results],
        },
      };

    case CREATE_COMMENT_FAIL:
      return {
        ...state,
        comment_creating: false,
        comment_create_error: action.payload,
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comment_delete: action.payload,
        comment_deleting: true,
      };
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        comment_deleting: false,
        comments: {
          ...state.comments,
          results: state.comments.results.filter(
            (comment) => comment.id !== state.comment_delete
          ),
        },
        comment_delete: null,
      };

    case DELETE_COMMENT_FAIL:
      return {
        ...state,
        comment_deleting: false,
        comment_delete: null,
        comment_delete_error: action.payload,
      };
    default:
      return state;
  }
}
