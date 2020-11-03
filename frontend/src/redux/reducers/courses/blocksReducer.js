import {
  BLOCKS_FETCH,
  BLOCKS_SUCCESS,
  BLOCKS_FAIL,
  CREATE_BLOCK,
  CREATE_BLOCK_FAIL,
  CREATE_BLOCK_SUCCESS,
  UPDATE_BLOCKS_ORDER,
  UPDATE_BLOCKS_ORDER_SUCCESS,
  UPDATE_BLOCKS_ORDER_FAIL,
} from "../../types";

const initialState = {
  isLoading: true,
  blocks: null,
  error: null,
  block_edit: null,
  block_editing: false,
  block_edit_error: null,
  block_creating: false,
  block_create_error: null,
  block_delete: null,
  block_deleting: false,
  block_delete_error: null,
  block_order_update: null,
  block_order_updating: false,
  block_order_update_error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case BLOCKS_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case BLOCKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        blocks: action.payload,
      };

    case BLOCKS_FAIL:
      return {
        ...state,
        blocks: null,
        isLoading: false,
        error: action.payload,
      };

    case CREATE_BLOCK:
      return {
        ...state,
        block_creating: true,
      };
    case CREATE_BLOCK_SUCCESS:
      return {
        ...state,
        block_creating: false,
        blocks: [action.payload, ...state.blocks],
      };

    case CREATE_BLOCK_FAIL:
      return {
        ...state,
        block_creating: false,
        block_create_error: action.payload,
      };
    case UPDATE_BLOCKS_ORDER:
      return {
        ...state,
        block_order_updating: true,
      };

    case UPDATE_BLOCKS_ORDER_SUCCESS:
      return {
        ...state,
        block_order_updating: false,
        blocks: action.payload,
      };

    case UPDATE_BLOCKS_ORDER_FAIL:
      return {
        ...state,
        block_order_updating: false,
        block_order_update_error: action.payload,
      };
    default:
      return state;
  }
}
