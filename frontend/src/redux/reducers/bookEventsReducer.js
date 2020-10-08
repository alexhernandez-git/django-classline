import {
  BOOK_EVENT,
  BOOK_EVENT_FAIL,
  BOOK_EVENT_SUCCESS,
  CANCEL_EVENT,
  CANCEL_EVENT_FAIL,
  CANCEL_EVENT_SUCCESS,
  FETCH_EVENTS_BOOKED,
  FETCH_EVENTS_BOOKED_FAIL,
  FETCH_EVENTS_BOOKED_SUCCESS,
  SET_SELECTED_EVENT,
} from "../types";

const initialState = {
  selected_event: null,
  isLoading: false,
  events: [],
  error: null,
  event_booking: false,
  event_booking_error: null,
  event_cancelling: false,
  event_cancelling_error: null,
  event_to_cancel: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_EVENT:
      return {
        ...state,
        selected_event: {
          id: action.payload.id,
          title: action.payload.title,
          start: action.payload.start,
          end: action.payload.end,
          color: action.payload.backgroundColor,
          description: action.payload.extendedProps.description,
          price: action.payload.extendedProps.price,
          currency: action.payload.extendedProps.currency,
          videoconference: action.payload.extendedProps.videoconference,
        },
      };
    case BOOK_EVENT:
      return {
        ...state,
        event_booking: true,
      };
    case BOOK_EVENT_SUCCESS:
      return {
        ...state,
        event_booking: false,
        events: [action.payload, ...state.events],
      };
    case BOOK_EVENT_FAIL:
      return {
        ...state,
        event_booking: false,
        event_booking_error: action.payload,
      };
    case FETCH_EVENTS_BOOKED:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_EVENTS_BOOKED_SUCCESS:
      return {
        ...state,
        isLoading: false,
        events: action.payload,
      };

    case FETCH_EVENTS_BOOKED_FAIL:
      return {
        ...state,
        events: null,
        isLoading: false,
        error: action.payload,
      };
    case CANCEL_EVENT:
      return {
        ...state,
        event_to_cancel: action.payload,
        event_cancelling: true,
      };
    case CANCEL_EVENT_SUCCESS:
      return {
        ...state,
        event_cancelling: false,
        events: state.events.filter(
          (event) => event.id !== state.event_to_cancel
        ),
      };
    case CANCEL_EVENT_FAIL:
      return {
        ...state,
        event_cancelling: false,

        event_cancelling_error: action.payload,

        event_to_cancel: null,
      };

    default:
      return state;
  }
}
