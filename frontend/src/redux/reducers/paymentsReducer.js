import { PAYMENTS_FETCH, PAYMENTS_SUCCESS, PAYMENTS_FAIL } from "../types";

const initialState = {
  isLoading: false,
  playlist: null,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PAYMENTS_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case PAYMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        playlist: action.payload,
      };

    case PAYMENTS_FAIL:
      return {
        ...state,
        playlist: null,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
