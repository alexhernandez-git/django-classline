import {
  COMMERCIALS_FETCH,
  COMMERCIALS_SUCCESS,
  COMMERCIALS_FAIL,
  CREATE_COMMERCIAL,
  CREATE_COMMERCIAL_FAIL,
  CREATE_COMMERCIAL_SUCCESS,
  DELETE_COMMERCIAL,
  DELETE_COMMERCIAL_FAIL,
  DELETE_COMMERCIAL_SUCCESS,
  RESET_COMMERCIAL_CREATE,
  CHANGE_CURRENT_COMMERCIAL,
} from "../types";

const initialState = {
  isLoading: false,
  accounts: {
    count: null,
    next: null,
    previous: null,
    results: [],
  },
  error: null,
  account_creating: false,
  account_create_error: null,
  account_delete: null,
  account_deleting: false,
  account_delete_error: null,
  current_commercial: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COMMERCIALS_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case COMMERCIALS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        accounts: action.payload,
      };

    case COMMERCIALS_FAIL:
      return {
        ...state,
        accounts: null,
        isLoading: false,
        error: action.payload,
      };
    case CREATE_COMMERCIAL:
      return {
        ...state,
        account_creating: true,
      };
    case CREATE_COMMERCIAL_SUCCESS:
      return {
        ...state,
        account_creating: false,
        account_create_error: null,
        accounts: {
          ...state.accounts,
          results: [action.payload, ...state.accounts.results],
        },
      };

    case CREATE_COMMERCIAL_FAIL:
      return {
        ...state,
        account_creating: false,
        account_create_error: action.payload,
      };
    case DELETE_COMMERCIAL:
      return {
        ...state,
        account_delete: action.payload,
        account_deleting: true,
      };
    case DELETE_COMMERCIAL_SUCCESS:
      return {
        ...state,
        account_deleting: false,
        account_delete_error: null,
        accounts: {
          ...state.accounts,
          results: state.accounts.results.filter(
            (account) => account.id !== state.account_delete
          ),
        },
        account_delete: null,
      };

    case DELETE_COMMERCIAL_FAIL:
      return {
        ...state,
        account_deleting: false,
        account_delete: null,
        account_delete_error: action.payload,
      };
    case RESET_COMMERCIAL_CREATE:
      return {
        ...state,
        account_creating: false,
        account_create_error: null,
      };
    case CHANGE_CURRENT_COMMERCIAL:
      return {
        ...state,
        current_commercial: action.payload,
      };
    default:
      return state;
  }
}
