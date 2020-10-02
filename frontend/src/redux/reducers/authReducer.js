import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  CREATE_RATING,
  CREATE_RATING_SUCCESS,
  CREATE_RATING_FAIL,
  SET_STRIPE_CUSTOMER_DATA,
  SET_TEACHER_DISCOUNT,
  REMOVE_TEACHER_DISCOUNT,
  STRIPE_CONNECTED,
  STRIPE_CONNECTED_SUCCESS,
  STRIPE_CONNECTED_FAIL,
  ADD_ACCOUNT,
  SUBSTRACT_ACCOUNT,
  ACQUIRE_INSTRUCTOR_ACCOUNTS,
  ACQUIRE_INSTRUCTOR_ACCOUNTS_SUCCESS,
  ACQUIRE_INSTRUCTOR_ACCOUNTS_FAIL,
  CANECEL_INSTRUCTOR_ACCOUNTS,
  CANECEL_INSTRUCTOR_ACCOUNTS_SUCCESS,
  CANECEL_INSTRUCTOR_ACCOUNTS_FAIL,
  REGISTER_WITH_TOKEN_SUCCESS,
  RESET_AUTH_ERRORS,
} from "../types";
const initialState = {
  auth_token: localStorage.getItem("auth_token"),
  isAuthenticated: null,
  have_access: false,
  isLoading: true,
  user: null,
  error: null,
  is_updating_profile: false,
  update_profile_error: null,
  is_updating_user: false,
  update_user_error: null,
  is_changing_password: false,
  change_password_error: null,
  rating: null,
  rating_creating: false,
  rating_create_error: null,
  stripe_connecting: false,
  stripe_connecting_error: null,
  acquiring_accounts: false,
  adquire_accounts: null,
  adquire_accounts_error: null,
  canceling_accounts: false,
  cancel_accounts: null,
  cancel_accounts_error: null,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      //   console.log(action.payload);
      console.log(action.payload);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        haveAccess: action.payload.have_access,

        ...action.payload,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("auth_token", action.payload.access_token);
      return {
        ...state,
        user: action.payload.user,
        rating: action.payload.rating,
        auth_token: action.payload.access_token,
        isAuthenticated: true,
        isLoading: false,
        haveAccess: action.payload.have_access,
        error: !action.payload.have_access
          ? { data: { detail: "No tienes acceso" } }
          : null,
      };
    case REGISTER_WITH_TOKEN_SUCCESS:
      localStorage.setItem("auth_token", action.payload.access_token);
      return {
        ...state,
        user: action.payload.user,
        auth_token: action.payload.access_token,
        isAuthenticated: true,
        isLoading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
      localStorage.removeItem("auth_token");
      return {
        ...state,
        auth_token: null,
        user: null,
        rating: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case RESET_AUTH_ERRORS:
      return {
        ...state,
        error: null,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        is_updating_profile: true,
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        is_updating_profile: false,
        user: {
          ...state.user,
          profile: {
            ...state.user.profile,
            picture: action.payload,
          },
        },
      };
    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        is_updating_profile: false,
        update_profile_error: action.payload,
      };
    case UPDATE_USER:
      return {
        ...state,
        is_updating_user: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        is_updating_user: false,
        user: {
          ...state.user,
          first_name: action.payload.first_name,
          last_name: action.payload.last_name,
        },
      };
    case UPDATE_USER_FAIL:
      return {
        ...state,
        is_updating_user: false,
        update_user_error: action.payload,
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        is_changing_password: true,
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        is_changing_password: false,
      };
    case CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        is_changing_password: false,
        change_password_error: action.payload,
      };
    case CREATE_RATING:
      return {
        ...state,
        rating_creating: true,
      };
    case CREATE_RATING_SUCCESS:
      return {
        ...state,
        rating_creating: false,
        rating: action.payload,
      };

    case CREATE_RATING_FAIL:
      return {
        ...state,
        rating_creating: false,
        rating_create_error: action.payload,
      };
    case SET_STRIPE_CUSTOMER_DATA:
      return {
        ...state,
        user: {
          ...state.user,
          profile: {
            ...state.user.profile,
            stripe_customer_id: action.payload.customer_id,
            payment_methods: action.payload.payment_methods,
          },
        },
      };
    case SET_TEACHER_DISCOUNT:
      return {
        ...state,
        user: {
          ...state.user,
          teacher: {
            ...state.user.teacher,
            discount: action.payload,
          },
        },
      };
    case REMOVE_TEACHER_DISCOUNT:
      return {
        ...state,
        user: {
          ...state.user,
          teacher: {
            ...state.user.teacher,
            discount: null,
          },
        },
      };
    case STRIPE_CONNECTED:
      return {
        ...state,
        stripe_connecting: true,
      };
    case STRIPE_CONNECTED_SUCCESS:
      return {
        ...state,
        stripe_connecting: false,
        user: {
          ...state.user,
          profile: {
            ...state.user.profile,
            stripe_account_id: action.payload.profile.stripe_account_id,
            stripe_dashboard_url: action.payload.profile.stripe_dashboard_url,
          },
        },
      };
    case STRIPE_CONNECTED_FAIL:
      return {
        ...state,
        stripe_connecting: false,
        stripe_connecting_error: action.payload,
      };
    case SUBSTRACT_ACCOUNT:
      return {
        ...state,
        user: {
          ...state.user,
          teacher: {
            ...state.user.teacher,
            accounts_to_create_left: (state.user.teacher.accounts_to_create_left += 1),
          },
        },
      };
    case ADD_ACCOUNT:
      return {
        ...state,
        user: {
          ...state.user,
          teacher: {
            ...state.user.teacher,
            accounts_to_create_left: (state.user.teacher.accounts_to_create_left -= 1),
          },
        },
      };
    case ACQUIRE_INSTRUCTOR_ACCOUNTS:
      return {
        ...state,
        acquiring_accounts: true,
        adquire_accounts: action.payload,
      };
    case ACQUIRE_INSTRUCTOR_ACCOUNTS_SUCCESS:
      return {
        ...state,
        user: action.payload,
        adquire_accounts: null,
        acquiring_accounts: false,
        adquire_accounts_error: null,
      };
    case ACQUIRE_INSTRUCTOR_ACCOUNTS_FAIL:
      return {
        ...state,
        adquire_accounts: null,
        acquiring_accounts: false,

        adquire_accounts_error: action.payload,
      };
    case CANECEL_INSTRUCTOR_ACCOUNTS:
      return {
        ...state,
        canceling_accounts: true,
      };
    case CANECEL_INSTRUCTOR_ACCOUNTS_SUCCESS:
      return {
        ...state,
        user: action.payload,
        cancel_accounts_error: null,
      };
    case CANECEL_INSTRUCTOR_ACCOUNTS_FAIL:
      return {
        ...state,
        cancel_accounts_error: action.payload,
        canceling_accounts: false,
      };
    default:
      return state;
  }
}
