import { SET_SELECTED_EVENT } from "../types";

const initialState = {
  selected_event: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_EVENT:
      return {
        ...state,
        selected_event: action.payload,
      };
    default:
      return state;
  }
}
