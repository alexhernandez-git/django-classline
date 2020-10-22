import {
  MEETUPS_FETCH,
  MEETUPS_SUCCESS,
  MEETUPS_FAIL,
  EDIT_MEETUP,
  EDIT_MEETUP_FAIL,
  EDIT_MEETUP_SUCCESS,
  CREATE_MEETUP,
  CREATE_MEETUP_FAIL,
  CREATE_MEETUP_SUCCESS,
  DELETE_MEETUP,
  DELETE_MEETUP_FAIL,
  DELETE_MEETUP_SUCCESS,
} from "../types";

const initialState = {
  isLoading: true,
  meetups: null,
  error: null,
  meetup_edit: null,
  meetup_editing: false,
  meetup_edit_error: null,
  meetup_creating: false,
  meetup_create_error: null,
  meetup_delete: null,
  meetup_deleting: false,
  meetup_delete_error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MEETUPS_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case MEETUPS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        meetups: action.payload,
      };

    case MEETUPS_FAIL:
      return {
        ...state,
        meetups: null,
        isLoading: false,
        error: action.payload,
      };
    case EDIT_MEETUP:
      return {
        ...state,
        meetup_edit: action.payload,
        meetup_editing: true,
      };
    case EDIT_MEETUP_SUCCESS:
      return {
        ...state,
        meetup_editing: false,
        meetups: state.meetups.map((meetup) =>
          meetup.id === action.payload.id ? (meetup = action.payload) : meetup
        ),
        meetup_edit_error: null,

      };

    case EDIT_MEETUP_FAIL:
      return {
        ...state,
        meetup_editing: false,
        meetup_edit_error: action.payload,
      };
    case CREATE_MEETUP:
      return {
        ...state,
        meetup_creating: true,
      };
    case CREATE_MEETUP_SUCCESS:
      return {
        ...state,
        meetup_creating: false,
        meetups: [action.payload, ...state.meetups],
        meetup_create_error: null,

      };

    case CREATE_MEETUP_FAIL:
      return {
        ...state,
        meetup_creating: false,
        meetup_create_error: action.payload,
      };
    case DELETE_MEETUP:
      return {
        ...state,
        meetup_delete: action.payload,
        meetup_deleting: true,
      };
    case DELETE_MEETUP_SUCCESS:
      return {
        ...state,
        meetup_deleting: false,
        meetups: state.meetups.filter(
          (meetup) => meetup.id !== state.meetup_delete
        ),
        meetup_delete: null,
        meetup_delete_error: null,

      };

    case DELETE_MEETUP_FAIL:
      return {
        ...state,
        meetup_deleting: false,
        meetup_delete: null,
        meetup_delete_error: action.payload,
      };
    default:
      return state;
  }
}
