import {
  PUBLIC_FOLDERS_FETCH,
  PUBLIC_FOLDERS_SUCCESS,
  PUBLIC_FOLDERS_FAIL,
  SET_CURRENT_PUBLIC_FOLDER,
  REMOVE_CURRENT_PUBLIC_FOLDER,
} from "../types";

const initialState = {
  isLoading: false,
  folders: [],
  error: null,
  current_folders: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PUBLIC_FOLDERS_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case PUBLIC_FOLDERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        folders: action.payload,
      };

    case PUBLIC_FOLDERS_FAIL:
      return {
        ...state,
        folders: null,
        isLoading: false,
        error: action.payload,
      };

    case SET_CURRENT_PUBLIC_FOLDER:
      return {
        ...state,
        current_folders: [...state.current_folders, action.payload],
      };
    case REMOVE_CURRENT_PUBLIC_FOLDER:
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
