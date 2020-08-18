import { STUDENTS_FETCH, STUDENTS_SUCCESS, STUDENTS_FAIL } from "../types";

const initialState = {
  isLoading: false,
  students: null,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STUDENTS_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case STUDENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        students: action.payload,
      };

    case STUDENTS_FAIL:
      return {
        ...state,
        students: null,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
