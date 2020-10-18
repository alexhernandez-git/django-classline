import {
  PACKS_FETCH,
  PACKS_SUCCESS,
  PACKS_FAIL,
  CREATE_PACK,
  CREATE_PACK_FAIL,
  CREATE_PACK_SUCCESS,
} from "../types";

const initialState = {
  isLoading: true,
  packs: null,
  error: null,
  pack_edit: null,
  pack_editing: false,
  pack_edit_error: null,
  pack_creating: false,
  pack_create_error: null,
  pack_delete: null,
  pack_deleting: false,
  pack_delete_error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PACKS_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case PACKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        packs: action.payload,
      };

    case PACKS_FAIL:
      return {
        ...state,
        packs: null,
        isLoading: false,
        error: action.payload,
      };
    
    case CREATE_PACK:
      return {
        ...state,
        pack_creating: true,
      };
    case CREATE_PACK_SUCCESS:
      return {
        ...state,
        pack_creating: false,
        packs: {
          ...state.packs,
          results: [action.payload, ...state.packs.results],
        },
      };

    case CREATE_PACK_FAIL:
      return {
        ...state,
        pack_creating: false,
        pack_create_error: action.payload,
      };
     default:
      return state;
  }
}
