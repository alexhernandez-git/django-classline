import {
  FILES_FETCH,
  FILES_SUCCESS,
  FILES_FAIL,
  EDIT_FILE,
  EDIT_FILE_FAIL,
  EDIT_FILE_SUCCESS,
  CREATE_FILE,
  CREATE_FILE_FAIL,
  CREATE_FILE_SUCCESS,
  DELETE_FILE,
  DELETE_FILE_FAIL,
  DELETE_FILE_SUCCESS,
} from "../types";

const initialState = {
  isLoading: false,
  files: [],
  error: null,
  file_edit: null,
  file_editing: false,
  file_edit_error: null,
  file_creating: false,
  file_create_error: null,
  file_delete: null,
  file_deleting: false,
  file_delete_error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FILES_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case FILES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        files: action.payload,
      };

    case FILES_FAIL:
      return {
        ...state,
        files: null,
        isLoading: false,
        error: action.payload,
      };

    case EDIT_FILE:
      return {
        ...state,
        file_editing: true,
      };
    case EDIT_FILE_SUCCESS:
      return {
        ...state,
        file_editing: false,
        files: state.files.map((file) =>
          file.id === action.payload.id ? (file = action.payload) : file
        ),
      };

    case EDIT_FILE_FAIL:
      return {
        ...state,
        file_editing: false,
        file_edit_error: action.payload,
      };
    case CREATE_FILE:
      return {
        ...state,
        file_creating: true,
      };
    case CREATE_FILE_SUCCESS:
      return {
        ...state,
        file_creating: false,
        files: [action.payload, ...state.files],
      };

    case CREATE_FILE_FAIL:
      return {
        ...state,
        file_creating: false,
        file_create_error: action.payload,
      };
    case DELETE_FILE:
      return {
        ...state,
        file_delete: action.payload,
        file_deleting: true,
      };
    case DELETE_FILE_SUCCESS:
      return {
        ...state,
        file_deleting: false,
        files: state.files.filter((file) => file.id !== state.file_delete),
        file_delete: null,
      };

    case DELETE_FILE_FAIL:
      return {
        ...state,
        file_deleting: false,
        file_delete: null,
        file_delete_error: action.payload,
      };

    default:
      return state;
  }
}
