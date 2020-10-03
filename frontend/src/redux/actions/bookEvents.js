import axios from "axios";

import { SET_SELECTED_EVENT } from "../types";

import { tokenConfig } from "./auth";

export const setSelectedEvent = (event) => (dispatch, getState) => {
  dispatch({ type: SET_SELECTED_EVENT, payload: event });
};
