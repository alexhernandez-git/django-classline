import {
  BUY_PACK,
  BUY_PACK_FAIL,
  BUY_PACK_SUCCESS,

  FETCH_PUBLISHED_PACKS,
  FETCH_PUBLISHED_PACKS_FAIL,
  FETCH_PUBLISHED_PACKS_SUCCESS,
  FETCH_MY_PACKS,
  FETCH_MY_PACKS_FAIL,
  FETCH_MY_PACKS_SUCCESS,
  SET_SELECTED_PACK,
} from "../types";

const initialState = {
  selected_pack: null,
  isLoading: false,
  packs: null,
  error: null,
  pack_buying: false,
  pack_buying_error: null,
  pack_cancelling: false,
  pack_cancelling_error: null,
  pack_to_cancel: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_PACK:
      return {
        ...state,
        selected_pack: action.payload,
      };
    case BUY_PACK:
      return {
        ...state,
        pack_buying: true,
      };
    case BUY_PACK_SUCCESS:
      return {
        ...state,
        pack_buying: false,
        packs:{
          ...state.packs,
          results: [action.payload, ...state.packs.results]
        } ,
      };
    case BUY_PACK_FAIL:
      return {
        ...state,
        pack_buying: false,
        pack_buying_error: action.payload,
      };
    case FETCH_PUBLISHED_PACKS:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_PUBLISHED_PACKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        packs: action.payload,
      };

    case FETCH_PUBLISHED_PACKS_FAIL:
      return {
        ...state,
        packs: null,
        isLoading: false,
        error: action.payload,
      };
      case FETCH_MY_PACKS:
        return {
          ...state,
          isLoading: true,
        };
      case FETCH_MY_PACKS_SUCCESS:
        return {
          ...state,
          isLoading: false,
          packs: action.payload,
          error: null,
        };
  
      case FETCH_MY_PACKS_FAIL:
        return {
          ...state,
          packs: null,
          isLoading: false,
          error: action.payload,
        };
    // case CANCEL_PACK:
    //   return {
    //     ...state,
    //     pack_to_cancel: action.payload,
    //     pack_cancelling: true,
    //   };
    // case CANCEL_PACK_SUCCESS:
    //   return {
    //     ...state,
    //     pack_cancelling: false,
    //     packs: {
    //       ...state.packs,
    //       results: state.packs.results.filter(
    //       (pack) => pack.id !== state.pack_to_cancel
    //     ),
    //       }
    //   };
    // case CANCEL_PACK_FAIL:
    //   return {
    //     ...state,
    //     pack_cancelling: false,

    //     pack_cancelling_error: action.payload,

    //     pack_to_cancel: null,
    //   };

    default:
      return state;
  }
}
