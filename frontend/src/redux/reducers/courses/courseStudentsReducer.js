import {
  COURSE_STUDENTS_FETCH,
  COURSE_STUDENTS_SUCCESS,
  COURSE_STUDENTS_FAIL,
  
} from "../../types";

const initialState = {
  isLoading: true,
  students: null,
  error: null,

};

export default function (state = initialState, action) {
  switch (action.type) {
    case COURSE_STUDENTS_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case COURSE_STUDENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        students: action.payload,
      };

    case COURSE_STUDENTS_FAIL:
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
