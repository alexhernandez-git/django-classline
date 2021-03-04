import {
  STUDENT_PACK_FETCH,
  STUDENT_PACK_SUCCESS,
  STUDENT_PACK_FAIL,
  
} from "../../types";

const initialState = {
  isLoading: true,
  pack: null,
  error: null,

};

export default function (state = initialState, action) {
  switch (action.type) {
    case STUDENT_PACK_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case STUDENT_PACK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        pack: action.payload,
      };

    case STUDENT_PACK_FAIL:
      return {
        ...state,
        pack: null,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
