import {
  QUESTIONS_FETCH,
  QUESTIONS_SUCCESS,
  QUESTIONS_FAIL,
  EDIT_QUESTION,
  EDIT_QUESTION_FAIL,
  EDIT_QUESTION_SUCCESS,
  CREATE_QUESTION,
  CREATE_QUESTION_FAIL,
  CREATE_QUESTION_SUCCESS,
  DELETE_QUESTION,
  DELETE_QUESTION_FAIL,
  DELETE_QUESTION_SUCCESS,
} from "../../types";

const initialState = {
  isLoading: true,
  questions: null,
  error: null,
  question_edit: null,
  question_editing: false,
  question_edit_error: null,
  question_creating: false,
  question_create_error: null,
  question_delete: null,
  question_deleting: false,
  question_delete_error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case QUESTIONS_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case QUESTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        questions: action.payload,
      };

    case QUESTIONS_FAIL:
      return {
        ...state,
        questions: null,
        isLoading: false,
        error: action.payload,
      };

    case EDIT_QUESTION:
      return {
        ...state,
        question_editing: true,
      };
    case EDIT_QUESTION_SUCCESS:
      return {
        ...state,
        question_editing: false,
        questions: {
          ...state.questions,
          results: state.questions.results.map((question) =>
            question.id === action.payload.id
              ? (question = action.payload)
              : question
          ),
        },
      };

    case EDIT_QUESTION_FAIL:
      return {
        ...state,
        question_editing: false,
        question_edit_error: action.payload,
      };
    case CREATE_QUESTION:
      return {
        ...state,
        question_creating: true,
      };
    case CREATE_QUESTION_SUCCESS:
      return {
        ...state,
        question_creating: false,
        questions: {
          ...state.questions,
          results: [action.payload, ...state.questions.results],
        },
      };

    case CREATE_QUESTION_FAIL:
      return {
        ...state,
        question_creating: false,
        question_create_error: action.payload,
      };
    case DELETE_QUESTION:
      return {
        ...state,
        question_delete: action.payload,
        question_deleting: true,
      };
    case DELETE_QUESTION_SUCCESS:
      return {
        ...state,
        question_deleting: false,
        questions: {
          ...state.questions,
          results: state.questions.results.filter(
            (question) => question.code !== state.question_delete
          ),
        },
        question_delete: null,
      };

    case DELETE_QUESTION_FAIL:
      return {
        ...state,
        question_deleting: false,
        question_delete: null,
        question_delete_error: action.payload,
      };
    default:
      return state;
  }
}
