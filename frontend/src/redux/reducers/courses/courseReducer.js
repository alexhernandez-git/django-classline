import {
  COURSE_FETCH,
  COURSE_SUCCESS,
  COURSE_FAIL,
  COURSE_SAVE,
  COURSE_SAVE_SUCCESS,
  COURSE_SAVE_FAIL,
  COURSE_PICTURE_UPLOAD,
  COURSE_PICTURE_SUCCESS,
  COURSE_PICTURE_FAIL,
  COURSE_VIDEO_UPLOAD,
  COURSE_VIDEO_SUCCESS,
  COURSE_VIDEO_FAIL,
  COURSE_PUBLISH,
  COURSE_PUBLISH_SUCCESS,
  COURSE_PUBLISH_FAIL,
  COURSE_CANCEL_PUBLISH,
  COURSE_CANCEL_PUBLISH_SUCCESS,
  COURSE_CANCEL_PUBLISH_FAIL,
  COURSE_PUBLISH_PROGRAM,
  COURSE_PUBLISH_PROGRAM_SUCCESS,
  COURSE_PUBLISH_PROGRAM_FAIL,
  COURSE_CANCEL_PUBLISH_PROGRAM,
  COURSE_CANCEL_PUBLISH_PROGRAM_SUCCESS,
  COURSE_CANCEL_PUBLISH_PROGRAM_FAIL,
  REMOVE_COURSE,
  REMOVE_COURSE_SUCCESS,
  REMOVE_COURSE_FAIL,
  RESET_COURSES_ERRORS,
} from "../../types";

const initialState = {
  isLoading: true,
  course: null,
  error: null,
  course_saving: false,
  save_error: null,
  picture_uploading: false,
  picture_error: null,
  publishing: false,
  publish_error: null,
  publishing_program: false,
  publish_program_error: null,
  canceling_published: false,
  canceling_published_error: null,
  removing_course: false,
  removing_course_error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COURSE_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case COURSE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        course: action.payload,
      };

    case COURSE_FAIL:
      return {
        ...state,
        course: null,
        isLoading: false,
        error: action.payload,
      };
    case COURSE_SAVE:
      return {
        ...state,
        course_saving: true,
      };
    case COURSE_SAVE_SUCCESS:
      return {
        ...state,
        course_saving: false,
        save_error: null,

        course: {
          ...action.payload,
        },
      };
    case COURSE_SAVE_FAIL:
      return {
        ...state,
        course_saving: false,
        save_error: action.payload,
      };
    case COURSE_PICTURE_UPLOAD:
      return {
        ...state,
        picture_uploading: true,
      };
    case COURSE_PICTURE_SUCCESS:
      return {
        ...state,
        picture_uploading: false,
        course: {
          ...state.course,
          picture: action.payload,
          picture_error: null,
        },
      };
    case COURSE_PICTURE_FAIL:
      return {
        ...state,
        picture_uploading: false,
        picture_error: action.paylod,
      };
    case COURSE_VIDEO_UPLOAD:
      return {
        ...state,
        video_uploading: true,
      };
    case COURSE_VIDEO_SUCCESS:
      return {
        ...state,
        video_uploading: false,
        course: {
          ...state.course,
          video_presentation: action.payload,
        },
      };
    case COURSE_VIDEO_FAIL:
      return {
        ...state,
        video_uploading: false,
        video_error: action.paylod,
      };
    case COURSE_PUBLISH:
      return {
        ...state,
        publishing: true,
      };
    case COURSE_PUBLISH_SUCCESS:
      return {
        ...state,
        publishing: false,
        publish_error: null,

        course: action.payload,
      };
    case COURSE_PUBLISH_FAIL:
      return {
        ...state,
        publishing: false,
        publish_error: action.payload,
      };
    case COURSE_CANCEL_PUBLISH:
      return {
        ...state,
        canceling_published: true,
      };
    case COURSE_CANCEL_PUBLISH_SUCCESS:
      return {
        ...state,
        canceling_published: false,
        canceling_published_error: null,

        course: action.payload,
      };
    case COURSE_CANCEL_PUBLISH_FAIL:
      return {
        ...state,
        canceling_published: false,
        canceling_published_error: action.payload,
      };
    case COURSE_PUBLISH_PROGRAM:
      return {
        ...state,
        publishing_program: true,
      };
    case COURSE_PUBLISH_PROGRAM_SUCCESS:
      return {
        ...state,
        publishing_program: false,
        publish_program_error: null,

        course: action.payload,
      };
    case COURSE_PUBLISH_PROGRAM_FAIL:
      return {
        ...state,
        publishing_program: false,
        publish_program_error: action.payload,
      };
    case COURSE_CANCEL_PUBLISH_PROGRAM:
      return {
        ...state,
        canceling_published_program: true,
      };
    case COURSE_CANCEL_PUBLISH_PROGRAM_SUCCESS:
      return {
        ...state,
        canceling_published_program: false,
        canceling_published_program_error: null,

        course: action.payload,
      };
    case COURSE_CANCEL_PUBLISH_PROGRAM_FAIL:
      return {
        ...state,
        canceling_published_program: false,
        canceling_published_program_error: action.payload,
      };
    case REMOVE_COURSE:
      return {
        ...state,
        removing_course: true,
      };
    case REMOVE_COURSE_SUCCESS:
      return {
        ...state,
        removing_course: false,
        removing_course_error: null,
        course: null,
      };
    case REMOVE_COURSE_FAIL:
      return {
        ...state,
        removing_course: false,
        removing_course_error: action.payload,
      };
    case RESET_COURSES_ERRORS:
      return {
        ...state,
        removing_course_error: null,
        publish_error: null,
        publish_program_error: null,

        canceling_published_error: null,
        picture_error: null,
        save_error: null,
      };
    default:
      return state;
  }
}
