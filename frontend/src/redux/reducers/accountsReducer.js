import {
  ACCOUNTS_FETCH,
  ACCOUNTS_SUCCESS,
  ACCOUNTS_FAIL,
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_FAIL,
  CREATE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT,
  DELETE_ACCOUNT_FAIL,
  DELETE_ACCOUNT_SUCCESS,
  RESET_ACCOUNT_CREATE,
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
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACCOUNTS_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case ACCOUNTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        accounts: action.payload,
      };

    case ACCOUNTS_FAIL:
      return {
        ...state,
        accounts: null,
        isLoading: false,
        error: action.payload,
      };
    case CREATE_ACCOUNT:
      return {
        ...state,
        account_creating: true,
      };
    case CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        account_creating: false,
        account_create_error: null,
        accounts: {
          ...state.accounts,
          results: [action.payload, ...state.accounts.results],
        },
      };

    case CREATE_ACCOUNT_FAIL:
      return {
        ...state,
        account_creating: false,
        account_create_error: action.payload,
      };
    case DELETE_ACCOUNT:
      return {
        ...state,
        account_delete: action.payload,
        account_deleting: true,
      };
    case DELETE_ACCOUNT_SUCCESS:
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

    case DELETE_ACCOUNT_FAIL:
      return {
        ...state,
        account_deleting: false,
        account_delete: null,
        account_delete_error: action.payload,
      };
    case RESET_ACCOUNT_CREATE:
      return {
        ...state,
        account_creating: false,
        account_create_error: null,
      };
    default:
      return state;
  }
}
