import {
  BOOK_EVENT,
  BOOK_EVENT_FAIL,
  BOOK_EVENT_SUCCESS,
  FETCH_EVENTS_BOOKED,
  FETCH_EVENTS_BOOKED_FAIL,
  FETCH_EVENTS_BOOKED_SUCCESS,
  SET_SELECTED_EVENT,
} from "../types";

const initialState = {
  selected_event: null,
  isLoading: false,
  event_booking: false,
  events: [],
  error: null,
  event_booking_error: null,
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
          description: action.payload.extendedProps.description,
          price: action.payload.extendedProps.price,
          currency: action.payload.extendedProps.currency,
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
    default:
      return state;
  }
}
