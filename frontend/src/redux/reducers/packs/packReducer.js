import {
  PACK_FETCH,
  PACK_SUCCESS,
  PACK_FAIL,
  PACK_SAVE,
  PACK_SAVE_SUCCESS,
  PACK_SAVE_FAIL,
  PACK_PICTURE_UPLOAD,
  PACK_PICTURE_SUCCESS,
  PACK_PICTURE_FAIL,

  PACK_PUBLISH,
  PACK_PUBLISH_SUCCESS,
  PACK_PUBLISH_FAIL,
  PACK_CANCEL_PUBLISH,
  PACK_CANCEL_PUBLISH_SUCCESS,
  PACK_CANCEL_PUBLISH_FAIL,
  REMOVE_PACK,
  REMOVE_PACK_SUCCESS,
  REMOVE_PACK_FAIL,
  RESET_PACKS_ERRORS
} from "../../types";

const initialState = {
  isLoading: true,
  pack: null,
  error: null,
  pack_saving: false,
  save_error: null,
  picture_uploading: false,
  picture_error: null,
  publishing: false,
  publish_error: null,
  canceling_published: false,
  canceling_published_error: null,
  removing_pack: false,
  removing_pack_error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PACK_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case PACK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        pack: action.payload,
      };

    case PACK_FAIL:
      return {
        ...state,
        pack: null,
        isLoading: false,
        error: action.payload,
      };
    case PACK_SAVE:
      return {
        ...state,
        pack_saving: true,
      };
    case PACK_SAVE_SUCCESS:
      return {
        ...state,
        pack_saving: false,
        save_error: null,

        pack: {
          ...action.payload,
        },
      };
    case PACK_SAVE_FAIL:
      return {
        ...state,
        pack_saving: false,
        save_error: action.payload,
      };
    case PACK_PICTURE_UPLOAD:
      return {
        ...state,
        picture_uploading: true,
      };
    case PACK_PICTURE_SUCCESS:
      return {
        ...state,
        picture_uploading: false,
        pack: {
          ...state.pack,
          pricture: action.payload,
        picture_error: null,

        },
      };
    case PACK_PICTURE_FAIL:
      return {
        ...state,
        picture_uploading: false,
        picture_error: action.paylod,
      };
    
    case PACK_PUBLISH:
      return {
        ...state,
        publishing: true,
      };
    case PACK_PUBLISH_SUCCESS:
      return {
        ...state,
        publishing: false,
        publish_error: null,

        pack: action.payload,
      };
    case PACK_PUBLISH_FAIL:
      return {
        ...state,
        publishing: false,
        publish_error: action.payload,
      };
    case PACK_CANCEL_PUBLISH:
      return {
        ...state,
        canceling_published: true,
      };
    case PACK_CANCEL_PUBLISH_SUCCESS:
      return {
        ...state,
        canceling_published: false,
        canceling_published_error: null,

        pack: action.payload,
      };
    case PACK_CANCEL_PUBLISH_FAIL:
      return {
        ...state,
        canceling_published: false,
        canceling_published_error: action.payload,
      };
    case REMOVE_PACK:
      return {
        ...state,
        removing_pack: true,
      };
    case REMOVE_PACK_SUCCESS:
      return {
        ...state,
        removing_pack: false,
        removing_pack_error: null,
        pack: null,
      };
    case REMOVE_PACK_FAIL:
      return {
        ...state,
        removing_pack: false,
        removing_pack_error: action.payload,
      };
    case RESET_PACKS_ERRORS:
      return {
        ...state,
        removing_pack_error: null,
        publish_error: null,
        
        canceling_published_error: null,
        picture_error: null,
        save_error: null,

      }
    default:
      return state;
  }
}
