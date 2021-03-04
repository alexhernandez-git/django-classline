import { MEETUP_STUDENTS_FETCH, MEETUP_STUDENTS_SUCCESS, MEETUP_STUDENTS_FAIL } from "../types";

const initialState = {
  isLoading: false,
  students: null,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MEETUP_STUDENTS_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case MEETUP_STUDENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        students: action.payload,
      };

    case MEETUP_STUDENTS_FAIL:
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
