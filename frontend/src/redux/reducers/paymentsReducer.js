import { PAYMENTS_FETCH, PAYMENTS_SUCCESS, PAYMENTS_FAIL } from "../types";

const initialState = {
  isLoading: false,
  payments: null,
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
        payments: action.payload,
      };

    case PAYMENTS_FAIL:
      return {
        ...state,
        payments: null,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
