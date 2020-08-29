import {
  COMMERCIAL_LOADED,
  COMMERCIAL_LOADING,
  AUTH_COMMERCIAL_ERROR,
  LOGIN_COMMERCIAL_SUCCESS,
  LOGIN_COMMERCIAL_FAIL,
  LOGOUT_COMMERCIAL_SUCCESS,
  UPDATE_COMMERCIAL_PROFILE,
  UPDATE_COMMERCIAL_PROFILE_SUCCESS,
  UPDATE_COMMERCIAL_PROFILE_FAIL,
  UPDATE_COMMERCIAL,
  UPDATE_COMMERCIAL_SUCCESS,
  UPDATE_COMMERCIAL_FAIL,
  CHANGE_COMMERCIAL_PASSWORD,
  CHANGE_COMMERCIAL_PASSWORD_SUCCESS,
  CHANGE_COMMERCIAL_PASSWORD_FAIL,
  STRIPE_COMMERCIAL_CONNECTED,
  STRIPE_COMMERCIAL_CONNECTED_SUCCESS,
  STRIPE_COMMERCIAL_CONNECTED_FAIL,
} from "../types";
const initialState = {
  auth_commercial_token: localStorage.getItem("auth_commercial_token"),
  isAuthenticated: null,
  isLoading: true,
  user: null,
  error: null,
  is_updating_profile: false,
  update_profile_error: null,
  is_updating_user: false,
  update_user_error: null,
  is_changing_password: false,
  change_password_error: null,

  stripe_connecting: false,
  stripe_connecting_error: null,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case COMMERCIAL_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case COMMERCIAL_LOADED:
      //   console.log(action.payload);

      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        ...action.payload,
      };
    case LOGIN_COMMERCIAL_SUCCESS:
      localStorage.setItem(
        "auth_commercial_token",
        action.payload.access_token
      );
      return {
        ...state,
        user: action.payload.user,
        auth_commercial_token: action.payload.access_token,
        isAuthenticated: true,
        isLoading: false,
      };
    case AUTH_COMMERCIAL_ERROR:
    case LOGIN_COMMERCIAL_FAIL:
    case LOGOUT_COMMERCIAL_SUCCESS:
      localStorage.removeItem("auth_commercial_token");
      return {
        ...state,
        auth_commercial_token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload ? action.payload : null,
      };
    case UPDATE_COMMERCIAL_PROFILE:
      return {
        ...state,
        is_updating_profile: true,
      };
    case UPDATE_COMMERCIAL_PROFILE_SUCCESS:
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
    case UPDATE_COMMERCIAL_PROFILE_FAIL:
      return {
        ...state,
        is_updating_profile: false,
        update_profile_error: action.payload,
      };
    case UPDATE_COMMERCIAL:
      return {
        ...state,
        is_updating_user: true,
      };
    case UPDATE_COMMERCIAL_SUCCESS:
      return {
        ...state,
        is_updating_user: false,
        user: {
          ...state.user,
          first_name: action.payload.first_name,
          last_name: action.payload.last_name,
        },
      };
    case UPDATE_COMMERCIAL_FAIL:
      return {
        ...state,
        is_updating_user: false,
        update_user_error: action.payload,
      };
    case CHANGE_COMMERCIAL_PASSWORD:
      return {
        ...state,
        is_changing_password: true,
      };
    case CHANGE_COMMERCIAL_PASSWORD_SUCCESS:
      return {
        ...state,
        is_changing_password: false,
      };
    case CHANGE_COMMERCIAL_PASSWORD_FAIL:
      return {
        ...state,
        is_changing_password: false,
        change_password_error: action.payload,
      };

    case STRIPE_COMMERCIAL_CONNECTED:
      return {
        ...state,
        stripe_connecting: true,
      };
    case STRIPE_COMMERCIAL_CONNECTED_SUCCESS:
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
    case STRIPE_COMMERCIAL_CONNECTED_FAIL:
      return {
        ...state,
        stripe_connecting: false,
        stripe_connecting_error: action.payload,
      };
    default:
      return state;
  }
}
