import {
  COSTUMERS_FETCH,
  COSTUMERS_SUCCESS,
  COSTUMERS_FAIL,
  CREATE_COSTUMER,
  CREATE_COSTUMER_FAIL,
  CREATE_COSTUMER_SUCCESS,
  DELETE_COSTUMER,
  DELETE_COSTUMER_FAIL,
  DELETE_COSTUMER_SUCCESS,
  RESET_COSTUMER_CREATE,
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
    case COSTUMERS_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case COSTUMERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        accounts: action.payload,
      };

    case COSTUMERS_FAIL:
      return {
        ...state,
        accounts: null,
        isLoading: false,
        error: action.payload,
      };
    case CREATE_COSTUMER:
      return {
        ...state,
        account_creating: true,
      };
    case CREATE_COSTUMER_SUCCESS:
      return {
        ...state,
        account_creating: false,
        account_create_error: null,
        accounts: {
          ...state.accounts,
          results: [action.payload, ...state.accounts.results],
        },
      };

    case CREATE_COSTUMER_FAIL:
      return {
        ...state,
        account_creating: false,
        account_create_error: action.payload,
      };
    case DELETE_COSTUMER:
      return {
        ...state,
        account_delete: action.payload,
        account_deleting: true,
      };
    case DELETE_COSTUMER_SUCCESS:
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

    case DELETE_COSTUMER_FAIL:
      return {
        ...state,
        account_deleting: false,
        account_delete: null,
        account_delete_error: action.payload,
      };
    case RESET_COSTUMER_CREATE:
      return {
        ...state,
        account_creating: false,
        account_create_error: null,
      };
    default:
      return state;
  }
}
