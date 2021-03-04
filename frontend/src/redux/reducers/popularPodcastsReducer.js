import {
  POPULAR_PODCASTS_FETCH,
  POPULAR_PODCASTS_SUCCESS,
  POPULAR_PODCASTS_FAIL,
} from "../types";

const initialState = {
  isLoading: true,
  podcasts: null,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case POPULAR_PODCASTS_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case POPULAR_PODCASTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        podcasts: action.payload,
      };

    case POPULAR_PODCASTS_FAIL:
      return {
        ...state,
        podcasts: null,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
