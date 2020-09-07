import {
  FOLDERS_FETCH,
  FOLDERS_SUCCESS,
  FOLDERS_FAIL,
  EDIT_FOLDER,
  EDIT_FOLDER_FAIL,
  EDIT_FOLDER_SUCCESS,
  CREATE_FOLDER,
  CREATE_FOLDER_FAIL,
  CREATE_FOLDER_SUCCESS,
  DELETE_FOLDER,
  DELETE_FOLDER_FAIL,
  DELETE_FOLDER_SUCCESS,
  SET_CURRENT_FOLDER,
  REMOVE_CURRENT_FOLDER,
} from "../types";

const initialState = {
  isLoading: false,
  folders: [],
  error: null,
  folder_edit: null,
  folder_editing: false,
  folder_edit_error: null,
  folder_creating: false,
  folder_create_error: null,
  folder_delete: null,
  folder_deleting: false,
  folder_delete_error: null,
  current_folders: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FOLDERS_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case FOLDERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        folders: action.payload,
      };

    case FOLDERS_FAIL:
      return {
        ...state,
        folders: null,
        isLoading: false,
        error: action.payload,
      };

    case EDIT_FOLDER:
      return {
        ...state,
        folder_editing: true,
      };
    case EDIT_FOLDER_SUCCESS:
      action.payload.is_editing = false;
      return {
        ...state,
        folder_editing: false,
        folders: state.folders.map((folder) =>
          folder.id === action.payload.id ? (folder = action.payload) : folder
        ),
      };

    case EDIT_FOLDER_FAIL:
      return {
        ...state,
        folder_editing: false,
        folder_edit_error: action.payload,
      };
    case CREATE_FOLDER:
      return {
        ...state,
        folder_creating: true,
      };
    case CREATE_FOLDER_SUCCESS:
      return {
        ...state,
        folder_creating: false,
        folders: [action.payload, ...state.folders],
      };

    case CREATE_FOLDER_FAIL:
      return {
        ...state,
        folder_creating: false,
        folder_create_error: action.payload,
      };
    case DELETE_FOLDER:
      return {
        ...state,
        folder_delete: action.payload,
        folder_deleting: true,
      };
    case DELETE_FOLDER_SUCCESS:
      return {
        ...state,
        folder_deleting: false,
        folders: state.folders.filter(
          (folder) => folder.id !== state.folder_delete
        ),
        folder_delete: null,
      };

    case DELETE_FOLDER_FAIL:
      return {
        ...state,
        folder_deleting: false,
        folder_delete: null,
        folder_delete_error: action.payload,
      };

    case SET_CURRENT_FOLDER:
      return {
        ...state,
        current_folders: [...state.current_folders, action.payload],
      };
    case REMOVE_CURRENT_FOLDER:
      return {
        ...state,
        current_folders: state.current_folders.filter(
          (_, i) => i !== state.current_folders.length - 1
        ),
      };
    default:
      return state;
  }
}
