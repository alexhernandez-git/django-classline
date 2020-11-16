import {
  SET_QUESTION,
  REMOVE_QUESTION,
  ANSWERS_FETCH,
  ANSWERS_SUCCESS,
  ANSWERS_FAIL,
  SET_ANSWER_EDIT,
  DELETE_ANSWER_EDIT,
  EDIT_ANSWER,
  EDIT_ANSWER_FAIL,
  EDIT_ANSWER_SUCCESS,
  CREATE_ANSWER,
  CREATE_ANSWER_FAIL,
  CREATE_ANSWER_SUCCESS,
  DELETE_ANSWER,
  DELETE_ANSWER_FAIL,
  DELETE_ANSWER_SUCCESS,
} from "../../types";

const initialState = {
  isLoading: true,
  answers: null,
  error: null,
  question: null,
  answer_edit: null,
  answer_editing: false,
  answer_edit_error: null,
  answer_creating: false,
  answer_create_error: null,
  answer_delete: null,
  answer_deleting: false,
  answer_delete_error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_QUESTION:
      return {
        ...state,
        question: action.payload,
      };
    case REMOVE_QUESTION:
      return {
        ...state,
        question: null,
      };
    case ANSWERS_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case ANSWERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        answers: action.payload,
      };

    case ANSWERS_FAIL:
      return {
        ...state,
        answers: null,
        isLoading: false,
        error: action.payload,
      };
    case SET_ANSWER_EDIT:
      return {
        ...state,
        answer_edit: action.payload,
      };
    case DELETE_ANSWER_EDIT:
      return {
        ...state,
        answer_edit: null,
      };
    case EDIT_ANSWER:
      return {
        ...state,
        answer_editing: true,
      };
    case EDIT_ANSWER_SUCCESS:
      return {
        ...state,
        answer_editing: false,
        answers: {
          ...state.answers,
          results: state.answers.results.map((answer) =>
            answer.id === action.payload.id ? (answer = action.payload) : answer
          ),
        },
      };

    case EDIT_ANSWER_FAIL:
      return {
        ...state,
        answer_editing: false,
        answer_edit_error: action.payload,
      };
    case CREATE_ANSWER:
      return {
        ...state,
        answer_creating: true,
      };
    case CREATE_ANSWER_SUCCESS:
      return {
        ...state,
        answer_creating: false,
        answers: {
          ...state.answers,
          results: [...state.answers.results, action.payload],
        },
      };

    case CREATE_ANSWER_FAIL:
      return {
        ...state,
        answer_creating: false,
        answer_create_error: action.payload,
      };
    case DELETE_ANSWER:
      return {
        ...state,
        answer_delete: action.payload,
        answer_deleting: true,
      };
    case DELETE_ANSWER_SUCCESS:
      return {
        ...state,
        answer_deleting: false,
        answers: {
          ...state.answers,
          results: state.answers.results.filter(
            (answer) => answer.id !== state.answer_delete
          ),
        },
        answer_delete: null,
      };

    case DELETE_ANSWER_FAIL:
      return {
        ...state,
        answer_deleting: false,
        answer_delete: null,
        answer_delete_error: action.payload,
      };
    default:
      return state;
  }
}
