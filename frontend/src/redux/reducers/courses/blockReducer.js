import {
  BLOCK_FETCH,
  BLOCK_SUCCESS,
  BLOCK_FAIL,
  BLOCK_SAVE,
  BLOCK_SAVE_SUCCESS,
  BLOCK_SAVE_FAIL,
  BLOCK_PICTURE_UPLOAD,
  BLOCK_PICTURE_SUCCESS,
  BLOCK_PICTURE_FAIL,
  REMOVE_BLOCK,
  REMOVE_BLOCK_SUCCESS,
  REMOVE_BLOCK_FAIL,
  RESET_BLOCKS_ERRORS,
} from "../../types";

const initialState = {
  isLoading: true,
  block: null,
  error: null,
  block_saving: false,
  save_error: null,
  picture_uploading: false,
  picture_error: null,
  removing_block: false,
  removing_block_error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case BLOCK_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case BLOCK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        block: action.payload,
      };

    case BLOCK_FAIL:
      return {
        ...state,
        block: null,
        isLoading: false,
        error: action.payload,
      };
    case BLOCK_SAVE:
      return {
        ...state,
        block_saving: true,
      };
    case BLOCK_SAVE_SUCCESS:
      return {
        ...state,
        block_saving: false,
        save_error: null,

        block: {
          ...action.payload,
        },
      };
    case BLOCK_SAVE_FAIL:
      return {
        ...state,
        block_saving: false,
        save_error: action.payload,
      };
    case BLOCK_PICTURE_UPLOAD:
      return {
        ...state,
        picture_uploading: true,
      };
    case BLOCK_PICTURE_SUCCESS:
      return {
        ...state,
        picture_uploading: false,
        block: {
          ...state.block,
          picture: action.payload,
          picture_error: null,
        },
      };
    case BLOCK_PICTURE_FAIL:
      return {
        ...state,
        picture_uploading: false,
        picture_error: action.paylod,
      };
    case REMOVE_BLOCK:
      return {
        ...state,
        removing_block: true,
      };
    case REMOVE_BLOCK_SUCCESS:
      return {
        ...state,
        removing_block: false,
        removing_block_error: null,
        isLoading: true,
        block: null,
      };
    case REMOVE_BLOCK_FAIL:
      return {
        ...state,
        removing_block: false,
        removing_block_error: action.payload,
      };
    case RESET_BLOCKS_ERRORS:
      return {
        ...state,
        removing_block_error: null,
        publish_error: null,
        publish_program_error: null,

        canceling_published_error: null,
        picture_error: null,
        save_error: null,
      };
    default:
      return state;
  }
}
