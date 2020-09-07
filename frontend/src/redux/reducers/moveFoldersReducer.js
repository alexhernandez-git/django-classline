import {
  MOVE_FOLDERS_FETCH,
  MOVE_FOLDERS_SUCCESS,
  MOVE_FOLDERS_FAIL,
  SET_CURRENT_MOVE_FOLDER,
  REMOVE_CURRENT_MOVE_FOLDER,
} from "../types";

const initialState = {
  isLoading: false,
  folders: [],
  error: null,
  current_folders: [],
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
    default:
      return state;
  }
}
