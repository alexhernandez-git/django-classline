import { SET_SELECTED_EVENT } from "../types";

const initialState = {
  selected_event: null,
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
        },
      };
    default:
      return state;
  }
}
