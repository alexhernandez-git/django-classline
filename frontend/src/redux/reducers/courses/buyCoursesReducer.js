import {
  BUY_COURSE,
  BUY_COURSE_FAIL,
  BUY_COURSE_SUCCESS,
  FETCH_PUBLISHED_COURSES,
  FETCH_PUBLISHED_COURSES_FAIL,
  FETCH_PUBLISHED_COURSES_SUCCESS,
  FETCH_MY_COURSES,
  FETCH_COURSE,
  FETCH_COURSE_SUCCESS,
  FETCH_COURSE_FAIL,
} from "../../types";

const initialState = {
  isLoading: false,
  courses: null,
  error: null,
  isLoadingCourse: true,
  course: null,
  error_course: null,
  course_buying: false,
  course_buying_error: null,
  course_cancelling: false,
  course_cancelling_error: null,
  course_to_cancel: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case BUY_COURSE:
      return {
        ...state,
        course_buying: true,
      };
    case BUY_COURSE_SUCCESS:
      return {
        ...state,
        course_buying: false,
        courses: {
          ...state.courses,
          results: state.courses.results.map((course) =>
            course.id === action.payload.id ? (course = action.payload) : course
          ),
        },
      };
    case BUY_COURSE_FAIL:
      return {
        ...state,
        course_buying: false,
        course_buying_error: action.payload,
      };
    case FETCH_PUBLISHED_COURSES:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_PUBLISHED_COURSES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        courses: action.payload,
      };

    case FETCH_PUBLISHED_COURSES_FAIL:
      return {
        ...state,
        courses: null,
        isLoading: false,
        error: action.payload,
      };
    case FETCH_MY_COURSES:
      return {
        ...state,
        courses: {
          ...state.courses,
          results: state.courses.results.filter((course) =>
            course.students.some((student) => student === action.payload)
          ),
        },
      };
    case FETCH_COURSE:
      return {
        ...state,
        isLoadingCourse: true,
      };
    case FETCH_COURSE_SUCCESS:
      return {
        ...state,
        isLoadingCourse: false,
        course: action.payload,
        error_course: null,
      };

    case FETCH_COURSE_FAIL:
      return {
        ...state,
        course: null,
        isLoadingCourse: false,
        error_course: action.payload,
      };
    // case CANCEL_COURSE:
    //   return {
    //     ...state,
    //     course_to_cancel: action.payload,
    //     course_cancelling: true,
    //   };
    // case CANCEL_COURSE_SUCCESS:
    //   return {
    //     ...state,
    //     course_cancelling: false,
    //     courses: {
    //       ...state.courses,
    //       results: state.courses.results.filter(
    //       (course) => course.id !== state.course_to_cancel
    //     ),
    //       }
    //   };
    // case CANCEL_COURSE_FAIL:
    //   return {
    //     ...state,
    //     course_cancelling: false,

    //     course_cancelling_error: action.payload,

    //     course_to_cancel: null,
    //   };

    default:
      return state;
  }
}
