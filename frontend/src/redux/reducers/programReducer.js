import {
  PROGRAM_FETCH,
  PROGRAM_SUCCESS,
  PROGRAM_FAIL,
  PROGRAM_SAVE,
  PROGRAM_SAVE_SUCCESS,
  PROGRAM_SAVE_FAIL,
  PROGRAM_PICTURE_UPLOAD,
  PROGRAM_PICTURE_SUCCESS,
  PROGRAM_PICTURE_FAIL,
  PROGRAM_VIDEO_UPLOAD,
  PROGRAM_VIDEO_SUCCESS,
  PROGRAM_VIDEO_FAIL,
  PROGRAM_PUBLISH,
  PROGRAM_PUBLISH_SUCCESS,
  PROGRAM_PUBLISH_FAIL,
  PROGRAM_CANCEL_PUBLISH,
  PROGRAM_CANCEL_PUBLISH_SUCCESS,
  PROGRAM_CANCEL_PUBLISH_FAIL,
  PROGRAM_ACTIVE,
  PROGRAM_ACTIVE_SUCCESS,
  PROGRAM_ACTIVE_FAIL,
  PROGRAM_CANCEL_ACTIVE,
  PROGRAM_CANCEL_ACTIVE_SUCCESS,
  PROGRAM_CANCEL_ACTIVE_FAIL,
  REMOVE_PROGRAM,
  REMOVE_PROGRAM_SUCCESS,
  REMOVE_PROGRAM_FAIL,
  ACQUIRE_ACCOUNTS,
  ACQUIRE_ACCOUNTS_SUCCESS,
  ACQUIRE_ACCOUNTS_FAIL,
  CANECEL_ACCOUNTS,
  CANECEL_ACCOUNTS_SUCCESS,
  CANECEL_ACCOUNTS_FAIL,
  REFRESH_PROGRAM,
  ACTIVE_BOOKING,
  ACTIVE_BOOKING_SUCCESS,
  ACTIVE_BOOKING_FAIL,
  CANCEL_BOOKING,
  CANCEL_BOOKING_SUCCESS,
  CANCEL_BOOKING_FAIL,
} from "../types";

const initialState = {
  isLoading: true,
  program: null,
  error: null,
  program_saving: false,
  save_error: null,
  picture_uploading: false,
  picture_error: null,
  video_uploading: null,
  video_error: null,
  activating: false,
  active_error: null,
  canceling_actived: false,
  canceling_actived_error: null,
  publishing: false,
  publish_error: null,
  canceling_published: false,
  canceling_published_error: null,
  removing_program: false,
  removing_program_error: null,
  acquiring_accounts: false,
  adquire_accounts: null,
  adquire_accounts_error: null,
  canceling_accounts: false,
  cancel_accounts: null,
  cancel_accounts_error: null,
  activating_booking: false,
  active_booking_error: null,
  canceling_booking: false,
  canceling_booking_error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PROGRAM_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case PROGRAM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        program: action.payload,
      };

    case PROGRAM_FAIL:
      return {
        ...state,
        program: null,
        isLoading: false,
        error: action.payload,
      };
    case PROGRAM_SAVE:
      return {
        ...state,
        program_saving: true,
      };
    case PROGRAM_SAVE_SUCCESS:
      return {
        ...state,
        program_saving: false,
        save_error: null,

        program: {
          ...action.payload,
          benefits: action.payload.benefits.reverse(),
        },
      };
    case PROGRAM_SAVE_FAIL:
      return {
        ...state,
        program_saving: false,
        save_error: action.payload,
      };
    case PROGRAM_PICTURE_UPLOAD:
      return {
        ...state,
        picture_uploading: true,
      };
    case PROGRAM_PICTURE_SUCCESS:
      return {
        ...state,
        picture_uploading: false,
        program: {
          ...state.program,
          picture: action.payload,
        },
      };
    case PROGRAM_PICTURE_FAIL:
      return {
        ...state,
        picture_uploading: false,
        picture_error: action.paylod,
      };
    case PROGRAM_VIDEO_UPLOAD:
      return {
        ...state,
        video_uploading: true,
      };
    case PROGRAM_VIDEO_SUCCESS:
      return {
        ...state,
        video_uploading: false,
        program: {
          ...state.program,
          video_presentation: action.payload,
        },
      };
    case PROGRAM_VIDEO_FAIL:
      return {
        ...state,
        video_uploading: false,
        video_error: action.paylod,
      };
    case PROGRAM_ACTIVE:
      return {
        ...state,
        activating: true,
      };
    case PROGRAM_ACTIVE_SUCCESS:
      return {
        ...state,
        active_error: null,

        activating: false,
        program: action.payload,
      };
    case PROGRAM_ACTIVE_FAIL:
      return {
        ...state,
        activating: false,
        active_error: action.payload,
      };
    case PROGRAM_CANCEL_ACTIVE:
      return {
        ...state,
        canceling_actived: true,
      };
    case PROGRAM_CANCEL_ACTIVE_SUCCESS:
      return {
        ...state,

        canceling_actived: false,
        canceling_actived_error: null,

        program: action.payload,
      };
    case PROGRAM_CANCEL_ACTIVE_FAIL:
      return {
        ...state,
        canceling_actived: false,
        canceling_actived_error: action.payload,
      };
    case PROGRAM_PUBLISH:
      return {
        ...state,
        publishing: true,
      };
    case PROGRAM_PUBLISH_SUCCESS:
      return {
        ...state,
        publishing: false,
        publish_error: null,

        program: action.payload,
      };
    case PROGRAM_PUBLISH_FAIL:
      return {
        ...state,
        publishing: false,
        publish_error: action.payload,
      };
    case PROGRAM_CANCEL_PUBLISH:
      return {
        ...state,
        canceling_published: true,
      };
    case PROGRAM_CANCEL_PUBLISH_SUCCESS:
      return {
        ...state,
        canceling_published: false,
        canceling_published_error: null,

        program: action.payload,
      };
    case PROGRAM_CANCEL_PUBLISH_FAIL:
      return {
        ...state,
        canceling_published: false,
        canceling_published_error: action.payload,
      };
    case REMOVE_PROGRAM:
      return {
        ...state,
        removing_program: true,
      };
    case REMOVE_PROGRAM_SUCCESS:
      return {
        ...state,
        removing_program: false,
        removing_program_error: null,
        program: null,
      };
    case REMOVE_PROGRAM_FAIL:
      return {
        ...state,
        removing_program: false,
        removing_program_error: action.payload,
      };
    case ACQUIRE_ACCOUNTS:
      return {
        ...state,
        acquiring_accounts: true,
        adquire_accounts: action.payload,
      };
    case ACQUIRE_ACCOUNTS_SUCCESS:
      return {
        ...state,
        program: action.payload,
        adquire_accounts: null,
        acquiring_accounts: false,
        adquire_accounts_error: null,
      };
    case ACQUIRE_ACCOUNTS_FAIL:
      return {
        ...state,
        adquire_accounts: null,
        acquiring_accounts: false,

        adquire_accounts_error: action.payload,
      };
    case CANECEL_ACCOUNTS:
      return {
        ...state,
        canceling_accounts: true,
      };
    case CANECEL_ACCOUNTS_SUCCESS:
      return {
        ...state,
        program: action.payload,
        cancel_accounts_error: null,
      };
    case CANECEL_ACCOUNTS_FAIL:
      return {
        ...state,
        cancel_accounts_error: action.payload,
        canceling_accounts: false,
      };
    case REFRESH_PROGRAM:
      return {
        ...state,
        program: action.payload,
      };
    case ACTIVE_BOOKING:
      return {
        ...state,
        activating_booking: true,
      };
    case ACTIVE_BOOKING_SUCCESS:
      return {
        ...state,
        active_booking_error: null,

        activating_booking: false,
        program: action.payload,
      };
    case ACTIVE_BOOKING_FAIL:
      return {
        ...state,
        activating_booking: false,
        active_booking_error: action.payload,
      };
    case CANCEL_BOOKING:
      return {
        ...state,
        canceling_booking: true,
      };
    case CANCEL_BOOKING_SUCCESS:
      return {
        ...state,

        canceling_booking: false,
        canceling_booking_error: null,

        program: action.payload,
      };
    case CANCEL_BOOKING_FAIL:
      return {
        ...state,
        canceling_booking: false,
        canceling_booking_error: action.payload,
      };
    default:
      return state;
  }
}
