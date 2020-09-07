import {
  MOVE_FOLDERS_FETCH,
  MOVE_FOLDERS_SUCCESS,
  MOVE_FOLDERS_FAIL,
  SET_CURRENT_MOVE_FOLDER,
  REMOVE_CURRENT_MOVE_FOLDER,
  MOVE_FOLDER,
  MOVE_FOLDER_SUCCESS,
  MOVE_FOLDER_FAIL,
  MOVE_FILE,
  MOVE_FILE_SUCCESS,
  MOVE_FILE_FAIL,
} from "../types";

const initialState = {
  isLoading: false,
  folders: [],
  error: null,
  current_folders: [],
  moving_folder: false,
  move_folder_error: null,
  moving_file: false,
  move_file_error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MOVE_FOLDERS_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case MOVE_FOLDERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        folders: action.payload,
      };

    case MOVE_FOLDERS_FAIL:
      return {
        ...state,
        folders: null,
        isLoading: false,
        error: action.payload,
      };

    case SET_CURRENT_MOVE_FOLDER:
      return {
        ...state,
        current_folders: [...state.current_folders, action.payload],
      };
    case REMOVE_CURRENT_MOVE_FOLDER:
      return {
        ...state,
        current_folders: state.current_folders.filter(
          (_, i) => i !== state.current_folders.length - 1
        ),
      };
    case MOVE_FOLDER:
      return {
        ...state,
        moving_folder: true,
      };
    case MOVE_FOLDER_SUCCESS:
      return {
        ...state,
        moving_folder: false,
        current_folders: [],
      };

    case MOVE_FOLDER_FAIL:
      return {
        ...state,
        moving_folder: false,
        move_folder_error: action.payload,
      };
    case MOVE_FILE:
      return {
        ...state,
        moving_file: true,
      };
    case MOVE_FILE_SUCCESS:
      return {
        ...state,
        moving_file: false,
        current_folders: [],
      };

    case MOVE_FILE_FAIL:
      return {
        ...state,
        moving_file: false,
        move_folder_error: action.payload,
      };
    default:
      return state;
  }
}
