import {
  COURSES_FETCH,
  COURSES_SUCCESS,
  COURSES_FAIL,
  CREATE_COURSE,
  CREATE_COURSE_FAIL,
  CREATE_COURSE_SUCCESS,
  PROGRAM_COURSES_FETCH,
  PROGRAM_COURSES_SUCCESS,
  PROGRAM_COURSES_FAIL,
} from "../../types";

const initialState = {
  isLoading: true,
  courses: null,
  error: null,
  course_edit: null,
  course_editing: false,
  course_edit_error: null,
  course_creating: false,
  course_create_error: null,
  course_delete: null,
  course_deleting: false,
  course_delete_error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PROGRAM_COURSES_FETCH:
    case COURSES_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case PROGRAM_COURSES_SUCCESS:
    case COURSES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        courses: action.payload,
      };
    case PROGRAM_COURSES_FAIL:
    case COURSES_FAIL:
      return {
        ...state,
        courses: null,
        isLoading: false,
        error: action.payload,
      };

    case CREATE_COURSE:
      return {
        ...state,
        course_creating: true,
      };
    case CREATE_COURSE_SUCCESS:
      return {
        ...state,
        course_creating: false,
        courses: {
          ...state.courses,
          results: [action.payload, ...state.courses.results],
        },
      };

    case CREATE_COURSE_FAIL:
      return {
        ...state,
        course_creating: false,
        course_create_error: action.payload,
      };
    default:
      return state;
  }
}
