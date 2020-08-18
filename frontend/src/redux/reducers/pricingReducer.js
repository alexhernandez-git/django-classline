import { PRICING_FETCH, PRICING_SUCCESS, PRICING_FAIL } from "../types";

const initialState = {
  isLoading: false,
  pricing: null,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PRICING_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case PRICING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        pricing: action.payload,
      };

    case PRICING_FAIL:
      return {
        ...state,
        pricing: null,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
